const { body } = require('express-validator/check');
const User = require('../models/User');

module.exports = [
  body('email')
    .exists()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Email is not valid.')
    .custom(async email => {
      let user = await User.findOne({ email });
      if (user === null) {
        return Promise.resolve();
      } else {
        return Promise.reject('Email already exists.');
      }
    }),
  body('name')
    .exists()
    .withMessage('Name is required.')
    .isLength({ min: 1, max: 16 })
    .withMessage('Name length must be between 1 and 16 characters long.')
    .isAlphanumeric()
    .withMessage('Name can only contain letters and numbers.')
    .custom(async name => {
      let user = await User.findOne({ name });
      if (user === null) {
        return true;
      } else {
        return Promise.reject('Name already in use.');
      }
    }),
  body('password')
    .exists()
    .withMessage('Password is required.')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),
  body('passwordConfirmation')
    .exists()
    .withMessage('Password confirmation is required.')
    .custom((confirmPassword, { req }) => {
      return confirmPassword === req.body.password;
    })
    .withMessage('Passwords do not match.')
];
