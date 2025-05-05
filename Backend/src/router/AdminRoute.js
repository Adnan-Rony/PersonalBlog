import express  from 'express';

import { verifyToken } from '../middleware/verifyToken.js';
import { adminDashboard, deleteBlog, getAdminOverview } from '../controllers/admindashboard.controller.js';
import { checkAdmin } from '../middleware/checkAdmin.js';


const router = express.Router();

// routes/adminRoutes.js
router.get('/dashboard', verifyToken, checkAdmin, adminDashboard); 
// isAdmin is middleware to check if the user is admin

router.get('/dashboard/overview',verifyToken, checkAdmin, getAdminOverview);

// routes/adminRoutes.js
router.delete('/blogs/:id', verifyToken, checkAdmin, deleteBlog   
);





export default router;