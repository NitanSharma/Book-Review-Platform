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
  // Check if the user is an admin
  
  // console.log(req.user.isAdmin);
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  try {
   const {imageUrl,title, author, description, genre, price, publishedDate, ratings} = req.body;
   const book = new Book({
    imageUrl,
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
