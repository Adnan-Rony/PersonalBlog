import express  from 'express';

import { verifyToken } from '../middleware/verifyToken.js';
import { adminDashboard, getAdminOverview } from '../controllers/admindashboard.controller.js';
import { checkAdmin } from '../middleware/checkAdmin.js';


const router = express.Router();

// routes/adminRoutes.js
router.get('/dashboard', verifyToken, checkAdmin, adminDashboard); 
// isAdmin is middleware to check if the user is admin

router.get('/dashboard/overview',verifyToken, checkAdmin, getAdminOverview);
export default router;