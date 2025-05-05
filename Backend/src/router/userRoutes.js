// routes/userRoutes.js
import express from 'express';
import { getAllUsers, getCurrentUser, loginUser, logoutUser, makeAdmin, registerUser, updateUserProfile } from '../controllers/user.Controller.js';
import { checkAdmin } from './../middleware/checkAdmin.js';
import { verifyToken } from './../middleware/verifyToken.js';






const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/',verifyToken,checkAdmin, getAllUsers)
router.get('/me',verifyToken, getCurrentUser)
router.get('/logout',verifyToken, logoutUser)
router.put('/make-admin/:id', verifyToken, makeAdmin);
router.put("/profile", verifyToken, updateUserProfile);



export default router;
