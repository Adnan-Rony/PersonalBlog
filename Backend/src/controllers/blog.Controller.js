import BlogModel from "../models/Blog.model.js";
import UserModel from "../models/User.model.js";

export const createBlog = async (req, res) => {
  const { title, content, categories, tags } = req.body;
  const image = req.file ? req.file.filename : null;
      
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
      categories,
      tags,

      image, // image path from multer
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

export const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findById(id).populate('author', 'name email');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
}


export const getBlogsByCategory = async (req, res) => {
  const { category } = req.params;

  if (!category || category.trim() === "") {
    return res.status(400).json({ message: "Category is required" });
  }

  try {
    const blogs = await BlogModel.find({ categories: category });

    if (!blogs.length) {
      return res.status(404).json({ message: "No blogs found for this category" });
    }

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs", error: err.message });
  }
};

export const getBlogsByTag = async (req, res) => {
  const { tag } = req.params;
  if (!tag || tag.trim() === "") {
    return res.status(400).json({ message: "Tag is required" });
  }


  try {
    const blogs = await BlogModel.find({ tags: tag });

    if (!blogs.length) {
      return res.status(404).json({ message: "No blogs found for this tag" });
    }
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err.message });
  }
}

export const getBlogAllTags = async (req, res) => {
  try {
    const blogs = await BlogModel.find().select('tags');

    const allTagsSet = new Set();
    blogs.forEach(blog => {
      blog.tags?.forEach(tag => allTagsSet.add(tag));
    });

    const uniqueTags = Array.from(allTagsSet);
    res.status(200).json(uniqueTags);
    
  } catch (error) {
    console.error('Error fetching tags:', error.message);
    res.status(500).json({ message: 'Error fetching tags', error: error.message });
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



// Search blog posts by title or content
export const searchBlogs = async (req, res) => {
  const { query } = req.query; // Get the search query from query params

  try {
    // Check if query exists
    if (!query) {
      return res.status(400).json({ message: 'Please provide a search query' });
    }

    // Use regular expression to perform case-insensitive search on title and content
    const blogs = await BlogModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Search by title (case-insensitive)
        { content: { $regex: query, $options: 'i' } } // Search by content (case-insensitive)
      ]
    });

    // Return the search results
    if (blogs.length > 0) {
      return res.status(200).json({ message: 'Blogs found', blogs });
    } else {
      return res.status(404).json({ message: 'No blogs found' });
    }
    
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
};