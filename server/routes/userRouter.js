const express = require('express')
const favoriteController = require('../controllers/favoriteController');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController')
const sessionController = require('../controllers/sessionController')
const router = express.Router();


router.post(
  '/Signup', 
  userController.createUser, 
  sessionController.startSession, 
  cookieController.setSSIDCookie, 
  (req, res) => {
  return res.status(200).send('User created');
})

router.post(
  '/Login', 
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setSSIDCookie, 
  (req, res) => {
  return res.status(200).send('Successful login');  
})

// FOR POSTMAN MOCK USER 
// {
//   username: "John"
//   password: "password123",
//   cookie: {type: String},
//   favorites: [{
//     type: Schema.ObjectId, 
//     ref:'Favorite'
//   }],
// }

module.exports = router;

