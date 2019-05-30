const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator/check');

const UsersController = {
  GetAllUsers: async (req, res, next) => {
    let users = await User.find()
      .select('-password -email')
      .sort('-1');
    if (!users) {
      return res
        .status(404)
        .json({ noUsersExist: 'There are no users. Be the first to sign up!' });
    }
    return res.status(200).json({ users });
  },
  GetUser: async (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const { name } = req.params;

    let user = await User.findOne(
      { name },
      'name followers following bio'
    ).populate('followers following', 'name');

    if (!user) {
      return res.status(404).json({
        errors: {
          userNotFound:
            'That user account has either been deleted or never existed.'
        }
      });
    }
    res.status(200).json(user);
  },
  GetFollowers: async (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const { name } = req.params;

    let user = await User.findOne({ name }, 'name followers').populate(
      'followers',
      'name'
    );

    if (!user) {
      return res.status(404).json({
        errors: {
          userNotFound:
            'That user account has either been deleted or never existed.'
        }
      });
    }

    res.status(200).json(user);
  },
  GetFollowing: async (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const { name } = req.params;

    let user = await User.findOne({ name }, 'name following').populate(
      'following',
      'name'
    );

    if (!user) {
      return res.status(404).json({
        errors: {
          userNotFound:
            'That user account has either been deleted or never existed.'
        }
      });
    }

    res.status(200).json(user);
  },
  ToggleFollow: async (req, res, next) => {
    // const errors = validationResult(req).formatWith(errorFormatter);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.mapped() });
    // }

    const { name } = req.params;
    const { id } = req.user;

    let userToFollow = await User.findOne({ name }, 'followers');
    let userFollowing = await User.findById(id, 'following');

    if (!userToFollow || !userFollowing) {
      return res.status(404).json({
        errors: {
          userNotFound:
            'That user account has either been deleted or never existed.'
        }
      });
    }

    let index = -1;
    userToFollow.followers.map((id, idx) => {
      if (String(id) === String(userFollowing.id)) {
        index = idx;
      }
    });

    if (index === -1) {
      userToFollow.followers.push(userFollowing._id);
      userFollowing.following.push(userToFollow._id);
      await userToFollow.save();
      await userFollowing.save();
      return res.status(200).json({ success: true, userToFollow });
    } else {
      userToFollow.followers.splice(index, 1);
      index = -1;
      userFollowing.following.map((id, idx) => {
        if (String(id) == String(userToFollow.id)) {
          index = idx;
        }
      });
      userFollowing.following.splice(index, 1);
      await userToFollow.save();
      await userFollowing.save();
      return res.status(200).json({ success: true, userToFollow });
    }
  },
  UpdateUser: async (req, res, next) => {
    const { id } = req.user;
    const { name: paramName } = req.params;
    const { name, email, bio, password } = req.body;
    let user = await User.findOne({ name: paramName });
    if (user.id != id) {
      return res
        .status(401)
        .json({ unauthorized: 'You are not authorized to update this user.' });
    }

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (bio) {
      user.bio = bio;
    }
    if (password) {
      bcrypt.genSalt(13, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          user.password = hash;
        });
      });
    }

    let updatedUser = await user.save();
    return res.status(204).json();
  }
};

module.exports = UsersController;
