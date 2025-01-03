import React, { useState } from "react";
import jioTvLogo from "../../assets/WhatWeDo-Assets/jioTvLogo.png";
import jioCloudLogo from "../../assets/WhatWeDo-Assets/jioCloudLogo.png";
import alexaLogo from "../../assets/WhatWeDo-Assets/alexaLogo.png";
import modiJiImage from "../../assets/WhatWeDo-Assets/modiJiImage.png";
import pinLogo from "../../assets/WhatWeDo-Assets/pinLogo.png";
import "../../styles/WhatWeDo/StickyNotes.css";



export default function StickyCardData() {

  const [index,setIndex]=useState();


  const setDegree = () => {
    const degreeArray = [];

    for (let i = 0; i < 4; i++) {
      let obj = Math.floor(Math.random() * 41) - 20;
      degreeArray.push(obj);
    }

    return degreeArray;
  };

  const temp = [
    {
      title: "Jio TV",
      description:
        "We completed a round of testing for JioTV, which involved verifying app functionality, checking channel streaming quality, testing user interface responsiveness, ensuring device compatibility, and identifying bugs for a seamless user experience.",
      image: jioTvLogo,
    },
    {
      title: "Jio Cloud",
      description:
        "We completed a round of testing for JioTV, which involved verifying app functionality, checking channel streaming quality, testing user interface responsiveness, ensuring device compatibility, and identifying bugs for a seamless user experience.",
      image: jioCloudLogo,
    },
    {
      title: "Alexa MKB",
      description:
        "We completed a round of testing for JioTV, which involved verifying app functionality, checking channel streaming quality, testing user interface responsiveness, ensuring device compatibility, and identifying bugs for a seamless user experience.",
      image: alexaLogo,
    },
    {
      title: "MPC",
      description:
        "We completed a round of testing for JioTV, which involved verifying app functionality, checking channel streaming quality, testing user interface responsiveness, ensuring device compatibility, and identifying bugs for a seamless user experience.",
      image: modiJiImage,
    },
  ];

  return (
    <div className="container stickyCardData">
    
      {temp.map((element, index) => {
        const degree = setDegree();

        return (
          <>
            <div
              class="card "
              data-bs-toggle="modal" data-bs-target="#stickyCardModal"
              style={{
                rotate: degree[index] + "deg",
              }}
              onClick={()=>setIndex(index)}
            >
              <span className="card-img-top">
                <img src={element.image} class="" alt="..." />
              </span>
              <div class="card-body">
                <p className="card-title">{element.title}</p>

                {/* badge for pinning the photos */}
                <span class="position-absolute top-0 start-50 p-3 translate-middle">
                  <img src={pinLogo}/>
                </span>
              </div>
            </div>





          </>
        );
      })}

      {/* this modal is for the data visualtization of small cards */}

{<div class="modal fade" id="stickyCardModal" tabindex="-1" aria-labelledby="stickyCardModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="stickyCardModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>}

    </div>
  );
}
