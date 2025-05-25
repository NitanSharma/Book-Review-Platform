const express = require('express');
const router = express.Router();
const { getReviews, createReview } = require('../controller/review.controller.js');

// GET /reviews?bookId=...  GET /reviews - Retrieve reviews for a book

router.get('/', getReviews);

// POST /reviews   POST /reviews - Submit a new review

router.post('/', createReview );

module.exports = router;