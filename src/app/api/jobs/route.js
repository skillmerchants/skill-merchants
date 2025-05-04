// pages/api/jobs/index.js
import dbConnect from '../../../lib/dbConnect';
import Job from '@models/job';
// import { PUT } from './[id]/route';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
export async function GET(req, res) {
  await dbConnect();

  try {
    const jobs = await Job.find({});
    // console.log(jobs);
    return NextResponse.json(jobs);
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

export async function POST(req, res) {
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

  try {
    const body = await req.json();
    const { title, description, location, company, url, salary } = body;

    // Validate input
    if (!title || !description || !location || !company || !url || !salary) {
      return new Response('All fields are required', { status: 400 });
    }

    // Create a new job
    const newJob = new Job({
      title,
      description,
      location,
      company,
      title,
      url,
      salary,
      createdAt: new Date(),
    });

    await newJob.save();
    return new Response(JSON.stringify(newJob), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};


