const User = require('../models/User');
const { validationResult } = require('express-validator/check');
const errorFormatter = require('../validation/ErrorFormatter');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

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
  const secretOrKey = process.env.SECRETORKEY || config.get('secretOrKey');
  const signOptions = {
    issuer: process.env.JWT_ISSUER || config.get('jwtIssuer'),
    audience: process.env.JWT_AUDIENCE || config.get('jwtAudience'),
    expiresIn: 3600
  };
  await jwt.sign(payload, secretOrKey, signOptions, (err, encoded) => {
    if (err) {
      return res.status(500).json({
        errors: {
          jwt: 'Could not create jwt token.'
        }
      });
    }

    user.password = null;
    return res
      .cookie('token', encoded, {
        httpOnly: true,
        expires: new Date(Date.now() + 216000000)
      })
      .status(200)
      .json({ success: true, name: user.name });
  });
};
