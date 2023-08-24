import React from "react";
import { useDispatch } from "react-redux";
import { addFavorite } from "../slices/showSlice";
import { deleteFavorite } from "../slices/showSlice";
import { useSelector } from "react-redux";

const Recommendation = ({ show }) => {
  const baseURL = "https://image.tmdb.org/t/p/w300";
  const posterpath = show.poster_path;
  const completeURL = baseURL + posterpath;
  const dispatch = useDispatch();
  const showAddButton2 = useSelector((state) => state.shows.showAddButton);
  const showDeleteButton2 = useSelector((state) => state.shows.showDeleteButton);

  const addToFavorite = function () {
    const favorite = {
      title: show.title,  // Replace 'name' with 'title'
      vote_average: show.vote_average,
      release_date: show.release_date,  // Replace 'first_air_date' with 'release_date'
      overview: show.overview,
      poster_path: show.poster_path,
    };
    dispatch(addFavorite(favorite));
  };

  const deleteFavorite2 = () => {
    dispatch(deleteFavorite(show._id));
  };

  return (
    <div id="list">
      <img id="poster" src={completeURL} alt={show.title}></img>
      <div className = 'infoCard'>
        <p>
          <strong className="bold">Movie Title: </strong>
          {show.title}
        </p>
        <p>
          <strong className="bold">Rating: </strong>
          {show.vote_average}
        </p>
        <p>
          <strong className="bold">Release Date: </strong>
          {show.release_date}
        </p>
        <p>
          <strong className="bold">Summary: </strong>
          {show.overview}
        </p>
      {showAddButton2 ? (
        <button onClick={addToFavorite}>Add to Favorites</button>
      ) : null}
      {showDeleteButton2 ? (
        <button onClick={deleteFavorite2}>Delete</button>
      ) : null}
      </div>
    </div>
  );
};

export default Recommendation;
