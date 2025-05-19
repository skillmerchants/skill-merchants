import { NextResponse } from "next/server";
import dbConnect from "@lib/dbConnect";
import Booking from "@/models/Booking";
import nodemailer from "nodemailer";
import { cookies } from 'next/headers';
import { GridFSBucket } from "mongodb";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

export async function POST(request) {
  try {
  await dbConnect();

 const cookieStore = await cookies();
  const Token = cookieStore.get("token")?.value;
  console.log('token:' ,Token);
  if (!Token) {
    return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
  }

  // Verify JWT
  const token = Token;

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
  }

  // Extract userId from decoded token
  const userId = decoded.userId;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized: No userId in token" }, { status: 401 });
  }
  console.log(userId);
    // Parse FormData
    const formData = await request.formData();
    const data = {
      userId,
      mentorId: formData.get("mentorId"),
      mentorName: formData.get("mentorName"),
      userName: formData.get("userName"),
      userEmail: formData.get("userEmail"),
      phoneNumber: formData.get("phoneNumber"),
      appointmentTime: formData.get("appointmentTime"),
      durationMonths: formData.get("durationMonths"),
      paymentMethod: formData.get("paymentMethod"),
      paymentProof: formData.get("paymentProof"),
      notes: formData.get("notes") || "",
    };

    // Validate required fields
    const requiredFields = [
      "userId",
      "mentorId",
      "mentorName",
      "userName",
      "userEmail",
      "phoneNumber",
      "appointmentTime",
      "durationMonths",
      "paymentMethod",
      "paymentProof",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    if (!data.userEmail.includes("@")) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    // Validate phone number
    if (!data.phoneNumber.match(/^\+?\d{10,15}$/)) {
      return NextResponse.json(
        { message: "Invalid phone number (must be 10-15 digits)" },
        { status: 400 }
      );
    }

    // Validate duration
    if (parseInt(data.durationMonths) <= 0) {
      return NextResponse.json(
        { message: "Duration must be at least 1 month" },
        { status: 400 }
      );
    }

    // Upload payment proof to GridFS
    let paymentProofFileId = null;
    if (data.paymentProof) {
      const bucket = new GridFSBucket( mongoose.connection.db, { bucketName: "paymentProofs" });
      const fileName = `${Date.now()}-${data.paymentProof.name}`;
      const uploadStream = bucket.openUploadStream(fileName, {
        contentType: data.paymentProof.type,
      });
      paymentProofFileId = uploadStream.id;

      const fileBuffer = Buffer.from(await data.paymentProof.arrayBuffer());
      await new Promise((resolve, reject) => {
        uploadStream.write(fileBuffer);
        uploadStream.end((error) => {
          if (error) reject(error);
          else resolve();
        });
      });
    }

    // Create booking
    const booking = new Booking({
      userId: data.userId,
      mentorId: data.mentorId,
      mentorName: data.mentorName,
      userName: data.userName,
      userEmail: data.userEmail,
      phoneNumber: data.phoneNumber,
      appointmentTime: data.appointmentTime,
      durationMonths: parseInt(data.durationMonths),
      paymentMethod: data.paymentMethod,
      paymentProofFileId,
      paymentStatus: "pending",
      notes: data.notes,
      createdAt: new Date(),
    });

    await booking.save();

    // // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: data.userEmail,
      subject: `Appointment Confirmation with ${data.mentorName}`,
      html: `
        <h2>Appointment Confirmation</h2>
        <p>Dear ${data.userName},</p>
        <p>Your appointment with ${data.mentorName} has been booked and is pending payment confirmation.</p>
        <p><strong>Details:</strong></p>
        <ul>
          <li><strong>Time:</strong> ${data.appointmentTime}</li>
          <li><strong>Duration:</strong> ${data.durationMonths} month(s)</li>
          <li><strong>Payment Method:</strong> ${data.paymentMethod}</li>
          <li><strong>Payment Status:</strong> Pending</li>
        </ul>

      `,
    });

    return NextResponse.json(
      { message: "Appointment booked successfully", data: booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { message: "Failed to book appointment: " + error.message },
      { status: 500 }
    );
  }
}





export async function GET(request) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT verification error:", err);
      return NextResponse.json(
        { error: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }
    // Optionally check if user is admin (e.g., decoded.role === "admin")
    const bookings = await Booking.find().lean();
    return NextResponse.json(
      { message: "Bookings retrieved successfully", data: bookings },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Failed to fetch bookings: " + error.message },
      { status: 500 }
    );
  }
}