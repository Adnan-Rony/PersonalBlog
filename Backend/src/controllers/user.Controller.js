


// export const syncUser=async(req,res)=>{
//     const {uid,email,name}=req.body;

//     try{
//         const user=await UserModel.findOneAndUpdate(
//             {uid:uid},
//             {uid,email,name},
//             { upsert: true, new: true }
//         );
//         res.status(200).json(user)

//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).json({message:"Internal server error"})
//     }
// }

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await UserModel.find(); // fetch all users from MongoDB
//     res.status(200).json(users);
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };





// export const makeAdmin = async (req, res) => {
//     const { uid } = req.params;
  
//     try {
//       const user = await UserModel.findOneAndUpdate(
//         { uid },
//         { role: 'admin' },
//         { new: true }
//       );
  
//       if (!user) return res.status(404).json({ message: 'User not found' });
  
//       res.status(200).json({ message: 'User promoted to admin', user });
//     } catch (error) {
//       res.status(500).json({ message: 'Error updating role', error: error.message });
//     }
//   };





import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.model.js';
import { generateToken } from './../utils/generateToken.js';




// Register User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({ name, email, password: hashedPassword });

    res.status(201).json({
      message: 'User registered',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
    
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      },
      token
    });
    
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};


//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}).select('-password'); // Exclude password from the response
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Promote to Admin
export const makeAdmin = async (req, res) => {

  const { id } = req.params;

  console.log('Current user:', req.user);  


  // Only allow if current user is an admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { role: 'admin' },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User promoted to admin', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update role', error: err.message });
  }
};



