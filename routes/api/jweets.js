const express = require('express');
const passport = require('passport');

const JweetsController = require('../../controllers/JweetsController');

const router = express.Router();

router.get('/:name', JweetsController.GetJweets);

router.post(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  JweetsController.PostJweet
);

router.post(
  '/:id/like',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  JweetsController.ToggleLikeJweet
);

router.post(
  '/:id/rejweet',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  JweetsController.ToggleRejweetJweet
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  JweetsController.DeleteJweet
);

module.exports = router;
