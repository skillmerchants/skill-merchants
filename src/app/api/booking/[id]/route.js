import { NextResponse } from "next/server";
import dbConnect from "@lib/dbConnect";
import Booking from "@/models/Booking";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    const { status , link , userEmail , userName , mentorName , course } = await request.json();
    if (!["pending", "confirmed"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }
    const booking = await Booking.findByIdAndUpdate(
      params.id,
      { paymentStatus: status },
      { new: true }
    );
    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }
    
         // // Send confirmation email
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
      await transporter.sendMail({
        to: userEmail,
        subject: `Appointment Confirmed`,
        html: `
          <h2>Appointment Confirmation</h2>
          <p>Dear ${userName},</p>
          <p>Your appointment with ${mentorName} has been confirmed.</p>
          <p><strong>Details: ${course} </strong></p>
          <ul>
  
            <h1><strong>Join the group to start receiving your class: </strong> ${link}</h1>
            <li><strong>Payment Status:</strong> confirmed</li>
          </ul>

        `,
      });
    return NextResponse.json({ data: booking }, { status: 200 });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return NextResponse.json({ message: "Failed to update status" }, { status: 500 });
  }
}






export async function GET(request, { params }) {
  try {
    // Connect to the database
    await dbConnect();

    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // Check if token exists
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    // Verify JWT
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

    // Optionally check for admin privileges (if restricted to admins)
    // Example: if (decoded.role !== "admin") { return NextResponse.json({ error: "Forbidden" }, { status: 403 }); }

    // Fetch the booking by ID
    const booking = await Booking.findById(params.id).lean();
    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    // Optionally fetch payment proof file details from GridFS
    let paymentProofUrl = null;
    if (booking.paymentProofFileId) {
      try {
        const bucket = new GridFSBucket(mongoose.connection.db, {
          bucketName: "paymentProofs",
        });
        // Generate a URL for the file (adjust based on your file-serving endpoint)
        paymentProofUrl = `/api/files/${booking.paymentProofFileId}`;
      } catch (error) {
        console.error(
          `Error fetching payment proof for booking ${booking._id}:`,
          error
        );
        // Continue without URL if GridFS fails
      }
    }

    // Add paymentProofUrl to the booking object
    const bookingWithFile = {
      ...booking,
      paymentProofUrl,
    };

    return NextResponse.json(
      { message: "Booking retrieved successfully", data: bookingWithFile },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { message: "Failed to fetch booking: " + error.message },
      { status: 500 }
    );
  }
}