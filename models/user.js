const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  name: {
    type: String,
    required: true,
    min: 6
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema)
