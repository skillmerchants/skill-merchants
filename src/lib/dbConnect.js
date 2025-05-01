import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Initialize the global mongoose object if it doesn't exist
let cached = global.mongoose || (global.mongoose = { conn: null, promise: null });

async function dbConnect() {
  console.log('Connecting to MongoDB...');
  // If a connection already exists, return it
  if (cached.conn) {
    console.log('Using existing MongoDB connection');
    return cached.conn;
  }

  // If no connection exists, but a promise is pending, wait for it
  if (!cached.promise) {
    console.log('Establishing new MongoDB connection');
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongooseInstance) => {
        console.log('MongoDB connected successfully');
        return mongooseInstance;
      })
      .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
        throw error; // Re-throw the error to propagate it
      });
  }

  // Wait for the connection to complete and cache it
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;