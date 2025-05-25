const {body} = require('express-validator');

const validateUser = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().isEmail().withMessage('Email is required'),
    body('password').notEmpty().isLength({min: 6}).withMessage('Password is required'),
    body('isAdmin').notEmpty().withMessage('isAdmin is required'),
];



module.exports = validateUser;