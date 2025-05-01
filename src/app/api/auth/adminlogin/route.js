     // app/api/auth/login/route.js
     import dbConnect from '@lib/dbConnect';
     import Admin from '@models/Admin';
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
     
     
     
         // Find the admin by email
         const admin = await Admin.findOne({ email });
         if (!admin) {
           return new Response(
             JSON.stringify({ message: 'Invalid email' }),
             { status: 401 } // 401 Unauthorized
           );
         }
     
         // Compare the password
         const isMatch = await admin.comparePassword(password);
         if (!isMatch) {
           return new Response(
             JSON.stringify({ message: 'Invalid password' }),
             { status: 401 } // 401 Unauthorized
           );
         }
     
         // Generate JWT token with role
         const token = jwt.sign(
           { adminId: admin._id, isAdmin: admin.isAdmin },
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