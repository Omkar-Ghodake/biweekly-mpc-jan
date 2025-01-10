import React, { useEffect, useState } from 'react'
import image1 from '../../assets/WhatWeDo-Assets/image1.png'
import image2 from '../../assets/WhatWeDo-Assets/image2.png'
import image3 from '../../assets/WhatWeDo-Assets/image3.png'
import image4 from '../../assets/WhatWeDo-Assets/image4.png'

import pinLogo from '../../assets/WhatWeDo-Assets/pinLogo.png'
import '../../styles/WhatWeDo/NewsPaper.css'

export default function NewsPaper() {
  const [expand, setExpand] = useState(null)

  return (
    <>
      <span
        className={expand == 'image1' ? 'expand' : 'image1'}
        onClick={() => {
          expand == 'image1' ? setExpand(null) : setExpand('image1')
        }}
      >
        <img src={image1} alt='' />
        {/* badge for{expand==  pinning ? 'expand':'image1'}the photos */}
        <span class='pin position-absolute top-2 start-50 p-3 translate-middle'>
          {!expand && <img src={pinLogo} />}
        </span>
      </span>

      <span
        className={expand == 'image2' ? 'expand' : 'image2'}
        onClick={() => {
          expand == 'image2' ? setExpand(null) : setExpand('image2')
        }}
      >
        <img src={image2} alt='' />
        {/* badge for pinning the photos */}
        <span class='pin position-absolute top-2 start-50 p-3 translate-middle'>
          {!expand && <img src={pinLogo} />}
        </span>
      </span>

      <span
        className={expand == 'image3' ? 'expand' : 'image3'}
        onClick={() => {
          expand == 'image3' ? setExpand(null) : setExpand('image3')
        }}
      >
        <img src={image3} alt='' />
        {/* badge for pinning the photos */}
        <span class='pin position-absolute top-2 start-50 p-3 translate-middle'>
          {!expand && <img src={pinLogo} />}
        </span>
      </span>

      <span
        className={expand == 'image4' ? 'expand' : 'image4'}
        onClick={() => {
          expand == 'image4' ? setExpand(null) : setExpand('image4')
        }}
      >
        <img src={image4} alt='' />
        {/* badge for pinning the photos */}
        <span class='pin position-absolute top-2 start-50 p-3 translate-middle'>
          {!expand && <img src={pinLogo} />}
        </span>
      </span>
    </>
  )
}
