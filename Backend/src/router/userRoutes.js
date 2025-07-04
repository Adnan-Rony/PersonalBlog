// routes/userRoutes.js
import express from 'express';
import { followUser, getAllUsers, getCurrentUser, loginOrRegisterGoogleUser, loginUser, logoutUser, makeAdmin, registerUser, unfollowUser, updateUserProfile } from '../controllers/user.Controller.js';
import { checkAdmin } from './../middleware/checkAdmin.js';
import { verifyToken } from './../middleware/verifyToken.js';






const router = express.Router();

router.post('/register', registerUser);
router.post('/auth/google', loginOrRegisterGoogleUser);

router.post('/login', loginUser);
router.get('/',verifyToken,checkAdmin, getAllUsers)
router.get('/me',verifyToken, getCurrentUser)
router.post('/logout',verifyToken, logoutUser)
router.put('/makeadmin/:id', verifyToken, makeAdmin);
router.put("/profile/:id", verifyToken, updateUserProfile);
router.put("/follow/:id", verifyToken, followUser);
router.put("/unfollow/:id", verifyToken, unfollowUser);



export default router;
