import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // HTML from Quill
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['published', 'pending', 'rejected'],
      default: 'published'
    },
    createdAt: {
      type: Date,
      default: Date.now
    } 
})

export default mongoose.model('Blog',blogSchema)