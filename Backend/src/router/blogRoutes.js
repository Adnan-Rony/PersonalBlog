
import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, updateBlogStatus } from '../controllers/blog.Controller.js';
import { verifyToken } from './../middleware/verifyToken.js';
import { addComment } from '../controllers/comment.Controller.js';
import { likeBlog } from '../controllers/likeblock.controller.js';


const router = express.Router();

router.post("/create",verifyToken, createBlog)

router.get("/",getAllBlogs)

// ❌ Delete a blog (only author or admin)
router.delete("/:id",deleteBlog)


// Update blog status (author or admin only)
router.put("/status/:id", verifyToken,updateBlogStatus);


//comment routes

router.post('/comments/:blogId/', verifyToken, addComment);

// routes/blogRoutes.js
router.put('/:blogId/like', verifyToken, likeBlog);





export default router;
