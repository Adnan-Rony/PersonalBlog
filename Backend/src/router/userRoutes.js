// routes/userRoutes.js
import express from 'express';
import { followUser, getAllUsers, getCurrentUser, getUserFollowers, getUserFollowing, loginOrRegisterGoogleUser, loginUser, logoutUser, makeAdmin, registerUser, unfollowUser, updateUserProfile } from '../controllers/user.Controller.js';
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


router.put("/:id/follow", verifyToken, followUser);
router.put("/:id/unfollow", verifyToken, unfollowUser);



router.get("/:id/followers",verifyToken, getUserFollowers);
router.get("/:id/following",verifyToken, getUserFollowing);


export default router;
