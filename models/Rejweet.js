const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RejweetSchema = new Schema({
  jweet: {
    type: Schema.Types.ObjectId,
    ref: 'jweets',
    required: true
  },
  isRejweet: {
    type: Boolean,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Rejweet = mongoose.model('rejweets', RejweetSchema);
