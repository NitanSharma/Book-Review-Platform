const {validationResult} = require('express-validator');
const Book = require('../models/book.model');

// Get all books
module.exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a book by ID
module.exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new book
module.exports.addBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try {
   const {title, author, description, genre, price, publishedDate, ratings} = req.body;
   const book = new Book({
    title,
    author,
    description,
    genre,
    price,
    publishedDate,
    ratings,
   });
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



