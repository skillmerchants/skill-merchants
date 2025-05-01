// models/Job.js
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  url: { type: String, required: true },
  company: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

export default Job;