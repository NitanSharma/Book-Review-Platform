const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');
const validateUser = require('../validators/userValidator.js');
const middleware = require("../middleware/auth.middleware.js");
const AsyncWrapper = require('../utils/wrapAsync.js');

// GET /users/:id - Retrieve user profile

router.get('/:id', middleware.authMiddleware , AsyncWrapper(userController.getUserProfile)); // working

// PUT /users/:id - Update user profile
router.put('/:id', middleware.authMiddleware , AsyncWrapper(userController.updateUserProfile)); // not working

// POST /users - Add a new user (admin only)
router.post('/register', validateUser , AsyncWrapper(userController.registerUser));

router.post('/login', AsyncWrapper(userController.loginUser));

module.exports = router;