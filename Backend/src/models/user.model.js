const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isAdmin: {// if true then add book and not then user only make reviews
    type: Boolean,
    default: false,
  }
} );

const User = mongoose.model('User', userSchema);

module.exports = User;
