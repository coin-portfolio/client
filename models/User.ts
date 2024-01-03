import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, minLength: 6, required: true },
  email: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
