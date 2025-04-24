import BlogModel from "../models/Blog.model.js";

export const likeBlog = async (req, res) => {
    const { blogId } = req.params;
    try {
      const blog = await BlogModel.findById(blogId);
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
  
      const user = req.user.id;
  
      if (blog.likes.includes(user)) {
        // Unlike the blog if already liked
        blog.likes = blog.likes.filter(like => like.toString() !== user.toString());
      } else {
        // Like the blog
        blog.likes.push(user);
      }
  
      await blog.save();
      res.status(200).json({ message: 'Blog like/unlike successful', blog });
    } catch (error) {
      res.status(500).json({ message: 'Error liking blog', error: error.message });
    }
  };
  