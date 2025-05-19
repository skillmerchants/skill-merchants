import { NextResponse } from "next/server";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import dbConnect from "@lib/dbConnect";
export async function GET(request, { params }) {
  try {
     await dbConnect();
    const fileId = new mongoose.Types.ObjectId(params.fileId);
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: "paymentProofs" });
    const file = await bucket.find({ _id: fileId }).toArray();
    if (!file || file.length === 0) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    const downloadStream = bucket.openDownloadStream(fileId);
    const chunks = [];

    downloadStream.on("data", (chunk) => chunks.push(chunk));
    downloadStream.on("error", () => {
      return NextResponse.json({ message: "Error retrieving file" }, { status: 500 });
    });

    return new Promise((resolve) => {
      downloadStream.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const response = new NextResponse(buffer, {
          status: 200,
          headers: {
            "Content-Type": file[0].contentType || "application/octet-stream",
            "Content-Disposition": `attachment; filename="${file[0].filename}"`,
          },
        });
        resolve(response);
      });
    });
  } catch (error) {
    console.error("Error retrieving file:", error);
    return NextResponse.json({ message: "Failed to retrieve file" }, { status: 500 });
  }
}