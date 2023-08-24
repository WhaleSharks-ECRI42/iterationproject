//boiler plate code for creating a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// CHANGED TO TITLE AND RELEASE_DATE
const favoriteSchema = new Schema ({
  title: {type: String, required: true}, 
  vote_average: {type: Number, required: true},
  release_date: {type: String, required: true},
  overview: {type: String, required: true},
  poster_path: {type: String, required: true},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})


module.exports = mongoose.model('Favorite', favoriteSchema);