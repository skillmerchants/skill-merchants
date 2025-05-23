import { NextResponse } from "next/server";
import dbConnect from "@lib/dbConnect";
import Ads from "@models/Ads";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';


// Helper to upload file buffer to GridFS
async function uploadFileToGridFS(buffer, filename, mimeType) {
  if (mongoose.connection.readyState !== 1) {
    throw new Error("MongoDB connection is not ready");
  }
  const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });
  const uploadStream = bucket.openUploadStream(filename, {
    metadata: { mimeType },
  });
  const readableStream = Readable.from(buffer);

  return new Promise((resolve, reject) => {
    readableStream
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", () => resolve(uploadStream.id));
  });
}

// POST handler: Create a new ad
export async function POST(req) {
  try {
    // Connect to MongoDB
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
    // Parse form data using NextRequest's formData()
    const formData = await req.formData();

    // Extract text fields
    const title = formData.get("title");
    const description = formData.get("description");
    const link = formData.get("link");

    // Extract files
    const image = formData.get("image");
    const video = formData.get("video");

    // Debug received data
    console.log("Received fields:", { title, description, link });
    console.log("Received files:", {
      image: image?.name,
      video: video?.name,
    });

    // Validate input
    if (!title || !description || !link || !image || !video) {
      return NextResponse.json(
        { message: "Title, description, link, image, and video are required" },
        { status: 400 }
      );
    }

    // Validate file size (e.g., 10MB limit)
    const maxFileSize = 10 * 1024 * 1024 ; // 10MB
    if (image.size > maxFileSize || video.size > maxFileSize) {
      return NextResponse.json(
        { message: "File size exceeds the 10MB limit" },
        { status: 400 }
      );
    }

    // Convert files to buffers
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const videoBuffer = Buffer.from(await video.arrayBuffer());

    // Upload files to GridFS
    const imageId = await uploadFileToGridFS(imageBuffer, image.name, image.type);
    const videoId = await uploadFileToGridFS(videoBuffer, video.name, video.type);

    // Create new ad
    const newAd = new Ads({
      title,
      description,
      link,
      image: imageId,
      video: videoId,
      createdAt: new Date(),
    });

    await newAd.save();

    return NextResponse.json(
      { message: "Ad created successfully", data: newAd },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating ad:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}




// GET handler: Retrieve ads with pagination
export async function GET(request) {
  try {
    await dbConnect();

    // Authentication
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log("Token:", token);

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    }

    // Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT verification error:", err);
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // Get query parameters for pagination
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 6; // Default to 6 ads per page
    const skip = parseInt(searchParams.get("skip")) || 0; // Default to 0 skip

    // Fetch ads with limit and skip
    const ads = await Ads.find()
      .skip(skip)
      .limit(limit)
      .lean();

    console.log("Fetched ads:", ads);

    // Optional: Get total count for frontend to determine if more data exists
    const totalAds = await Ads.countDocuments();

    return NextResponse.json(
      {
        data: ads,
        total: totalAds, // Include total for hasMore calculation
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching ads:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}