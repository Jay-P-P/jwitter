const mongoose = require('mongoose');
const Jweet = require('../models/Jweet');
const User = require('../models/User');
const Rejweet = require('../models/Rejweet');
const Like = require('../models/Like');

const JweetsController = {
  GetTimeline: async (req, res, next) => {
    const { id } = req.user;

    let user = await User.findById(id, 'following');
    if (!user) {
      return res.status(404).json({ userNotFound: 'User does not exist.' });
    }
    let followingList = user.following;

    let likedJweets = await Like.find({ user: { $in: followingList } })
      .populate('user', 'name')
      .populate('jweet', 'user');

    let rejweetedJweets = await Rejweet.find({ user: { $in: followingList } })
      .populate('user', 'name')
      .populate('jweet', 'user');

    let response = [];
    followingList.push(id); // Adding our own id so we can get our own jweets on the timeline.
    likedJweets.map(jweet => {
      if (String(jweet.jweet.user) !== String(id)) {
        if (String(jweet.jweet.user) !== String(jweet.user.id))
          response.push(jweet);
      }
    });

    rejweetedJweets.map(jweet => {
      if (String(jweet.jweet.user) !== String(id)) {
        if (String(jweet.jweet.user) !== String(jweet.user.id))
          response.push(jweet);
      }
    });

    let jweets = await Jweet.find({ user: { $in: followingList } })
      .populate('user', 'name')
      .populate({
        path: 'likes',
        populate: {
          path: 'user',
          select: 'name'
        }
      })
      .populate({
        path: 'rejweets',
        populate: {
          path: 'user',
          select: 'name'
        }
      });
    response.push(...jweets);

    response.sort((a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
      return dateB - dateA;
    });

    return res.status(200).json({ jweets: response });
  },
  GetJweets: async (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const { name } = req.params;

    let user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ userNotFound: 'User does not exist.' });
    }
    let jweets = await Jweet.find({ user: user.id })
      .populate('user', 'name')
      .populate({
        path: 'likes',
        populate: {
          path: 'user',
          select: 'name'
        }
      })
      .populate({
        path: 'rejweets',
        populate: {
          path: 'user',
          select: 'name'
        }
      });

    let response = [...jweets];

    let likedJweets = await Like.find({ user: user.id })
      .populate('user', 'name')
      .populate('jweet', 'user');

    let rejweetedJweets = await Rejweet.find({ user: user.id })
      .populate('user', 'name')
      .populate('jweet', 'user');

    likedJweets.map(jweet => {
      if (String(jweet.user.id) !== String(jweet.jweet.user)) {
        response.push(jweet);
      }
    });

    rejweetedJweets.map(jweet => {
      if (String(jweet.user.id) !== String(jweet.jweet.user)) {
        response.push(jweet);
      }
    });

    response.sort((a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
      return dateB - dateA;
    });

    return res.status(200).json({ jweets: response });
  },
  PostJweet: async (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const { text } = req.body;
    const { id } = req.user;

    let jweet = new Jweet({
      user: id,
      text
    });

    await jweet.save();
    return res.status(201).json({ success: true, jweet });
  },
  ToggleLikeJweet: async (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const { id } = req.params;
    const userId = req.user.id;
    let jweet = await Jweet.findById(id).populate({
      path: 'likes',
      populate: {
        path: 'user',
        select: 'name'
      }
    });

    let index = -1;
    jweet.likes.map((like, idx) => {
      if (String(like.user._id) === String(userId)) {
        index = idx;
      }
    });

    if (index === -1) {
      let newLike = new Like({
        user: userId,
        jweet: id
      });
      await newLike.save();
      jweet.likes.push(newLike);
      await jweet.save();
    } else {
      let likeToDelete = jweet.likes[index];
      await Like.findByIdAndDelete(likeToDelete.id);
      jweet.likes.splice(index, 1);
      await jweet.save();
    }

    let response = await Jweet.findById(id).populate({
      path: 'likes',
      populate: {
        path: 'user',
        select: 'name'
      }
    });
    console.log(response);

    return res.status(200).json({ likes: response.likes });
  },
  ToggleRejweetJweet: async (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const { id } = req.params;
    const userId = req.user.id;

    let jweet = await Jweet.findById(id).populate({
      path: 'rejweets',
      populate: {
        path: 'user',
        select: 'name'
      }
    });

    let index = -1;
    jweet.rejweets.map((rejweet, idx) => {
      if (String(rejweet.user._id) === String(userId)) {
        index = idx;
      }
    });

    if (index === -1) {
      let newRejweet = new Rejweet({
        user: userId,
        jweet: id
      });
      await newRejweet.save();
      jweet.rejweets.push(newRejweet);
    } else {
      let rejweetToDelete = jweet.rejweets[index];
      await Rejweet.findByIdAndDelete(rejweetToDelete.id);
      jweet.rejweets.splice(index, 1);
    }

    await jweet.save();

    let response = await Jweet.findById(id).populate({
      path: 'rejweets',
      populate: {
        path: 'user',
        select: 'name'
      }
    });
    res.status(200).json({ rejweets: response.rejweets });
  },
  DeleteJweet: async (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const { id } = req.params;
    const { userId } = req.user;

    let jweet = await Jweet.findById(id);

    if (jweet.user === userId) {
      await Jweet.findByIdAndDelete(id, (err, res) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
      });
    }
    res.status(200).json({ success: true });
  },
  GetJweet: async (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    let id = '';
    try {
      id = mongoose.Types.ObjectId(req.params.id);
    } catch (err) {
      return res.status(400).json({ invalidId: 'The object id is invalid.' });
    }

    let jweet = await Jweet.findById(id)
      .populate('user', 'name')
      .populate({
        path: 'likes',
        populate: {
          path: 'user',
          select: 'name'
        }
      })
      .populate({
        path: 'rejweets',
        populate: {
          path: 'user',
          select: 'name'
        }
      });

    if (!jweet) {
      return res
        .status(404)
        .json({ jweetNotFound: 'Jweet could not be found.' });
    }

    return res.status(200).json({ jweet });
  }
};

module.exports = JweetsController;
