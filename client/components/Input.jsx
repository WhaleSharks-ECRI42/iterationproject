import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// importing searchTV action
import { searchTV } from '../slices/showSlice'
import { deleteFavorite } from '../slices/showSlice'
import { displaysFavorites } from '../slices/showSlice'


// initializing state for every property to be updated with the values we input 
const Input = () => {
  const [genreInput, setGenreInput] = useState('');
  const [runtimeInput, setRuntimeInput] = useState('');
  const [ratingInput, setRatingInput] = useState('');
  const [originInput , setOriginInput] = useState('');
  // need to assign useDispatch a constant 
  const dispatch = useDispatch()

  const onSubmit = e => {
    e.preventDefault();
    // takes in the updated state and assigns it to keys in newSubmission object
    const newSubmission = {
      genre: genreInput,
      runtime: +runtimeInput,
      rating: +ratingInput,
      origin: originInput,
    };

    // Either invoke a function which creates a header that displays the showtime picture
    // Or display the showtime picture
    
    // invoking dispatch, passing in searchTV(action), passing in newSubmission(payload)
    // searchTV lives in showSlice.js
    dispatch(searchTV(newSubmission));
  }

  const onFavoriteSubmit = e => {
    e.preventDefault();
    
    // invoking dispatch, passing in addFavorite(), passing in newSubmission(payload)
    // searchTV lives in showSlice.js
    dispatch(displaysFavorites());
  }

  // invoking setter functions, passing in our inputs, assigning state to our inputs 
  // when submit button is clicked, invokes onSubmit on the form 
  return (
    <div className="input">
      <form onSubmit={onSubmit}>
        <input type='text' placeholder="Enter genre" value={genreInput} onChange = {(e) => setGenreInput(e.target.value)}/>
        <input type='number' placeholder="Max Movie Length" value={runtimeInput} onChange = {(e) => setRuntimeInput(e.target.value)}/>
        <input type='number' placeholder="Average Rating" value={ratingInput} onChange = {(e) => setRatingInput(e.target.value)}/>
        <input type='string' placeholder="Origin Country" value={originInput} onChange={(e) => setOriginInput(e.target.value)}/>
        <button id="submitButton"> Submit </button>
      </form>
      <form onSubmit={onFavoriteSubmit}>
        <button id="favoritesButton"> Favorites </button>
      </form>
    </div>
  )
}

export default Input;

/*
import React from 'react'
import { useDispatch } from 'react-redux'
// importing displayFavroites action
import { displaysFavorites } from '../slices/showSlice'

// render header 
const Header = () => {
  const dispatch = useDispatch()
  

}
*/