const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
  type: { type: String, default: 'Point' },
  coordinates:{ type: [Number], index: '2dsphere'}
});

const userSchema = new Schema({
  email: {
    type: String,
    validate:{
      validator: (email) => email.length > 2,
        message:'must enter an email'
    },
    required: [true, 'email is required'],
    unique: true 
  },
  password: {
    type: String,
    validate: {
      validator: (password) => password.length > 6,
      message: 'must enter a password longer than 6 characters'
    },
    required: [true, 'password is required']
  },
  teams: {
    type: [String]
    //unique: true
  },
  coordinates: [PointSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;