const express = require('express');
const passport = require('passport');

const JweetsController = require('../../controllers/JweetsController');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  JweetsController.GetTimeline
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  JweetsController.PostJweet
);
router.get('/user/:name', JweetsController.GetJweets);
router.get('/:id', JweetsController.GetJweet);

router.post(
  '/:id/like',
  passport.authenticate('jwt', { session: false }),
  JweetsController.ToggleLikeJweet
);

router.post(
  '/:id/rejweet',
  passport.authenticate('jwt', { session: false }),
  JweetsController.ToggleRejweetJweet
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  JweetsController.DeleteJweet
);

module.exports = router;
