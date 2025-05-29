
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@lib/dbConnect';
import User from '@models/User';
import { cookies } from 'next/headers';

export async function GET(request) {
  await dbConnect();
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
   
     // Check if user is admin
     if (!decoded.isAdmin) {
       console.log('bad');
       return NextResponse.json({ error: "Access denied. Admins only." }, { status: 403 });
     }
   
    // Fetch all users from the database
    const users = await User.find({}, { password: 0 }); // Exclude passwords for security
    console.log(users);
    // const users = await User.find({}, 'email isAdmin'); // Only fetch necessary fields
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}