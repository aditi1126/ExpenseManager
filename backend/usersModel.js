const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  isUserActive: {
    type: Boolean,
    default: true,
  }
});

module.exports = mongoose.model('Users', User);
