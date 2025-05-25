const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');
const validateUser = require('../validators/userValidator.js');

// GET /users/:id - Retrieve user profile

router.get('/:id', userController.getUserProfile); // working

// PUT /users/:id - Update user profile
router.put('/:id', userController.updateUserProfile); // not working

// POST /users - Add a new user (admin only)
router.post('/register', validateUser ,userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;