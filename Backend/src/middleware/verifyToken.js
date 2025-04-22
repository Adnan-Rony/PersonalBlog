import UserModel from "../models/User.model.js";
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';



if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(), // or use service account
    });
  }
  
  export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
  
    try {
      const decodedToken = await getAuth().verifyIdToken(token);
      req.user = decodedToken;
  
      // Optional: Fetch role from MongoDB
      const user = await UserModel.findOne({ uid: decodedToken.uid });
      req.user.role = user?.role || 'user';
  
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  };