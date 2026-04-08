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
  getRecommendedBlogs,
  getSingleBlog,
  getUserBlogs,
  likeBlog,
  searchBlogs,
  unlikeBlog,
  updateBlogStatus,
  updateUserBlog,
} from '../controllers/blog.Controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { addComment } from '../controllers/comment.Controller.js';

const router = express.Router();

// ─── Static / filter routes (must come before /:id) ──────────────────────────
router.get('/tags', getBlogAllTags);
router.get('/category', getBlogsAllCategories);
router.get('/tag/:tag', getBlogsByTag);
router.get('/category/:category', getBlogsByCategory);
router.get('/search', searchBlogs);
router.get('/recommendations/:blogId', getRecommendedBlogs);

// ─── Authenticated user blog routes ──────────────────────────────────────────
router.get('/myblogs', verifyToken, getUserBlogs);
router.get('/myblogs/:id', verifyToken, getSingleBlog);
router.delete('/myblogs/:id', verifyToken, deleteUserBlog);

// ─── CRUD ─────────────────────────────────────────────────────────────────────
router.post('/create', verifyToken, createBlog);
router.put('/status/:id', verifyToken, updateBlogStatus);
router.put('/updateblogs/:id', verifyToken, updateUserBlog);

// ─── Like / Unlike ────────────────────────────────────────────────────────────
// BUG FIX 2: had TWO `/:id/like` routes — the second one (from likeblock.controller)
// never ran because Express matched the first. Removed the duplicate.
// Both like and unlike now live here, using the controller from blog.Controller.js.
router.put('/:id/like', verifyToken, likeBlog);
router.put('/:id/unlike', verifyToken, unlikeBlog);

// ─── Comments ─────────────────────────────────────────────────────────────────
router.post('/comments/:blogId', verifyToken, addComment);

// ─── Delete ───────────────────────────────────────────────────────────────────
router.delete('/:id', verifyToken, deleteBlog);

// ─── Main fetch routes (keep /:id LAST to avoid swallowing static routes) ─────
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

export default router;
