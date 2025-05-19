import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from '@models/User';

export async function POST(request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const { token, password } = await request.json();

    // Find user by reset token and check expiry
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired reset token." },
        { status: 400 }
      );
    }

    // Update password and clear reset token
    user.password = password; // bcrypt hashing handled by User model pre-save
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in reset-password:", error);
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
