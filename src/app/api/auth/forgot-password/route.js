import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const { email } = await request.json();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "No account found with this email." },
        { status: 404 }
      );
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    // Send reset email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `https://skillmercants.com/pages/users/reset-password?token=${token}`;
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Skill Merchants Password Reset",
      // text: `You requested a password reset. Click the link to reset your password:
      //  ${resetUrl}\n\nIf you did not request this, please ignore this email.\n`,
      html: `<p>You requested a password reset. Click the link to reset your password:</p>
             <a href="${resetUrl}">click to reset</a>
             <p>If you did not request this, please ignore this email.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Password reset link sent to your email." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in forgot-password:", error);
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
