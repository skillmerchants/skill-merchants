
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@lib/dbConnect';
import User from '@models/User';

export async function GET(request) {
  await dbConnect();
  console.log(request.headers);
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
    console.log(authHeader);
    // Check if the token is provided
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('good');
    console.log(decoded);
    if (!decoded.isAdmin) {
      console.log('bad');
      return NextResponse.json({ message: 'Access denied. Admins only.' }, { status: 403 });
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