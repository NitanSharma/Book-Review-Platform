const Review = require('../models/review.model.js');

// GET /reviews?bookId=...
const getReviews = async (req, res) => {
  try {
    const filter = {};
    if (req.query.bookId) {
      filter.book = req.query.bookId;
    }

    const reviews = await Review.find(filter)
      .populate('user', 'name') //  populate user name
      .populate('book', 'title'); //  populate book title

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

// POST /reviews
const createReview = async (req, res) => {
  try {
    const { user, book, rating, comment } = req.body;

    const newReview = new Review({
      user,
      book,
      rating,
      comment,
    });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
};

module.exports = {
  getReviews,
  createReview,
};
