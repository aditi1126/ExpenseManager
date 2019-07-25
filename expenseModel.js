const mongoose = require('mongoose');

const { Schema } = mongoose;

const Expense = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  expenseType: {
    type: String,
    required: true,
    trim: true,
  },
  friendName: {
    type: String,
    trim: true,
  },
  friendEmail: {
    type: String,
    trim: true,
    lowercase: true,
  },
  notificationDate: {
    type: String,
    trim: true,
    default: `${new Date().getDate()}${new Date().getMonth()}${new Date().getFullYear()}`,
  },
  notificationSent: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('Expense', Expense);
