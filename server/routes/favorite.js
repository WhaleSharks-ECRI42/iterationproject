const express = require('express')
const favoriteController = require('../controllers/favoriteController')
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

const router = express.Router();

router.get('/', cookieController.getSSID, favoriteController.getFavorite, (req, res) => {
  return res.status(200).json(res.locals.favorites);
});

router.post('/Add', favoriteController.addFavorite, (req, res) => {
  return res.status(200).json(res.locals.addFav)
});

router.delete('/:id', favoriteController.deleteFavorite, favoriteController.getFavorite, (req, res) => {
  return res.status(200).json(res.locals.favorites);
})


// FOR POSTMAN MOCK FAVORITE 
// {
//   "name": "John",
//   "vote_average": "6",
//   "first_air_date": "2023-08-22",
//   "overview": "A really cool movie",
//   "poster_path": "/google.jpg",
//   "user": "ssid"
// }

module.exports = router;