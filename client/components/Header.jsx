import React from 'react'
import { useDispatch } from 'react-redux'
// importing displayFavroites action
import { displaysFavorites } from '../slices/showSlice'

// render header 
const Header = () => {
  const dispatch = useDispatch()
  
  const onSubmit = e => {
    e.preventDefault();
    
    // invoking dispatch, passing in addFavorite(), passing in newSubmission(payload)
    // searchTV lives in showSlice.js
    dispatch(displaysFavorites());
  }


  return (
    <div className="title">
      {/* <script scr="https://www.funsignfactory.com/cdn/shop/products/SS1035_SHOWTIME.jpg?v=1582309623"> </script> */}
    </div>
  )
}

export default Header;