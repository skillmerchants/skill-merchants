// models/ads.js
import mongoose from 'mongoose';

const AdsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  img: { type: String, required: true },
  video: { type: String, required: true },
  image: { type: mongoose.Schema.Types.ObjectId, ref: 'File' }, 
  video: { type: mongoose.Schema.Types.ObjectId, ref: 'File' }, 
  createdAt: { type: Date, default: Date.now },
});
AdsSchema.pre('save', function (next) {
  this.createdAt = new Date();
  next();
});
const Ads = mongoose.models.Ads || mongoose.model('Ads', AdsSchema);

export default Ads;