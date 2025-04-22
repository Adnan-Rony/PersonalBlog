
import mongoose from "mongoose";



const userSchema=new mongoose.Schema({
uid: { type: String, required: true, unique: true }, // Firebase UID
  name: { type: String },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
export default mongoose.model('User', userSchema);