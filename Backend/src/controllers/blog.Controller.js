import BlogModel from "../models/Blog.model.js";
import UserModel from "../models/User.model.js";

export const createBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    // 🧑‍💼 Find the user by MongoDB _id (from JWT)
    const user = await UserModel.findById(req.user.id); // assumes token contains { id: user._id }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 📝 Create the blog post
    const blog = new BlogModel({
      title,
      content,
      author: user._id,
    });

    await blog.save();

    res.status(201).json({
      message: 'Blog created successfully',
      blog,
    });

  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find()
      .populate('author', 'name email') // shows author name & email only
      .sort({ createdAt: -1 });         // newest blogs first (optional)

    res.status(200).json(blogs);

  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      message: 'Error fetching blogs',
      error: error.message,
    });
  }
};
  
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // ✅ Get logged-in user
    const user = await UserModel.findById(req.user.id);

    // 🛡️ Only the author or an admin can delete
    if (blog.author.toString() !== req.user.id && user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to delete this blog' });
    }

    await BlogModel.findByIdAndDelete(id);

    res.status(200).json({ message: 'Blog deleted successfully' });

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
};


export const updateBlogStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate status
  const validStatuses = ['published', 'pending', 'rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const blog = await BlogModel.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const user = await UserModel.findById(req.user.id);

    // Only author or admin can update status
    if (blog.author.toString() !== req.user.id && user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to change status' });
    }

    blog.status = status;
    await blog.save();

    res.status(200).json({ message: 'Blog status updated', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};