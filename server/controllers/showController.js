const showController = {};

showController.getShow = (req, res, next) => {
  console.log('entered showController middleware');
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjdlNWRhNDk2NzMzNTM5NjM3MTNhOTkxYzk0NTExMCIsInN1YiI6IjY0ZTBkYmFkNGE1MmY4MDExZTFlMzFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U_e_FwP2BIufIF41SVpGXiuuYKM6RsyUfo6DEcE_uBs",
      },
    };
    const {genre, runtime, rating, origin} = req.body
    console.log('body: ' , req.body);
     fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=${rating}&with_genres=${genre}&with_origin_country=${origin}&with_runtime.lte=${runtime}`, options)
    .then(response => response.json())
    .then(response => {
      res.locals.results = response.results;
      console.log('response', response);
      console.log('res.locals.results: ', response.results);
      return next();  // Send the results to the frontend
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });  // Handle errors by sending a 500 status code with an error message
      });
    
}

/*
TV 
https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US*page=1&sort_by=popularity.desc&vote_average.gte=${rating}&with_genres=${genre}&with_origin_country=${origin}&with_runtime.lte=${runtime}
*/


// MOVIES
/*

https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte={rating}&with_genres=${genre}&with_origin_country=${origin}&with_runtime.lte={runtime}

*/

module.exports = showController