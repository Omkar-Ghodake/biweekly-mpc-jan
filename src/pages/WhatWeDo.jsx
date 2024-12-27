import React from 'react'
import tubelight from '../assets/WhatWeDo-Assets/tubeLight.png';
import crimeBoard from '../assets/WhatWeDo-Assets/crimeBoard.webp';
import '../styles/whatWeDo.css';

const WhatWeDo = () => {
  return (

    <>
    <div className="ourMissionContainer containerr">
        <img className = "tubeLight" src={tubelight} alt="crimeBoard..."/>
        <span className='lightShadow'>&nbsp;</span>
        <div className="detailboard">
          <span>
            <h1 className='text-center title font-topSecret'>BUG INVESTIGATION</h1>
          </span>
        </div>
    </div>
    
    </>
  )
}

export default WhatWeDo
