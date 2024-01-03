import mongoose, { Schema } from 'mongoose';

const EmailAuthSchema = new Schema({
  email: { type: String },
  authNumber: { type: Number },
  date: { type: Date, required: true },
});

export default mongoose.models.Email_Auth || mongoose.model('Email_Auth', EmailAuthSchema);
