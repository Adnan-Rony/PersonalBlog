import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: false // only needed if you're handling login with email/password
  },
  

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  // its optional user profile fields
  bio: {
    type: String,
    default: '',
  },
  profilePicture: {
    type: String,
    default: '',
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model('User', userSchema);
