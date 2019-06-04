const Jweet = require('../models/Jweet');
const User = require('../models/User');
const Rejweet = require('../models/Rejweet');

const JweetsController = {
  GetTimeline: async (req, res, next) => {
    const { id } = req.user;

    let user = await User.findById(id, 'following');
    if (!user) {
      return res.status(404).json({ userNotFound: 'User does not exist.' });
    }
    let followingList = user.following;
    followingList.push(id);
    let jweets = await Jweet.find({ user: { $in: followingList } })
      .populate('user', 'name')
      .sort({
        date: -1
      });

    return res.status(200).json({ jweets });
  },
  GetJweets: async (req, res, next) => {
    const { name } = req.params;

    let user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ userNotFound: 'User does not exist.' });
    }
    let jweets = await Jweet.find({ user: user.id }).populate('user', 'name');

    return res.status(200).json({ jweets });
  },
  PostJweet: async (req, res, next) => {
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
    const { id } = req.params;
    const userId = req.user.id;
    let jweet = await Jweet.findById(id);

    let index = -1;
    jweet.likes.map((id, idx) => {
      if (String(id) === String(userId)) {
        index = idx;
      }
    });

    if (index === -1) {
      jweet.likes.push(userId);
    } else {
      jweet.likes.splice(index);
    }

    await jweet.save();
    res.status(200).json({ likes: jweet.likes });
  },
  ToggleRejweetJweet: async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;

    let jweet = await Jweet.findById(id).populate('rejweets');

    let index = -1;
    jweet.rejweets.map((rejweet, idx) => {
      if (String(rejweet.user) === String(userId)) {
        console.log('Matches');
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
    res.status(200).json({ rejweets: jweet.rejweets });
  },
  DeleteJweet: async (req, res, next) => {
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
    const { id } = req.params;

    let jweet = await Jweet.findById(id).populate('user', 'name');

    if (!jweet) {
      return res
        .status(404)
        .json({ jweetNotFound: 'Jweet could not be found.' });
    }

    return res.status(200).json({ jweet });
  }
};

module.exports = JweetsController;
