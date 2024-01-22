const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAvtarImgSet: {
    type: Boolean,
    default: false,
  },
  avtarImg: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('User', userModel);
