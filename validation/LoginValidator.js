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
        return Promise.reject('Account does not exist.');
      } else {
        return Promise.resolve();
      }
    }),
  body('password')
    .exists()
    .withMessage('Password is required.')
];
