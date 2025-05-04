import { NextResponse } from "next/server";
import dbConnect from "@lib/dbConnect";
import Ads from "@models/Ads";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";

//   return new Response
export async function PUT(request ,{ params }) {
    await dbConnect();
    try {
        const body = await request.json();
        const {  title, description, img, link, video } = body;
        const id = (await params).id; // Extract the ad ID from the request query
        console.log('Request body:', body);
        // Validate input
        if (!id || !title || !description || !img || !link || !video) {
            console.log('Missing required fields');
            return NextResponse.json({ message: 'ID, title, description, img, link, and video are required' }, { status: 400 });
        }

        // Update the ad
        const updatedAd = await Ads.findByIdAndUpdate(
            id,
            { title, description, img, link, video , createdAt: new Date() }, // Add createdAt field
            { new: true } // Return the updated document
        );

        if (!updatedAd) {
            return NextResponse.json({ message: 'Ad not found' }, { status: 404 });
        }

        console.log('Ad updated successfully:', updatedAd);
        return NextResponse.json({ message: 'Ad updated successfully', data: updatedAd });
    } catch (error) {
        console.error('Error updating ad:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

// Helper to delete a file from GridFS
async function deleteFileFromGridFS(fileId) {
  if (!mongoose.Types.ObjectId.isValid(fileId)) {
    throw new Error("Invalid file ID");
  }
  const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });
  return bucket.delete(new mongoose.Types.ObjectId(fileId));
};

// DELETE handler: Delete an ad by ID
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ad ID" }, { status: 400 });
    }

    // Find the ad
    const ad = await Ads.findById(id);
    if (!ad) {
      return NextResponse.json({ message: "Ad not found" }, { status: 404 });
    }

    // Delete associated files from GridFS
    if (ad.image) {
      await deleteFileFromGridFS(ad.image);
    }
    if (ad.video) {
      await deleteFileFromGridFS(ad.video);
    }

    // Delete the ad
    await Ads.findByIdAndDelete(id);

    return NextResponse.json({ message: "Ad deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting ad:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}



export async function GET(req, { params }) {
  try {
    await dbConnect();

    const fileId = new mongoose.Types.ObjectId(params.id);
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });

    const files = await bucket.find({ _id: fileId }).toArray();
    if (!files || files.length === 0) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    const file = files[0];
    const downloadStream = bucket.openDownloadStream(fileId);

    return new Response(downloadStream, {
      headers: {
        "Content-Type": file.metadata.mimeType,
        "Content-Disposition": `inline; filename="${file.filename}"`,
      },
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}