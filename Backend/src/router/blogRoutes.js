
import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getBlogsByCategory, getBlogsByTag, searchBlogs, updateBlogStatus } from '../controllers/blog.Controller.js';
import { verifyToken } from './../middleware/verifyToken.js';
import { addComment } from '../controllers/comment.Controller.js';
import { likeBlog } from '../controllers/likeblock.controller.js';


const router = express.Router();

router.post("/create",verifyToken, createBlog)

router.get("/",getAllBlogs)

// Get blogs by category (optional)
router.get("/category/:category", getBlogsByCategory);


// Get blogs by tag (optional)
router.get("/tag/:tag", getBlogsByTag);




// ❌ Delete a blog (only author or admin)
router.delete("/:id",verifyToken,deleteBlog)


// Update blog status (author or admin only)
router.put("/status/:id", verifyToken,updateBlogStatus);


//comment routes

router.post('/comments/:blogId/', verifyToken, addComment);

// routes/blogRoutes.js
router.put('/:blogId/like', verifyToken, likeBlog);


// Search Blog Posts Route
router.get('/search', searchBlogs);


export default router;
