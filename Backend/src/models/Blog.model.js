import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  content: {
    type: String,
    required: true,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  image: {
    type: String,
    default: '',
  },

  // BUG FIX 1: was `type: String` — broke multi-category support and array filtering
  categories: {
    type: [String],
    enum: [
      'Web Development',
      'portfolio',
      'Mobile Development',
      'Frontend',
      'Backend',
      'Full Stack',
      'DevOps',
      'APIs & Integration',
      'Programming Languages',
      'Open Source',
    ],
    default: [],
  },

  tags: {
    type: [String],
    default: [],
  },

  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

  status: {
    type: String,
    enum: ['published', 'pending', 'rejected'],
    default: 'published',
  },

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Blog', blogSchema);
