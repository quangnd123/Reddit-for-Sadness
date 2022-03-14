import React from 'react'
import leftArrow from './icons/left-arrow.svg'
import rightArrow from "./icons/right-arrow.svg";


function btnSlider() {
  return (
    <button className='btn-slide'>
        <img 
        src={rightArrow}/>
    </button>

  )
}

export default btnSlider