import { NextResponse } from "next/server";
import dbConnect from "@lib/dbConnect";
import mentor from "@models/mentor";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// POST: Create a new mentor
export async function POST(req) {
  try {
    await dbConnect();
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
    const body = await req.json();
    const {
      name,
      category,
      description,
      course,
      location,
      salary,
      duration,
      availability,
      experience,
      link,
    } = body;

    // Validate input
    if (
      !name ||
      !category ||
      !description ||
      !course ||
      !location ||
      !salary ||
      !link ||
      !duration ||
      availability === undefined ||
      !experience
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate types
    if (isNaN(salary) || salary < 0) {
      return NextResponse.json(
        { message: "Salary must be a valid non-negative number" },
        { status: 400 }
      );
    }
    if (isNaN(experience) || experience < 0) {
      return NextResponse.json(
        { message: "Experience must be a valid non-negative number" },
        { status: 400 }
      );
    }
    if (!["true", "false", true, false].includes(availability)) {
      return NextResponse.json(
        { message: "Availability must be a boolean" },
        { status: 400 }
      );
    }
    

    // Create new mentor
    const newMentor = new mentor({
      name,
      category,
      description,
      course,
      location,
      salary: Number(salary),
      duration,
      availability: Boolean(availability),
      experience: Number(experience),
      link,
    });

    await newMentor.save();

    return NextResponse.json(
      { message: "Mentor created successfully", data: mentor },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating mentor:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
// GET handler: Retrieve mentors with pagination
export async function GET(request) {
  try {
    // Connect to database
    await dbConnect();

    // Get query parameters for pagination
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 6; // Default to 6 mentors
    const skip = parseInt(searchParams.get("skip")) || 0; // Default to 0 skip

    // Fetch mentors with limit and skip
    const mentors = await mentor.find().skip(skip).limit(limit).lean();
    console.log("Fetched mentors:", mentors);

    // Get total count for frontend
    const totalMentors = await mentor.countDocuments();

    return NextResponse.json(
      {
        data: mentors,
        total: totalMentors,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching mentors:", error.message, error.stack);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}