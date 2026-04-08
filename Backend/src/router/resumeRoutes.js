import express from 'express';
import {
  getResume,
  createResume,
  updateResume,
  updateResumeSection,
  updatePdfLink,
  deleteResume,
} from '../controllers/resume.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { checkAdmin } from '../middleware/checkAdmin.js';

const router = express.Router();

// ─── Public ───────────────────────────────────────────────────────────────────
router.get('/', getResume);                                      // GET  /api/v1/resume

// ─── Admin only ───────────────────────────────────────────────────────────────
router.post('/',              verifyToken, checkAdmin, createResume);         // POST   /api/v1/resume
router.put('/',               verifyToken, checkAdmin, updateResume);         // PUT    /api/v1/resume
router.patch('/section',      verifyToken, checkAdmin, updateResumeSection);  // PATCH  /api/v1/resume/section
router.patch('/pdf',          verifyToken, checkAdmin, updatePdfLink);        // PATCH  /api/v1/resume/pdf
router.delete('/',            verifyToken, checkAdmin, deleteResume);         // DELETE /api/v1/resume

export default router;
