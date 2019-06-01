const Jweet = require('../models/Jweet');
const User = require('../models/User');

const JweetsController = {
  GetTimeline: async (req, res, next) => {
    const { id } = req.user;

    let response = await User.findById(id, 'following');
    let followingList = response.following;
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
    let jweets = await Jweet.find({ user: user.id }).populate('user', 'name');

    res.status(200).json({ jweets });
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
    res.status(200).json({ succes: true, jweet });
  },
  ToggleRejweetJweet: async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;

    let jweet = await Jweet.findById(id);

    let index = -1;
    jweet.rejweets.map((id, idx) => {
      if (String(id) === String(userId)) {
        index = idx;
      }
    });

    if (index === -1) {
      jweet.rejweets.push(userId);
    } else {
      jweet.rejweets.splice(index);
    }

    await jweet.save();
    res.status(200).json({ succes: true, jweet });
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
  }
};

module.exports = JweetsController;
