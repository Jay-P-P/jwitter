const { body } = require('express-validator/check');
const User = require('../models/User');

module.exports = [
  body('email')
    .exists()
    .withMessage('Email is required.')
    .custom(async email => {
      let user = await User.findOne({ email });
      if (user === null) {
        return Promise.reject('Account does not exist.');
      } else {
        return true;
      }
    }),
  body('password')
    .exists()
    .withMessage('Password is required.')
];
