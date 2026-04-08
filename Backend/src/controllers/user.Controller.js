import bcrypt from 'bcryptjs';
import UserModel from '../models/User.model.js';
import { validatePassword } from '../utils/validatePassword.js';
import { generateToken } from '../utils/generateToken.js';


// ─── Register User ────────────────────────────────────────────────────────────
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // BUG FIX 4: validate inputs before any DB call
  if (!name || name.trim() === '') {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'A valid email is required' });
  }

  try {
    let user = await UserModel.findOne({ email: email.toLowerCase() });

    if (user) {
      if (password) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }
      // Google sign-in for existing user
      const token = generateToken(user);
      setTokenCookie(res, token);
      return res.status(200).json({
        success: true,
        message: 'Google sign-in successful',
        user: sanitizeUser(user),
      });
    }

    if (password) {
      const passwordError = validatePassword(password);
      if (passwordError) {
        return res.status(400).json({ success: false, message: passwordError });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await UserModel.create({ name: name.trim(), email: email.toLowerCase(), password: hashedPassword });
    } else {
      user = await UserModel.create({ name: name.trim(), email: email.toLowerCase(), password: 'google-oauth' });
    }

    const token = generateToken(user);
    setTokenCookie(res, token);

    return res.status(201).json({
      success: true,
      message: password ? 'User registered successfully' : 'Google sign-in successful',
      user: sanitizeUser(user),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
  }
};


// ─── Google Login / Register ──────────────────────────────────────────────────
export const loginOrRegisterGoogleUser = async (req, res) => {
  const { name, email } = req.body;

  // BUG FIX 4: validate google payload
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }

  try {
    let user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = await UserModel.create({ name: name.trim(), email: email.toLowerCase(), password: 'google-oauth' });
    }

    const token = generateToken(user);
    setTokenCookie(res, token);

    return res.status(200).json({
      success: true,
      message: 'Google sign-in successful',
      user: sanitizeUser(user),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Google login failed', error: err.message });
  }
};


// ─── Login User ───────────────────────────────────────────────────────────────
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // BUG FIX 4: validate before DB call
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = generateToken(user);
    setTokenCookie(res, token);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: sanitizeUser(user),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login failed', error: err.message });
  }
};


// ─── Get all users (admin only) ───────────────────────────────────────────────
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({})
      .select('-password')
      .populate('followers', 'name email profilePicture')
      .populate('following', 'name email profilePicture');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// ─── Get current logged-in user ───────────────────────────────────────────────
export const getCurrentUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id)
      .select('-password')
      .populate('followers', 'name email profilePicture')
      .populate('following', 'name email profilePicture');

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.status(200).json({
      success: true,
      user: {
        _id:            user._id,
        name:           user.name,
        email:          user.email,
        role:           user.role,
        bio:            user.bio,
        followers:      user.followers,
        following:      user.following,
        profilePicture: user.profilePicture,
        createdAt:      user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch user', error: err.message });
  }
};


// ─── Logout ───────────────────────────────────────────────────────────────────
export const logoutUser = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    return res.status(200).json({ success: true, message: 'Logged out successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};


// ─── Promote user to admin ────────────────────────────────────────────────────
export const makeAdmin = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, { role: 'admin' }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User promoted to admin', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update role', error: err.message });
  }
};


// ─── Update user profile ──────────────────────────────────────────────────────
export const updateUserProfile = async (req, res) => {
  const { name, email, bio, profilePicture } = req.body;

  // BUG FIX 4: validate email format if provided
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  if (name !== undefined && name.trim() === '') {
    return res.status(400).json({ message: 'Name cannot be empty' });
  }

  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name)           user.name           = name.trim();
    if (email)          user.email          = email.toLowerCase();
    if (bio !== undefined) user.bio         = bio;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};


// ─── Follow / Unfollow ────────────────────────────────────────────────────────
export const followUser = async (req, res) => {
  const currentUserId = req.user.id;
  const targetUserId  = req.params.id;

  if (currentUserId === targetUserId) {
    return res.status(400).json({ message: "You can't follow yourself" });
  }

  try {
    const currentUser = await UserModel.findById(currentUserId);
    const targetUser  = await UserModel.findById(targetUserId);

    if (!targetUser) return res.status(404).json({ message: 'User not found' });
    if (currentUser.following.includes(targetUserId)) {
      return res.status(400).json({ message: 'Already following' });
    }

    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUserId);

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({ message: 'Followed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const unfollowUser = async (req, res) => {
  const currentUserId = req.user.id;
  const targetUserId  = req.params.id;

  try {
    const currentUser = await UserModel.findById(currentUserId);
    const targetUser  = await UserModel.findById(targetUserId);

    if (!targetUser) return res.status(404).json({ message: 'User not found' });

    currentUser.following = currentUser.following.filter(id => id.toString() !== targetUserId);
    targetUser.followers  = targetUser.followers.filter(id => id.toString() !== currentUserId);

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// ─── Get followers / following ────────────────────────────────────────────────
export const getUserFollowers = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
      .populate('followers', 'name email profilePicture')
      .select('followers');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ followers: user.followers });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getUserFollowing = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).select('following');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ following: user.following.map(id => id.toString()) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// ─── Helpers (private, not exported) ─────────────────────────────────────────
function setTokenCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge:   5 * 24 * 60 * 60 * 1000, // 5 days
  });
}

function sanitizeUser(user) {
  return {
    _id:       user._id,
    name:      user.name,
    email:     user.email,
    role:      user.role,
    createdAt: user.createdAt,
  };
}
