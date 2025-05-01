import { NextResponse } from "next/server";
import dbConnect from "@lib/dbConnect";
import Ads from "@models/Ads";
import mongoose from "mongoose";
import multer from "multer";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Middleware to handle multipart/form-data
const uploadMiddleware = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

// Helper function to run middleware in Next.js API routes
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// Helper to upload file buffer to GridFS
async function uploadFileToGridFS(buffer, filename, mimeType) {
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

    // Run multer middleware to parse FormData
    await runMiddleware(req, {}, uploadMiddleware);

    // Extract text fields and files
    const { title, description, link } = req.body;
    const image = req.files?.image ? req.files.image[0] : null;
    const video = req.files?.video ? req.files.video[0] : null;

    // Debug received data
    console.log("Received fields:", { title, description, link });
    console.log("Received files:", {
      image: image?.originalname,
      video: video?.originalname,
    });

    // Validate input
    if (!title || !description || !link || !image || !video) {
      return NextResponse.json(
        { message: "Title, description, link, image, and video are required" },
        { status: 400 }
      );
    }

    // Upload files to GridFS
    const imageId = await uploadFileToGridFS(
      image.buffer,
      image.originalname,
      image.mimetype
    );
    const videoId = await uploadFileToGridFS(
      video.buffer,
      video.originalname,
      video.mimetype
    );

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