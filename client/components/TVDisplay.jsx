import React from 'react';
import { useSelector } from 'react-redux'
//import the child component Recommendation so that it can be rendered
import Recommendation from './Recommendation'

const TVDisplay = () => {
  //set recommendations to the shows array in state
  const recommendations = useSelector(state => state.shows.shows)
  console.log('recommendations', recommendations);
  return (
    <div className="display">
      Top Recommendations:
      {/* spread the recommendations array, and createas a prop called show for each child component
      and assigning show prop the value of element element (that is an object matching input criteria) and gives unique key
      */}
      {recommendations.map(element => (
        console.log('element._id', element.id),
        console.log('element', element),
        <Recommendation key={element.id} show = {element}/>
      ))}
      </div>
  )
}
export default TVDisplay;