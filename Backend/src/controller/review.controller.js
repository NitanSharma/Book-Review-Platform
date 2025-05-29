const Review = require('../models/review.model.js');
const mongoose = require('mongoose');

// GET /reviews?bookId=...
const getReviews = async (req, res) => {
  try {
    const filter = {};
    const { bookId, page = 1, limit = 10 } = req.query;

    if (bookId) {
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ error: 'Invalid book ID format' });
      }
      filter.book = bookId;
    }

    const reviews = await Review.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('user', 'name')
      .populate('book', 'title');

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

// POST /reviews
const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { bookId } = req.params;
    // console.log(req.body);
    // Check for missing fields
    if (!rating || !comment || !bookId) {
      return res.status(400).json({ message: "Rating, comment, and book ID are required" });
    }

    // Optional: Prevent duplicate reviews
    const existingReview = await Review.findOne({ user: req.user._id, book: bookId });
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this book" });
    }

    const newReview = new Review({
      user: req.user._id,
      book: bookId,
      rating,
      comment,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);

  } catch (error) {
    console.error("Create review error:", error);
    res.status(500).json({ message: 'Failed to create review', error: error.message });
  }
};

module.exports = {
  getReviews,
  createReview,
};
