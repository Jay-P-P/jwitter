const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  bio: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ]
});

module.exports = User = mongoose.model('users', UserSchema);
