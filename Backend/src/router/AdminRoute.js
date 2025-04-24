import express  from 'express';

import { verifyToken } from '../middleware/verifyToken.js';
import { adminDashboard } from '../controllers/admindashboard.controller.js';
import { checkAdmin } from '../middleware/checkAdmin.js';


const router = express.Router();

// routes/adminRoutes.js
router.get('/dashboard', verifyToken, checkAdmin, adminDashboard); 
// isAdmin is middleware to check if the user is admin
export default router;