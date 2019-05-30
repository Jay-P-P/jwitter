const { param } = require('express-validator/check');

const UserValidator = [
  param('name')
    .isString()
    .isAlphanumeric()
    .withMessage('Username is not valid.')
];

module.exports = UserValidator;
