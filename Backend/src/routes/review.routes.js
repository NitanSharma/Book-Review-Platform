const express = require('express');
const router = express.Router();
const { getReviews, createReview } = require('../controller/review.controller.js');
const { authMiddleware } = require('../middleware/auth.middleware.js');

// GET /reviews?bookId=...  GET /reviews - Retrieve reviews for a book

router.get('/', getReviews);

// POST /reviews/:bookId - Submit a new review
router.post('/:bookId', authMiddleware, createReview);

module.exports = router;