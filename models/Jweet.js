const mongoose = require('mongoose');
const { Schema } = mongoose;

const JweetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  text: {
    type: String,
    minlength: 1,
    maxlength: 140,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'likes'
    }
  ],
  rejweets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'rejweets'
    }
  ]
});

module.exports = Jweet = mongoose.model('jweets', JweetSchema);
