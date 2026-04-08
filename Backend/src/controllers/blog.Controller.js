import BlogModel from "../models/Blog.model.js";
import UserModel from "../models/User.model.js";

// ─── Create Blog ──────────────────────────────────────────────────────────────
export const createBlog = async (req, res) => {
  const { title, content, categories, tags, image } = req.body;

  // BUG FIX 4: validate required fields instead of letting Mongoose throw raw errors
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required' });
  }
  if (!content || typeof content !== 'string' || content.trim() === '') {
    return res.status(400).json({ message: 'Content is required' });
  }
  if (!categories || (Array.isArray(categories) && categories.length === 0)) {
    return res.status(400).json({ message: 'At least one category is required' });
  }

  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const blog = new BlogModel({
      title: title.trim(),
      content,
      author: user._id,
      // BUG FIX 1 (carried here): ensure categories is always stored as array
      categories: Array.isArray(categories) ? categories : [categories],
      tags: Array.isArray(tags) ? tags : [],
      image: image || '',
    });

    await blog.save();

    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// ─── Search blogs by title or content ────────────────────────────────────────
export const searchBlogsByTitle = async (req, res) => {
  const { query } = req.query;
  if (!query || query.trim() === '') {
    return res.status(400).json({ message: 'Query parameter is required' });
  }
  try {
    const blogs = await BlogModel.find({
      title: { $regex: query.trim(), $options: 'i' },
    }).select('title');
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: 'Failed to search blogs', error: error.message });
  }
};


// ─── Get all blogs (public) ───────────────────────────────────────────────────
export const getAllBlogs = async (req, res) => {
  try {
    const { title } = req.query;
    const filter = title ? { title: { $regex: title.trim(), $options: 'i' } } : {};

    const blogs = await BlogModel.find(filter)
      .populate('author', 'name email')
      .populate({
        path: 'comments',
        select: 'content author createdAt',
        populate: { path: 'author', select: 'name' },
      })
      .populate('likes', 'name email profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
};


// ─── Get logged-in user's blogs ───────────────────────────────────────────────
export const getUserBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find({ author: req.user.id })
      .populate('author', 'name email')
      .populate({
        path: 'comments',
        select: 'content author createdAt',
        populate: { path: 'author', select: 'name' },
      })
      .populate('likes', 'name email profilePicture');

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


// ─── Get single blog (for logged-in user's dashboard) ────────────────────────
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id)
      .populate('author', 'name email')
      .populate({
        path: 'comments',
        select: 'content author createdAt',
        populate: { path: 'author', select: 'name' },
      })
      .populate('likes', 'name email profilePicture');

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};


// ─── Get blog by ID (public) ──────────────────────────────────────────────────
export const getBlogById = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id)
      .populate('author', 'name email')
      .populate({
        path: 'comments',
        select: 'content author createdAt',
        populate: { path: 'author', select: 'name' },
      })
      .populate('likes', 'name email profilePicture');

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
};


// ─── Update user's own blog ───────────────────────────────────────────────────
// BUG FIX 5: removed the duplicate `updateBlog` function — it was identical to
// `updateUserBlog`. Now only `updateUserBlog` exists and is used in routes.
export const updateUserBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, categories, tags } = req.body;

  // BUG FIX 4: validate before hitting the DB
  if (title !== undefined && title.trim() === '') {
    return res.status(400).json({ message: 'Title cannot be empty' });
  }
  if (content !== undefined && content.trim() === '') {
    return res.status(400).json({ message: 'Content cannot be empty' });
  }

  try {
    const blog = await BlogModel.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this blog' });
    }

    if (title)   blog.title   = title.trim();
    if (content) blog.content = content;
    if (categories) {
      blog.categories = Array.isArray(categories) ? categories : [categories];
    }
    if (tags) blog.tags = Array.isArray(tags) ? tags : [tags];

    await blog.save();
    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// ─── Delete user's own blog ───────────────────────────────────────────────────
export const deleteUserBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized: Not your blog' });
    }

    await BlogModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


// ─── Delete blog (admin or author) ───────────────────────────────────────────
export const deleteBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const user = await UserModel.findById(req.user.id);
    if (blog.author.toString() !== req.user.id && user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    await BlogModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
};


// ─── Update blog status (admin or author) ────────────────────────────────────
export const updateBlogStatus = async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['published', 'pending', 'rejected'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const user = await UserModel.findById(req.user.id);
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


// ─── Search blogs ─────────────────────────────────────────────────────────────
export const searchBlogs = async (req, res) => {
  const { query } = req.query;
  if (!query || query.trim() === '') {
    return res.status(400).json({ message: 'Query parameter is required' });
  }
  try {
    const blogs = await BlogModel.find({
      $or: [
        { title:   { $regex: query.trim(), $options: 'i' } },
        { content: { $regex: query.trim(), $options: 'i' } },
      ],
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// ─── Get blogs by category ────────────────────────────────────────────────────
export const getBlogsByCategory = async (req, res) => {
  const { category } = req.params;
  if (!category || category.trim() === '') {
    return res.status(400).json({ message: 'Category is required' });
  }
  try {
    // BUG FIX 1 (carried here): categories is now an array, so $in is correct
    const blogs = await BlogModel.find({ categories: { $in: [category] } });
    if (!blogs.length) {
      return res.status(404).json({ message: 'No blogs found for this category' });
    }
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err.message });
  }
};


// ─── Get all unique categories ────────────────────────────────────────────────
export const getBlogsAllCategories = async (req, res) => {
  try {
    const blogs = await BlogModel.find().select('categories');
    const allCategoriesSet = new Set();
    blogs.forEach(blog => {
      blog.categories?.forEach(cat => allCategoriesSet.add(cat));
    });
    res.status(200).json(Array.from(allCategoriesSet));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};


// ─── Get blogs by tag ─────────────────────────────────────────────────────────
export const getBlogsByTag = async (req, res) => {
  const { tag } = req.params;
  if (!tag || tag.trim() === '') {
    return res.status(400).json({ message: 'Tag is required' });
  }
  try {
    const blogs = await BlogModel.find({ tags: tag });
    if (!blogs.length) {
      return res.status(404).json({ message: 'No blogs found for this tag' });
    }
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err.message });
  }
};


// ─── Get all unique tags ──────────────────────────────────────────────────────
export const getBlogAllTags = async (req, res) => {
  try {
    const blogs = await BlogModel.find().select('tags');
    const allTagsSet = new Set();
    blogs.forEach(blog => {
      blog.tags?.forEach(tag => allTagsSet.add(tag));
    });
    res.status(200).json(Array.from(allTagsSet));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tags', error: error.message });
  }
};


// ─── Get recommended blogs (by shared tags) ───────────────────────────────────
export const getRecommendedBlogs = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const recommended = await BlogModel.find({
      _id: { $ne: req.params.blogId },
      tags: { $in: blog.tags },
    })
      .limit(5)
      .sort({ createdAt: -1 })
      .populate('author', 'name email');

    res.status(200).json(recommended);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommended blogs', error: error.message });
  }
};


// ─── Like blog ────────────────────────────────────────────────────────────────
// BUG FIX 3: original likeBlog in blog.Controller.js had NO try/catch
export const likeBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user.id;

  try {
    const blog = await BlogModel.findById(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.likes.includes(userId)) {
      return res.status(400).json({ message: 'Already liked this blog' });
    }

    blog.likes.push(userId);
    await blog.save();

    res.status(200).json({ message: 'Liked successfully', totalLikes: blog.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Error liking blog', error: error.message });
  }
};


// ─── Unlike blog ──────────────────────────────────────────────────────────────
export const unlikeBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user.id;

  try {
    const blog = await BlogModel.findById(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (!blog.likes.includes(userId)) {
      return res.status(400).json({ message: "You haven't liked this blog" });
    }

    blog.likes = blog.likes.filter(id => id.toString() !== userId);
    await blog.save();

    res.status(200).json({ message: 'Unliked successfully', totalLikes: blog.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Error unliking blog', error: error.message });
  }
};
