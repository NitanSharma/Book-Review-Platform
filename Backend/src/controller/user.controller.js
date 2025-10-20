const User = require('../models/user.model.js');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {cookieOptions} = require('../config/config.js')

// GET /users/:id - Retrieve user profile
module.exports.getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};

// PUT /users/:id - Update user profile
module.exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id,{name: req.body.user, email: req.body.email, password: req.body.password, isAdmin: req.body.isAdmin}, {new: true} );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /users - Add a new user (admin only)
module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {name, email, password, isAdmin} = req.body;

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: 'Email already exists'});
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password : hashedPassword,
      isAdmin,
    });
    await user.save();
    const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: '1m'}); // Adjusted expiration time to 1 minute for testing
    res.cookie("accessToken", token, cookieOptions)
    res.status(201).json({message : "Register successfully" , user , token});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({message: 'Invalid email or password'});
    }
    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: 'Invalid email or password'});
    }
    const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: '5m'});

    res.cookie("accessToken", token, cookieOptions)
    res.status(201).json({message : "Login Success" , token , user});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('accessToken', { path: '/' });
  res.status(200).json({ message: "User Logged Out" });
}