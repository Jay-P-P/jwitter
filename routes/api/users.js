const express = require('express');
const passport = require('passport');
const multer = require('multer');

const upload = multer();

//Validators
const {
  RegisterValidator,
  LoginValidator,
  UserValidator
} = require('../../validation');

//Controllers
const RegisterController = require('../../controllers/RegisterController');
const LoginController = require('../../controllers/LoginController');
const UsersController = require('../../controllers/UsersController');

const router = express.Router();

router.post('/register', RegisterValidator, RegisterController);

router.post('/login', LoginValidator, LoginController);

router.get('/', UsersController.GetAllUsers);

router.get('/:name', UserValidator.nameValidator, UsersController.GetUser);

router.post(
  '/avatar',
  passport.authenticate('jwt', { session: false }),
  upload.single('avatar'),
  UsersController.UploadPicture
);

router.get(
  '/:name/followers',
  passport.authenticate('jwt', { session: false }),
  UserValidator.nameValidator,
  UsersController.GetFollowers
);

router.get(
  '/:name/following',
  passport.authenticate('jwt', { session: false }),
  UserValidator.nameValidator,
  UsersController.GetFollowing
);

router.post(
  '/:name/follow',
  passport.authenticate('jwt', { session: false }),
  UserValidator.nameValidator,
  UsersController.ToggleFollow
);

router.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  UsersController.UpdateUser
);

module.exports = router;
