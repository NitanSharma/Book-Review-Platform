const express = require('express');
const router = express.Router();
const bookController = require('../controller/book.controller.js');
const validatebook = require('../validators/bookValidator.js');
// const authMiddleware = require('../middlewares/auth.middleware');

// GET / - Retrieve all books (with pagination)
router.get('/', bookController.getAllBooks );

// GET /:id - Retrieve a specific book
router.get('/:id', bookController.getBookById);

// POST / - Add a new book (admin only)
router.post('/', validatebook ,bookController.addBook);

module.exports = router;