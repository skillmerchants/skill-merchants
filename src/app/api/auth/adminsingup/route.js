// app/api/auth/signup/route.js
import dbConnect from '@lib/dbConnect';
import Admin from '@models/Admin';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    await dbConnect();  

  try {

    // Parse the request body
    const body = await request.json();
    console.log('Request body:', body);

    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: 'Email and password are required' }),
        { status: 400 } 
      );
    }
 

    // Optional: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ message: 'Invalid email format' }),
        { status: 400 }
      );
    }
 
    
    try {
      // Connect to the database

      // Check if the Admin already exists
      const existingUser = await Admin.findOne({ email });
      if (existingUser) {
        return new Response(
          JSON.stringify({ message: 'Admin already exists' }),
          { status: 400 }
        );
      }

      // Hash the password
      const  isAdmin = true;
      const newAdmin = new Admin({
        email,
        password,
        isAdmin, // Mark this Admin as a regular Admin
      });
      console.log(newAdmin);

      await newAdmin.save();
      console.log('Admin registered successfully:', newAdmin);
      // Redirecting the Admin after successful registration
      return new Response(
        JSON.stringify({ message: 'Admin registered successfully' }),
        { status: 200 } 
      );

    } catch (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({
          message: 'Database connection failed',
          details: dbError.message,
        }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error during signup:', error);

    return new Response(
      JSON.stringify({
        message: 'An unexpected error occurred',
        details: error.message,
      }),
      { status: 500 }
    );
  }
}