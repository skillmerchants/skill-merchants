// pages/api/jobs/[id].js
import dbConnect from '@lib/dbConnect'; 
import Job from '@models/job';
import { NextResponse } from 'next/server';
// PUT: Update an existing job
export async function PUT(req, { params }) {
  try {
    await dbConnect(); // Connect to the database

    const { id } = await params; // Extract the job ID from context.params
    console.log('Job ID:', id);

    const body = await req.json(); // Parse the request body
    const { title, description, location, company, url, salary } = body;

    // Validate required fields
    if (!title || !description || !location || !company || !url || !salary) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Update the job in the database
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { title, description, location, company, url, salary },
      { new: true, runValidators: true } // Return the updated document and validate
    );

    if (!updatedJob) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update job' },
      { status: 500 }
    );
  }
}


export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    console.log("Deleting job ID:", id);

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  const { id } =  await params; // Extract the job ID from params
  console.log('Job ID:', id);
  await dbConnect();

  try {
    // Remove the redundant extraction of id from params
    // Validate input
    if (!id) {
      return new Response('Job ID is required', { status: 400 });
    }

    // Get the job
    const job = await Job.findById(id);

    if (!job) {
      return new Response('Job not found', { status: 404 });
    }
     console.log('Job:', job);
      return NextResponse.json(job);
    
    // return new Response(JSON.stringify(job), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
};