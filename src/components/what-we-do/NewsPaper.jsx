import React, { useEffect, useState } from "react";
import temp from "../../assets/WhatWeDo-Assets/temporary.png";
import pinLogo from "../../assets/WhatWeDo-Assets/pinLogo.png";
import "../../styles/WhatWeDo/NewsPaper.css";

export default function NewsPaper() {
  const [expand, setExpand] = useState(null);

  

  return (
    <>
      <span
        className={expand == "image1" ? "expand" : "image1"}
        onClick={() => {
          expand == "image1" ? setExpand(null) : setExpand("image1");
        }}
      >
        <img src={temp} alt="" />
        {/* badge for{expand==  pinning ? 'expand':'image1'}the photos */}
        <span class="pin position-absolute top-2 start-50 p-3 translate-middle">
          {!expand && <img src={pinLogo} />}
        </span>
      </span>


      <span
        className={expand == "image2" ? "expand" : "image2"}
        onClick={() => {
          expand == "image2" ? setExpand(null) : setExpand("image2");
        }}
      >
        <img src={temp} alt="" />
        {/* badge for pinning the photos */}
        <span class="pin position-absolute top-2 start-50 p-3 translate-middle">
          {!expand && <img src={pinLogo} />}
        </span>
      </span>


      <span
        className={expand == "image3" ? "expand" : "image3"}
        onClick={() => {
          expand == "image3" ? setExpand(null) : setExpand("image3");
        }}
      >
        <img src={temp} alt="" />
        {/* badge for pinning the photos */}
        <span class="pin position-absolute top-2 start-50 p-3 translate-middle">
          {!expand && <img src={pinLogo} />}
        </span>
      </span>


      <span
        className={expand == "image4" ? "expand" : "image4"}
        onClick={() => {
          expand == "image4" ? setExpand(null) : setExpand("image4");
        }}
      >
        <img src={temp} alt="" />
        {/* badge for pinning the photos */}
        <span class="pin position-absolute top-2 start-50 p-3 translate-middle">
          {!expand && <img src={pinLogo} />}
        </span>
      </span>
    </>
  );
}
