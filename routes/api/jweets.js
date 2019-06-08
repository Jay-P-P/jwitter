const express = require('express');
const passport = require('passport');

const JweetsController = require('../../controllers/JweetsController');
const { JweetValidator, UserValidator } = require('../../validation');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  JweetsController.GetTimeline
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  JweetValidator,
  JweetsController.PostJweet
);
router.get('/user/:name', UserValidator, JweetsController.GetJweets);
router.get('/:id', JweetValidator, JweetsController.GetJweet);

router.post(
  '/:id/like',
  passport.authenticate('jwt', { session: false }),
  JweetValidator,
  JweetsController.ToggleLikeJweet
);

router.post(
  '/:id/rejweet',
  passport.authenticate('jwt', { session: false }),
  JweetValidator,
  JweetsController.ToggleRejweetJweet
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  JweetValidator,
  JweetsController.DeleteJweet
);

module.exports = router;
