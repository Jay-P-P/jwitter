const { param, body } = require('express-validator/check');

const UserValidator = {
  nameValidator: [
    param('name')
      .isString()
      .isAlphanumeric()
      .withMessage('Username is not valid.')
  ],
  updateUserValidator: [
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
    body('password')
      .exists()
      .withMessage('Password is required.')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .withMessage('Password does not meet strong password requirements.'),
    body('bio')
      .optional()
      .isString()
      .isLength({ max: 140 })
  ]
};

module.exports = UserValidator;
