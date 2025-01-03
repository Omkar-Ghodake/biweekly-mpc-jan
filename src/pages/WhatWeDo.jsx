import React from "react";
import tubelight from "../assets/WhatWeDo-Assets/tubeLight.png";
import crimeBoard from "../assets/WhatWeDo-Assets/crimeBoard.webp";
import "../styles/whatWeDo.css";
import mpcBadge from "../assets/mpcBadge.png";
import crimeCardStickyNote from '../assets/WhatWeDo-Assets/crimeCard.png';
import StickyCardData from "../components/what-we-do/Sticky-card-data";
import NewsPaper from "../components/what-we-do/NewsPaper";

const WhatWeDo = () => {
  return (
    <>
      <div className="ourMissionContainer containerr">
        <img className="tubeLight" src={tubelight} alt="crimeBoard..." />
        <span className="lightShadow">&nbsp;</span>
        <div className="detailboard">
          <span className="d-flex">
            <h1 className="text-center title font-topSecret">OUR MISSIONS</h1>
            <img src={mpcBadge} alt="mpcBadge" className="mpcbadge" />


           



          </span>
        </div>

        
          <StickyCardData/>
          
          <NewsPaper/>
              
          
      </div>
    </>
  );
};

export default WhatWeDo;
