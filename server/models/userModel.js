const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Favorite = require('./favoriteModel');

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  cookie: {type: String},
  favorites: [{
    type: Schema.Types.ObjectId, 
    ref:'Favorite'
  }],
})

const User = mongoose.model('User', userSchema); 
module.exports = User;