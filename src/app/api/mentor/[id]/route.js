import { NextResponse } from 'next/server';
import dbConnect from '@lib/dbConnect';
import mentor from '@models/mentor';

// PUT: Update a mentor by ID
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    

    const body = await req.json();
    const {
      name,
      description,
      course,
      location,
      salary,
      duration,
      availability,
      experience,
    } = body;

    // Validate input (allow partial updates)
    if (
      name !== undefined && !name ||
      description !== undefined && !description ||
      course !== undefined && !course ||
      location !== undefined && !location ||
      salary !== undefined && (isNaN(salary) || salary < 0) ||
      duration !== undefined && !duration ||
      availability !== undefined && !["true", "false", true, false].includes(availability) ||
      experience !== undefined && (isNaN(experience) || experience < 0)
    ) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    // Find and update mentor
    const updateData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(course && { course }),
      ...(location && { location }),
      ...(salary !== undefined && { salary: Number(salary) }),
      ...(duration && { duration}),
      ...(availability !== undefined && { availability: Boolean(availability) }),
      ...(experience !== undefined && { experience: Number(experience) }),
    };

    const Mentor = await mentor.findByIdAndUpdate(id, updateData, {
      new: true, // Return updated document
      runValidators: true, // Run schema validators
    });

    if (!Mentor) {
      return NextResponse.json({ message: "Mentor not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Mentor updated successfully", data: Mentor },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating mentor:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
};




// DELETE: Delete a mentor by ID
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

  
    const Mentor = await mentor.findByIdAndDelete(id);

    if (!Mentor) {
      return NextResponse.json({ message: "Mentor not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Mentor deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting mentor:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
};



export async function GET(request, { params }) {
    await dbConnect();
    try {
        const { id } = await params;

        // Validate input
      

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