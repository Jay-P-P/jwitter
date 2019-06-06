const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  jweet: {
    type: Schema.Types.ObjectId,
    ref: 'jweets',
    required: true
  },
  isLike: {
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

module.exports = Like = mongoose.model('likes', LikeSchema);
