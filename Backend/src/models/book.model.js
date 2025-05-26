const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
