import React from "react";
import { useDispatch } from "react-redux";
import { addFavorite } from "../slices/showSlice";
import { deleteFavorite } from "../slices/showSlice";
import { useSelector } from "react-redux";

// child component of TVDisplay
const Recommendation = ({ show }) => {
  // takes in the show prop passed down from it's parent
  // returns the id, title, genre, runtime, rating values from the element object
  const baseURL = "https://image.tmdb.org/t/p/w300";
  const posterpath = show.poster_path;
  const completeURL = baseURL + posterpath;
  const dispatch = useDispatch();
  const showAddButton2 = useSelector((state) => state.shows.showAddButton);
  const showDeleteButton2 = useSelector(
    (state) => state.shows.showDeleteButton
  );
  console.log('Recommendations.jsx: show:', show);
  const addToFavorite = function () {
    const favorite = {
      name: show.name,
      vote_average: show.vote_average,
      first_air_date: show.first_air_date,
      overview: show.overview,
      poster_path: show.poster_path,
    };
    console.log('Recommendations.jsx: addToFavorite: favorite', favorite)
    dispatch(addFavorite(favorite));
  };

  const deleteFavorite2 = () => {
    dispatch(deleteFavorite(show.id));
  };

  return (
    <div id="list">
      <img id="poster" src={completeURL}></img>
      <ul>
        <li>
          {"Show Name: "}
          {show.name}
        </li>
        <li>
          {"Rating: "}
          {show.vote_average}
        </li>
        <li>
          {"Air Date: "}
          {show.first_air_date}
        </li>
        <li>
          {"Summary: "}
          {show.overview}
        </li>
      </ul>
      {showAddButton2 ? (
        <button onClick={addToFavorite}>Add to Favorites</button>
      ) : null}
      {showDeleteButton2 ? (
        <button onClick={deleteFavorite2}>Delete</button>
      ) : null}
    </div>
  );
};
//export the recommendations object
export default Recommendation;
