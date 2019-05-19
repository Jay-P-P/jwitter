const express = require('express');
const passport = require('passport');

//Validators
const { RegisterValidator, LoginValidator } = require('../../validation');

//Controllers
const RegisterController = require('../../controllers/RegisterController');
const LoginController = require('../../controllers/LoginController');
const UsersController = require('../../controllers/UsersController');

const router = express.Router();

router.post('/register', RegisterValidator, RegisterController);

router.post('/login', LoginValidator, LoginController);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  UsersController.GetUserById
);

module.exports = router;
