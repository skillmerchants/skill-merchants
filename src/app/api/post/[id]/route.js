
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

export async function DELETE(request ,{ params }) {
    await dbConnect();
    try {
        const id = (await params).id; // Extract the ad ID from the request query
        console.log('Request body:', request.body);
        // Validate input
        if (!id) {
            return NextResponse.json({ message: 'Ad ID is required' }, { status: 400 });
        }

        // Delete the ad
        const deletedAd = await Ads.findByIdAndDelete(id);

        if (!deletedAd) {
            return NextResponse.json({ message: 'Ad not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Ad deleted successfully' });
    } catch (error) {
        console.error('Error deleting ad:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}


export async function GET(request) {
  await dbConnect();

  try {
    // Extract fileId from query parameters
    const url = new URL(request.url);
    const fileId = url.searchParams.get('fileId');

    if (!fileId) {
      return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
    }

    // Access the MongoDB database
    const db = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'uploads' });

    // Open a download stream for the file
    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
    const chunks = [];

    // Collect all chunks into a buffer
    for await (const chunk of downloadStream) {
      chunks.push(chunk);
    }

    // Check if any data was collected
    if (chunks.length === 0) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Combine chunks into a single buffer
    const fileBuffer = Buffer.concat(chunks);

    // Return the file as a response
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="download"`, // Optional: Prompt download
      },
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}