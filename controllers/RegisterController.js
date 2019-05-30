const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator/check');
const errorFormatter = require('../validation/ErrorFormatter');

module.exports = RegisterController = (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }
  const { name, password, email } = req.body;

  let newUser = new User({
    name,
    email,
    password
  });

  bcrypt.genSalt(13, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      try {
        let user = await newUser.save();
        user.password = null;
        return res.status(201).json(user);
      } catch (err) {
        return res.json({
          error: err
        });
      }
    });
  });
};
