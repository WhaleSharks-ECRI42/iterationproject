
const Favorite = require('../models/favoriteModel');
const favoriteController = {};
const User = require('../models/userModel');
const mongoose = require('mongoose');


// adds a show to favorite database
favoriteController.addFavorite = async (req, res, next) => {
  // deconstruct the body request
  // create a new entry in the database
  // console.log('name: ', req.body.name);
  // console.log('rating: ', req.body.vote_average);
  // console.log('first_air_date: ', req.body.first_air_date);
  // console.log('overview: ', req.body.overview);
  // console.log('posterpath: ', req.body.poster_path);
  try {
    console.log('made it to add favorite');
    const ssid = res.locals.ssid;
    console.log('ssid: ', res.locals.ssid);
    const { name, vote_average , first_air_date, overview, poster_path } = req.body;
    // we create a fav document in MongoDB Favorites Collection
    console.log('req.body:', req.body);
    const favorites = await Favorite.create({
      name: name,
      vote_average: vote_average,
      first_air_date: first_air_date,
      overview: overview,
      poster_path: poster_path,
      user: ssid
    });
    console.log('newFavorite: ', favorites);


    // favorite is created now, we assign favoriteId to newly created document's casted id_ 
    const favoriteId = favorites.id;
    console.log('favoriteID: ', favoriteId);
    // look for our user in the database , this is the user that is currently logged in
    console.log('users ssid', ssid);
    console.log('favorites.user', favorites.user);
    //console.log(mongoose.Types.ObjectID(ssid));
// mongoose.Types.ObjectID(ssid)
    console.log(User); 
    const foundUser = await User.findById(ssid); // SSID === OBJECT ID in our implementation
    // access our signed in user's favorites array [] , and push our favoriteId into it (line 29) ref. creation on 20
    console.log('foundUser: ', foundUser);
    foundUser.favorites.push(favoriteId);
    // passing to display later in nex()
    console.log('updatedFavorites: ', foundUser);
    res.locals.addFav = favorites;
    // save new favorite entry to Favorites collection 
    console.log('addFav: ', res.locals.addFav);
    await favorites.save();
    return next();  
  } catch (err) {
    next({
      log: 'Error in addFavorite',
      message: { err: 'An error occurred'}
    });
  }
}

favoriteController.getFavorite = async (req, res, next) => {

  try {
    const {ssid} = res.locals;
    const favoriteList = await Favorite.find({user: ssid});
    res.locals.favorites = favoriteList;
    console.log(res.locals.favorites)
    return next();
  } catch {
    return next({
      log: 'There was a problem in favoriteController.getFavorite',
      status: 400,
      message: 'Could not get the favorite movies'
    })
  }
}

favoriteController.deleteFavorite = async (req, res, next) => {
  try{
    const { id } = req.params;
    const deleteShow = await Favorite.findById(id);
    if (!deleteShow) {
      return res.status(404).json({error: 'Show not found'})
    }
    await Favorite.deleteOne({_id: id});
    return next();
  }catch{
    return next({
      log: 'There was a problem in favoriteController.deleteFavorite',
      status: 400,
      message: 'Could not delete favorite show'
    })

  }

}

module.exports = favoriteController


// {
//   "username":"john123",
//   "password":"password123"
// }


// {
//   "name": "Michael",
//   "vote_average": "6",
//   "first_air_date": "2023-08-22",
//   "overview": "A really bad movie",
//   "poster_path": "/bing.jpg"
// }


// john123: 64e6529c445d6e4d5007c376
// andrew: 64e69ca6819d06dbe40c1553