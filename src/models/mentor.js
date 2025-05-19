// models/mentor.js
import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  course: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  duration: { type: String, required: true },
  availability: { type: Boolean, required: true },
  experience: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  link: { type: String, required: true },
});

const mentor = mongoose.models.mentor || mongoose.model('mentor', mentorSchema);

export default mentor;

