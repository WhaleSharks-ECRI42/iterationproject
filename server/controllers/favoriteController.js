const favoriteController = {};
const Favorite = require('../models/favoriteModel')

// adds a show to favorite database
favoriteController.addFavorite = async (req, res, next) => {
  // deconstruct the body request
  // create a new entry in the database
  console.log('name: ', req.body.name);
  console.log('rating: ', req.body.vote_average);
  console.log('first_air_date: ', req.body.first_air_date);
  console.log('overview: ', req.body.overview);
  console.log('posterpath: ', req.body.poster_path);
  try {
  const { name, vote_average , first_air_date, overview, poster_path } = req.body;
  const favorites = await Favorite.create({
    name: name,
    vote_average: vote_average,
    first_air_date: first_air_date,
    overview: overview,
    poster_path: poster_path
  });
  console.log('favorites is : ', favorites);
  res.locals.addFav = favorites;
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
  try{
    const favoriteList = await Favorite.find({});
    res.locals.favorites = favoriteList;
    console.log(res.locals.favorites)
    return next();
  }catch{
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