const User = require('../models/User');

const UsersController = {
  GetUserById: async (req, res, next) => {
    const { id } = req.params;

    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        errors: {
          userNotFound:
            'That user account has either been deleted or never existed.'
        }
      });
    }
    user.password = null;
    res.status(200).json(user);
  }
};

module.exports = UsersController;
