import React from 'react'
import mpcBadge from '../assets/mpcBadge.png'
import tubelight from '../assets/WhatWeDo-Assets/tubeLight.png'
import NewsPaper from '../components/what-we-do/NewsPaper'
import StickyCardData from '../components/what-we-do/Sticky-card-data'
import '../styles/whatWeDo.css'

const WhatWeDo = () => {
  return (
    <>
      <div className='ourMissionContainer containerr'>
        <img className='tubeLight' src={tubelight} alt='crimeBoard...' />
        <span className='lightShadow'>&nbsp;</span>
        <div className='detailboard'>
          <span className='d-flex'>
            <h1 className='text-center title font-topSecret'>OUR MISSIONS</h1>
            <img src={mpcBadge} alt='mpcBadge' className='mpcbadge' />
          </span>
        </div>

        <StickyCardData />

        <NewsPaper />
      </div>
    </>
  )
}

export default WhatWeDo
