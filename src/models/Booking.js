import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  mentorId: { type: String, required: true },
  mentorName: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  durationMonths: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentProofFileId: { type: mongoose.Schema.Types.ObjectId }, // Store GridFS file ID
  paymentStatus: { type: String, enum: ["pending", "confirmed"], default: "pending" },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);