import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from '@models/User';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
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

    await mongoose.connect(process.env.MONGODB_URI);

    const {  password } = await request.json();

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
