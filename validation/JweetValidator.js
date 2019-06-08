const { param, body } = require('express-validator/check');

const JweetValidator = [
  param('id', 'Not a valid jweet id.')
    .isString()
    .isMongoId(),
  body('text')
    .isString()
    .isLength({ min: 1, max: 140 })
    .withMessage('Jweet must be between 1 and 140 characters.')
];

module.exports = JweetValidator;
