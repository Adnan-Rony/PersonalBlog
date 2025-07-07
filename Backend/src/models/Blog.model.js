import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // HTML from Quill
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    image: {
      type: String, // will store image path
      default: '',
    },
categories: {
  type: String,
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
    'Open Source'
  ],
  required: true
}

      
    
    
    , 
    tags: {
      type: [String],
      default: []
    },
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}],

    status: {
      type: String,
      enum: ['published', 'pending', 'rejected'],
      default: 'published'
    },
    // In Blog model
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],

    createdAt: {
      type: Date,
      default: Date.now
    } 
})

export default mongoose.model('Blog',blogSchema)