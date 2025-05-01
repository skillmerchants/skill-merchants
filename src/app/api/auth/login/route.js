     // app/api/auth/login/route.js
import dbConnect from '@lib/dbConnect';
import User from '@models/User';
import jwt from 'jsonwebtoken';

export async function POST(request) {
      // Connect to the database
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



    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Invalid email' }),
        { status: 401 } // 401 Unauthorized
      );
    }

    // Compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ message: 'Invalid password' }),
        { status: 401 } // 401 Unauthorized
      );
    }

    // Generate JWT token with role
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '101h' }
    );

    // Set token in cookies
    return new Response(
      JSON.stringify({ token }),
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=${token}; Path=/; HttpOnly; Max-Age=363600`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error during login:', error);

    return new Response(
      JSON.stringify({
        message: 'An unexpected error occurred',
        details: error.message,
      }),
      { status: 500 }
    );
  }
}