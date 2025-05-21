
import bcrypt from 'bcryptjs';
import UserModel from '../models/User.model.js';
import { validatePassword } from '../utils/validatePassword.js';
import { generateToken } from './../utils/generateToken.js';





// Register User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    // 👇 If user already exists
    if (user) {
      // If it's an email/password login, throw error
      if (password) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }

      // If it's a Google login (no password), just "log them in"
      const token = generateToken(user);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
      });

      return res.status(200).json({
        success: true,
        message: 'Google sign-in successful',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      });
    }

    // 👇 If user doesn't exist
    if (password) {
      const passwordError = validatePassword(password);
      if (passwordError) {
        return res.status(400).json({ success: false, message: passwordError });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user = await UserModel.create({ name, email, password: hashedPassword });
    } else {
      user = await UserModel.create({ name, email, password: 'google-oauth' });
    }

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: password ? 'User registered with email/password' : 'User registered successfully (Google Sign-In)',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
  }
};



export const loginOrRegisterGoogleUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    if (!user) {
      // New user — register them
      user = await UserModel.create({ name, email, password: 'google-oauth' });
    }

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: 'Google sign-in successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Google login failed', error: err.message });
  }
};




// Login User
 // Adjust path as needed

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(401).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = generateToken(user);

    // Set token in a cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevent JavaScript access
      secure: process.env.NODE_ENV === 'production', // HTTPS in production
      sameSite: 'strict', // CSRF protection
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days, matching expiresIn: '5d'
    });

    console.log("✅ Logged in user:", user.email);
    res.status(200).json({
      success: true, // Added for frontend compatibility
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      token
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login failed', error: err.message });
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

export const getCurrentUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio:user.bio,
        profilePicture:user.profilePicture,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch user', error: err.message });
  }
};


export const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0), // Set expiry in past
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({ success: true, message: 'Logged out successfully' });
};



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
 
// ✏️ Update user profile
export const updateUserProfile = async (req, res) => {
  const {name, email, bio, profilePicture } = req.body;

  try {
    const user = await UserModel.findById(req.user.id); // JWT will give req.user.id

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only provided fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err.message });
  }
};

