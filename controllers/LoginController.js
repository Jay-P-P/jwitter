const User = require('../models/User');
const { validationResult } = require('express-validator/check');
const errorFormatter = require('../validation/ErrorFormatter');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = LoginController = async (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  const { email, password } = req.body;

  let user = await User.findOne({ email });

  let isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({
      errors: {
        login: 'Account details are incorrect.'
      }
    });
  }

  const { id, name } = user;
  const payload = { id, name };
  const signOptions = {
    issuer: 'jwitter.com',
    audience: 'jwitters',
    expiresIn: 3600
  };
  jwt.sign(payload, keys.secretOrKey, signOptions, (err, encoded) => {
    if (err) {
      return res.status(500).json({
        errors: {
          jwt: 'Could not create jwt token.'
        }
      });
    }

    return res.json({ token: `Bearer ${encoded}` });
  });
};
