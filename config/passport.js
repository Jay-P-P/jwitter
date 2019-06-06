const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const config = require('config');

const cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }
  return token;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.secretOrKey || config.get('secretOrKey');
opts.issuer = config.get('jwtIssuer');
opts.audience = config.get('jwtAudience');
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findById(jwt_payload.id, function(err, user) {
        if (err) {
          console.log(err);
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
