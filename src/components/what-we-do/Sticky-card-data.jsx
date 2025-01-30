import React, { useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import alexaLogo from '../../assets/WhatWeDo-Assets/alexaLogo.png'
import jioCloudLogo from '../../assets/WhatWeDo-Assets/jioCloudLogo.png'
import jioTvLogo from '../../assets/WhatWeDo-Assets/jioTvLogo.png'
import modiJiImage from '../../assets/WhatWeDo-Assets/modiJiImage.png'
import pinLogo from '../../assets/WhatWeDo-Assets/pinLogo.png'
import '../../styles/WhatWeDo/StickyNotes.css'

export default function StickyCardData() {
  const [index, setIndex] = useState()

  const [modalOpen, setModalOpen] = useState(false)

  const cardModalRef = useRef(null)

  const assignIndex = (i) => {
    setIndex(i)
    setModalOpen(true)
  }

  const setDegree = () => {
    const degreeArray = []

    for (let i = 0; i < 4; i++) {
      let obj = Math.floor(Math.random() * 41) - 20
      degreeArray.push(obj)
    }

    return degreeArray
  }

  const temp = [
    {
      title: 'Jio TV',
      description:
        'We completed a round of testing for JioTV, which involved verifying app functionality, checking channel streaming quality, testing user interface responsiveness, ensuring device compatibility, and identifying bugs for a seamless user experience.',
      totalScore: 8,
      issueCount: 4,
      image: jioTvLogo,
    },
    {
      title: 'Jio Cloud',
      description:
        'We conducted a detailed sanity check of the JioCloud app, performed regression testing on the production environment, executed test scenarios, and raised all identified issues for review and resolution.',
      totalScore: '37',
      issueCount: '11',
      image: jioCloudLogo,
    },
    {
      title: 'Alexa MKB',
      description:
        'We reviewed the Alexa MKB user story, performed sanity testing, completed checklist tasks, and raised issues based on insights gained during the checklist evaluation.',
      totalScore: '77',
      issueCount: '12',
      image: alexaLogo,
    },
    {
      title: 'MPC',
      description:
        'In MPC, we completed the citizen view verification task, Twitter stats of MP task, regional language checklist, and sanity testing, thoroughly reviewing and raising any issues encountered.',
      totalScore: 165,
      issueCount: 39,
      image: modiJiImage,
    },
  ]

  return (
    <>
      <div className='container stickyCardData'>
        {temp.map((element, index) => {
          const degree = setDegree()

          return (
            <>
              <div
                key={element.title}
                className='card'
                data-bs-toggle='modal'
                data-bs-target='#stickyCardModal'
                style={{
                  rotate: degree[index] + 'deg',
                }}
                onClick={() => assignIndex(index)}
                ref={cardModalRef}
              >
                <span className='card-img-top'>
                  <img src={element.image} className='' alt='...' />
                </span>
                <div className='card-body'>
                  <p className='card-title'>{element.title}</p>

                  {/* badge for pinning the photos */}
                  <span className='position-absolute top-0 start-50 p-3 translate-middle'>
                    <img src={pinLogo} />
                  </span>
                </div>
              </div>

              {/* this modal is for the data visualtization of small cards */}
            </>
          )
        })}
      </div>

      {modalOpen && (
        <div className='cardModal'>
          <div className='dialoge bg-black/70 backdrop-blur-3xl'>
            <IoClose
              className='absolute top-5 right-5 text-5xl p-2 rounded-full cursor-pointer hover:bg-slate-500/30 duration-150'
              onClick={() => setModalOpen(false)}
            />
            <div className='image'>
              <img src={temp[index].image} alt='..' />
              <h1>{temp[index].title}</h1>
              <p className='text-center'>{temp[index].description}</p>
              <hr />
            </div>

            <div className='score'>
              <span>
                <h1>Issues Found</h1>
                <h1>{temp[index].issueCount}</h1>
              </span>
              <span>
                <h1>Total Score</h1>
                <h1>{temp[index].totalScore}</h1>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
