import express from 'express';
import {
  createBlog,
  deleteBlog,
  deleteUserBlog,
  getAllBlogs,
  getBlogAllTags,
  getBlogById,
  getBlogsAllCategories,
  getBlogsByCategory,
  getBlogsByTag,
  getSingleBlog,
  getUserBlogs,
  searchBlogs,
  updateBlog,
  updateBlogStatus,
  updateUserBlog
} from '../controllers/blog.Controller.js';
import { verifyToken } from './../middleware/verifyToken.js';
import { addComment } from '../controllers/comment.Controller.js';
import { likeBlog } from '../controllers/likeblock.controller.js';

const router = express.Router();

// ✅ STATIC ROUTES FIRST
router.get("/tags", getBlogAllTags);
router.get("/category", getBlogsAllCategories);
router.get("/tag/:tag", getBlogsByTag);
router.get("/category/:category", getBlogsByCategory);
router.get("/search", searchBlogs);


// ✅ CRUD & AUTH ROUTES
router.post("/create", verifyToken, createBlog);
router.delete("/:id", verifyToken, deleteBlog);
router.put("/status/:id", verifyToken, updateBlogStatus);
router.put("/:blogId/like", verifyToken, likeBlog);
router.get("/myblogs",verifyToken,getUserBlogs)
router.get("/myblogs/:id",verifyToken,getSingleBlog)
router.delete("/myblogs/:id",verifyToken,deleteUserBlog)



router.put("/updateblogs/:id",verifyToken,updateUserBlog)


router.put("/editblog/:id",verifyToken,updateBlog)

// ✅ COMMENT ROUTES
router.post('/comments/:blogId', verifyToken, addComment);


// ✅ MAIN FETCH ROUTES
router.get("/", getAllBlogs);
router.get("/:id", getBlogById); // ❗Keep this LAST to avoid route collision

export default router;
