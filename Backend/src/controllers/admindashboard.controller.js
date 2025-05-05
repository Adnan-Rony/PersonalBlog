import BlogModel from "../models/Blog.model.js";
import UserModel from "../models/User.model.js";

// controllers/adminController.js
export const adminDashboard = async (req, res) => {
    try {
      const blogs = await BlogModel.find().populate('author', 'name email');
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching blogs for admin', error: error.message });
    }
  };


  export const getAdminOverview = async (req, res) => {
    try {
      const totalUsers = await UserModel.countDocuments();
      const totalAdmins = await UserModel.countDocuments({ role: 'admin' });
      const bannedUsers = await UserModel.countDocuments({ banned: true });
  
      const totalBlogs = await BlogModel.countDocuments();
      const publishedBlogs = await BlogModel.countDocuments({ status: 'published' });
      const pendingBlogs = await BlogModel.countDocuments({ status: 'pending' });
      const rejectedBlogs = await BlogModel.countDocuments({ status: 'rejected' });
  
      res.status(200).json({
        users: totalUsers,
        admins: totalAdmins,
        bannedUsers,
        blogs: {
          total: totalBlogs,
          published: publishedBlogs,
          pending: pendingBlogs,
          rejected: rejectedBlogs,
        },
      });
    } catch (err) {
      res.status(500).json({ message: 'Error getting overview', error: err.message });
    }
  };


  export const deleteBlog = async (req, res) => {
    try {
      const blogId = req.params.id;
      const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
  
      if (!deletedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting blog', error: error.message });
    }
  };
  
  