// app/api/auth/signup/route.js
import dbConnect from '@lib/dbConnect';
import User from '@models/User';
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

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return new Response(
          JSON.stringify({ message: 'User already exists' }),
          { status: 400 }
        );
      }

      // Hash the password

      // Create a new user
      const newUser = new User({
        email,
        password,
        isAdmin: false, // Mark this user as a regular user
      });
    console.log(newUser);
      await newUser.save();
      console.log('User registered successfully:', newUser);
      // Redirecting the user after successful registration
      return new Response(
        JSON.stringify({ message: 'User registered successfully' }),
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