import BlogModel from "../models/Blog.model.js";

// controllers/adminController.js
export const adminDashboard = async (req, res) => {
    try {
      const blogs = await BlogModel.find().populate('author', 'name email');
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching blogs for admin', error: error.message });
    }
  };
  