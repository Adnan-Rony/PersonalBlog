import BlogModel from "../models/Blog.model.js";
import commentModel from "../models/comment.model.js";


export const addComment = async (req, res) => {
    const { blogId } = req.params;
    const { content } = req.body;
    try {
      const blog = await BlogModel.findById(blogId);
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
  
      const comment = new commentModel({
        content,
        blog: blogId,
        author: req.user.id
      });
  
      await comment.save();
  // Push comment to blog
  blog.comments.push(comment._id);
  await blog.save();



      res.status(201).json({ message: 'Comment added', comment });
    } catch (error) {
      res.status(500).json({ message: 'Error adding comment', error: error.message });
    }
  };
  