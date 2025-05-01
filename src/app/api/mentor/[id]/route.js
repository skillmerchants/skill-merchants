import { NextResponse } from 'next/server';
import dbConnect from '@lib/dbConnect';
import mentor from '@models/mentor';

export async function PUT(request, { params }) {
    await dbConnect();
    try {
        const body = await request.json();
        const {  name, email, phone, location, imageUrl } = body;
        const id = (await params).id; // Extract the mentor ID from the request query
        // Validate input
        if (!id || !name || !email || !phone || !location || !imageUrl) {
            return NextResponse.json({ message: 'ID, name, email, phone, location, and image URL are required' }, { status: 400 });
        }

        // Update the mentor
        const updatedMentor = await mentor.findByIdAndUpdate(
            id,
            { name, email, phone, location, imageUrl },
            { new: true } // Return the updated document
        );

        if (!updatedMentor) {
            return NextResponse.json({ message: 'Mentor not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Mentor updated successfully', data: updatedMentor }, { status: 200 });
    } catch (error) {
        console.error('Error updating Mentor:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    await dbConnect();
    try {
        const body = await request.json();
        const id = (await params).id; // Extract the mentor ID from the request query
        console.log('Request body:', body);

        // Validate input
        if (!id) {
            return NextResponse.json({ message: 'ID is required' }, { status: 400 });
        }

        // Delete the mentor
        const deletedMentor = await mentor.findByIdAndDelete(id);

        if (!deletedMentor) {
            return NextResponse.json({ message: 'Mentor not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Mentor deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting Mentor:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
export async function GET(request, { params }) {
    await dbConnect();
    try {
        const id = (await params).id; // Extract the mentor ID from the request query

        // Validate input
        if (!id) {
            return NextResponse.json({ message: 'ID is required' }, { status: 400 });
        }

        // Fetch the mentor by ID
        const fetchedMentor = await mentor.findById(id);

        if (!fetchedMentor) {
            return NextResponse.json({ message: 'Mentor not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Mentor fetched successfully', data: fetchedMentor }, { status: 200 });
    } catch (error) {
        console.error('Error fetching Mentor:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}