import { NextResponse } from "next/server";
import dbConnect from "@lib/dbConnect";
import Ads from "@models/Ads";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";

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





// GET handler: Retrieve all ads
export async function GET() {
  try {
    await dbConnect();
    const ads = await Ads.find().lean();
    console.log(ads); // Fetch all ads
    return NextResponse.json({ data: ads }, { status: 200 });
  } catch (error) {
    console.error("Error fetching ads:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}