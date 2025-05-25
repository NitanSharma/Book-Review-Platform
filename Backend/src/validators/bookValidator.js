const {body} = require('express-validator');

const validatebook = [
    body('title').notEmpty().isLength({min: 3, max: 50}).withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('description').notEmpty().isLength({min: 10, max: 500}).withMessage('Description is required'),
    body('genre').notEmpty().withMessage('Genre is required'),
    body('price').notEmpty().isNumeric().withMessage('Price is required'),
    body('publishedDate').notEmpty().withMessage('Published Date is required'), 
]

module.exports = validatebook;