//boiler plate code for creating a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema ({
  name: {type: String, required: true},
  vote_average: {type: Number, required: true},
  first_air_date: {type: String, required: true},
  overview: {type: String, required: true},
  poster_path: {type: String, required: true},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})


module.exports = mongoose.model('Favorite', favoriteSchema);