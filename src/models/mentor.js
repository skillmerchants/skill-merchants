// models/mentor.js
import mongoose from 'mongoose';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  course: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  duration: { type: Date, required: true },
  experience: { type: Number, required: true },
});

const mentor = mongoose.models.mentor || mongoose.model('mentor', mentorSchema);

export default mentor;