import { NextResponse } from 'next/server';
import dbConnect from '@lib/dbConnect';
import mentor from '@models/mentor';
export async function GET() {
          await dbConnect();
    
    try {   
        
        const Mentor = await mentor.find().toArray(); // Exclude passwords for security

        return NextResponse.json({ success: true, data: Mentor, count: Mentor.length });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch mentors information.',
            error: error.message,
        }, { status: 500 });
    }
}


export async function POST(request) {
    await dbConnect();
    try {
        const body = await request.json();
        const { name, email, phone, location, imageUrl } = body;
        console.log('Request body:', body);

        // Validate input
        if (!name || !email || !phone || !location || !imageUrl) {
            return NextResponse.json({ message: 'Name, email, phone, location, and image URL are required' }, { status: 400 });
        }

        // Create a new ad
        const newMentor = new mentor({
            name,
            email,
            phone,
            location,
            imageUrl,
        });

        await newMentor.save();
        console.log('Mentor created successfully:', newMentor);
        return NextResponse.json({ message: 'Mentor created successfully', data: newMentor }, { status: 201 });
    } catch (error) {
        console.error('Error creating Mentor:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
