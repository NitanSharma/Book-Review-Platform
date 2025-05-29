const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');
const validateUser = require('../validators/userValidator.js');
const middleware = require("../middleware/auth.middleware.js");
// const AsyncWrapper = require('../utils/wrapAsync.js');

// GET /users/:id - Retrieve user profile

router.get('/profile', middleware.authMiddleware , userController.getUserProfile); // working

// PUT /users/:id - Update user profile
router.put('/:id', middleware.authMiddleware , userController.updateUserProfile); // not working

// POST /users - Add a new user (admin only)
router.post('/register', validateUser , userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/logout' ,middleware.authMiddleware ,userController.logoutUser);

module.exports = router;