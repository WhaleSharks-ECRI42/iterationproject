const express = require('express')
const favoriteController = require('../controllers/favoriteController')
const router = express.Router();

router.get('/', favoriteController.getFavorite, (req, res) => {
  return res.status(200).json(res.locals.favorites);
});

router.post('/Add', favoriteController.addFavorite, (req, res) => {
  return res.status(200).json(res.locals.addFav)
});

router.delete('/:id', favoriteController.deleteFavorite, favoriteController.getFavorite, (req, res) => {
  return res.status(200).json(res.locals.favorites);
})

module.exports = router;