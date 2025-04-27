// routes/userRoutes.js
import express from 'express';
import { verifyToken } from './../middleware/verifyToken.js';
import { loginUser, registerUser,makeAdmin, getAllUsers, updateUserProfile  } from '../controllers/user.Controller.js';
import { checkAdmin } from './../middleware/checkAdmin.js';






const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);



router.get('/',verifyToken,checkAdmin, getAllUsers)




router.put('/make-admin/:id', verifyToken, makeAdmin);


//user profile route

router.put("/profile", verifyToken, updateUserProfile);



export default router;
