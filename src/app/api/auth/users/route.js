import jwt from 'jsonwebtoken';
import dbConnect from '@lib/dbConnect';
import User from '@models/User';
export async function GET(req) {
      await dbConnect();
    
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const userData = verifyToken(token); // Verify the token and extract user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!userData) {
            return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
        }

        const user = await User.findUnique({
            where: { id: userData.id },
            select: { id: true, name: true, email: true, createdAt: true },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ user }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}