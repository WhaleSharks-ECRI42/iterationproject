import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// importing searchTV action
import { searchTV } from '../slices/showSlice'
import { deleteFavorite } from '../slices/showSlice'


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
    
    // invoking dispatch, passing in searchTV(action), passing in newSubmission(payload)
    // searchTV lives in showSlice.js
    dispatch(searchTV(newSubmission));
  }
  // invoking setter functions, passing in our inputs, assigning state to our inputs 
  // when submit button is clicked, invokes onSubmit on the form 
  return (
    <div className="input">
      <form onSubmit={onSubmit}>
        <input type='text' placeholder="Enter genre" value={genreInput} onChange = {(e) => setGenreInput(e.target.value)}/>
        <input type='number' placeholder="Max Episode Length" value={runtimeInput} onChange = {(e) => setRuntimeInput(e.target.value)}/>
        <input type='number' placeholder="Rating Required" value={ratingInput} onChange = {(e) => setRatingInput(e.target.value)}/>
        <input type='string' placeholder="Origin Country" value={originInput} onChange={(e) => setOriginInput(e.target.value)}/>
        <button id="submitButton"> Submit </button>

      </form>
    </div>
  )
}

export default Input;