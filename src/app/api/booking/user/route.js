import { NextResponse } from "next/server";
import dbConnect from "@lib/dbConnect";
import Booking from "@/models/Booking";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
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
    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
    console.log(bookings);
    if (!bookings) {
      return NextResponse.json({ message: "No bookings found" }, { status: 404 });
    }
    return NextResponse.json({ data: bookings || null }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}