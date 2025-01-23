import React, { useState, useEffect, useContext } from 'react'
import logo from '../assets/mpcBadge.png'
import { AllAgentsContext } from '../context/AllAgentsProvider'
import resigned from '../assets/resigned.png'
// import resigned2 from '../assets/resigned2.png'
import detectiveProfile from '../assets/detective_profile.png'
import { LoadingContext } from '../context/LoadingProvider'

const Bureau = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  // const [allAgents, setAllAgents] = useState([])
  const [rotateClass, setRotateClass] = useState('')

  const { allAgents, agentsImages, getAllAgents } = useContext(AllAgentsContext)

  useEffect(() => {
    // const fetchData = async () => {
    // setLoadingState({ isLoading: true, message: 'Loading Agents...' })
    // console.log(loadingState)
    // try {
    //   await getAllAgents()
    // const response = await fetch('http://localhost:5000/api/auth/agents', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     authToken: localStorage.getItem('auth-token'),
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    // const jsonData = await response.json()
    // if (allAgents) {
    //   const findChief = allAgents?.find((agent) => agent.role === 'chief')
    //   const otherAgents = allAgents?.filter(
    //     (agent) => agent.role !== 'chief'
    //   )
    //   const sortedOtherAgents = otherAgents?.sort(
    //     (a, b) => b.total_score - a.total_score
    //   )
    //   const sortedAgents = [findChief, ...sortedOtherAgents]
    //   setAllAgents(sortedAgents)
    // }
    // } catch (error) {
    //   console.error('Error fetching data:', error)
    // }
    // setLoadingState({ isLoading: false, message: null })
    // console.log(loadingState)
    // }
    // fetchData()
    allAgents.length === 0 && getAllAgents()
  }, [])

  const handlePrevious = () => {
    setRotateClass('rotate-left')
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? allAgents.length - 1 : prevIndex - 1
      )
      setRotateClass('') // Reset the rotation animation
    }, 500) // Match animation duration
  }

  const handleNext = () => {
    setRotateClass('rotate-right')
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === allAgents.length - 1 ? 0 : prevIndex + 1
      )
      setRotateClass('') // Reset the rotation animation
    }, 500) // Match animation duration
  }

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index)
  }

  const getAdjacentIndex = (offset) => {
    return (currentIndex + offset + allAgents.length) % allAgents.length
  }

  // if (allAgents.length === 0) {
  //   return (
  //     <div className='flex items-center justify-center h-screen text-white'>
  //       Loading...
  //     </div>
  //   )
  // }

  const translateValue = -currentIndex * 100

  return (
    allAgents.length > 0 && (
      <div className='relative w-full h-[90vh] flex items-center justify-center bg-black overflow-hidden '>
        {/* Left Button */}
        <button
          className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700'
          onClick={handlePrevious}
        >
          &#8592;
        </button>

        {/* Overlapping Left Card */}
        <div
          className={`absolute left-[18%] blur-sm transform scale-90 opacity-60 z-0 transition-all duration-500 ease-in-out`}
        >
          <div className='w-[300px] h-[350px] bg-gray-800 shadow-lg rounded-lg overflow-hidden'>
            <img
              src={`/profileImages/${
                allAgents[getAdjacentIndex(-1)].domain_name
              }.png`}
              alt={allAgents[getAdjacentIndex(-1)].name}
              className='w-full h-full object-cover grayscale'
            />
          </div>
        </div>
        {/* Overlapping Right Card */}
        <div
          className={`absolute right-[18%] blur-sm transform scale-90 opacity-60 z-0 transition-all duration-500 ease-in-out`}
        >
          <div className='w-[300px] h-[350px] bg-gray-800 shadow-lg rounded-lg overflow-hidden'>
            <img
              src={`/profileImages/${
                allAgents[getAdjacentIndex(1)].domain_name
              }.png`}
              alt={allAgents[getAdjacentIndex(1)].name}
              className='w-full h-full object-cover grayscale'
            />
          </div>
        </div>

        {/* Carousel Container */}
        <div className='absolute w-4/5 md:w-3/4 lg:w-4/5 h-[350px] overflow-hidden'>
          <div
            className={`flex transition-transform duration-500 ease-in-out transform ${rotateClass}`}
            style={{ transform: `translateX(${translateValue}%)` }}
          >
            {allAgents?.map((item, index) => (
              <div
                key={index}
                className='flex-shrink-0 w-full h-full flex items-center justify-center transition-all duration-500'
              >
                {/* Investigator Card */}
                <div className='flex w-full md:w-3/4 lg:w-[850px] h-[350px] bg-black shadow-xl rounded-lg overflow-hidden  border border-gray-700 '>
                  {/* Image Section */}
                  <div className='flex flex-col items-center justify-center w-[250px] h-[375px]'>
                    <div className='relative'>
                      <img
                        src={
                          `${item.domain_name}.png`.toString() in agentsImages
                            ? agentsImages[`${item.domain_name}.png`]
                            : detectiveProfile
                        }
                        alt={item.name}
                        className={`w-[200px] h-[200px] object-contain object-center  rounded-lg mb-3 ${
                          `${item.domain_name}.png`.toString() in agentsImages
                            ? 'grayscale'
                            : 'brightness-0 invert'
                        }`}
                      />

                      {item.resigned && (
                        <img
                          src={resigned}
                          alt=''
                          className='absolute bottom-0 right-0 opacity-90 rotate-[20deg]'
                        />
                      )}
                    </div>
                    <p className='font-bold text-center text-white border-gray-700  border-2 p-2 rounded-md w-[200px] tracking-widest font-mono'>
                      ID: {item.emp_id}
                    </p>
                  </div>

                  {/* Text Section */}
                  <div
                    className={`relative w-2/3 p-3 flex flex-col ${
                      item.role === 'chief' ? 'justify-center' : 'justify-start'
                    }`}
                  >
                    {/*LOGO (Centered in Text Section) */}
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0'>
                      <img
                        src={logo}
                        alt='Background Logo'
                        className='w-[250px] h-[250px] object-contain opacity-10'
                      />
                    </div>

                    <h1 className='text-3xl font-bold text-white mb-2 text-center tracking-widest'>
                      MPC-BUG HUNTERS
                    </h1>
                    <h2 className='text-2xl font-bold text-center text-white mb-2 my-1 z-10 tracking-widest space-x-2'>
                      <span className='capitalize text-red-200'>
                        {item.role}
                      </span>
                      <span>{item.domain_name}</span>
                    </h2>

                    {/* Details Grid */}
                    {item.role !== 'chief' ? (
                      <div className='grid grid-cols-2 gap-x-6 gap-y-2 z-10 font-bold text-center tracking-widest text-black bg-transparent text-lg border-solid border-2 border-gray-700 my-2 p-3 rounded-md w-full'>
                        <div className='flex items-center font-bold justify-center text-sm text-white'>
                          <span className='font-bold text-white'>
                            Current Score: &nbsp;
                          </span>{' '}
                          <span className='font-mono'>{item.total_score}</span>
                        </div>
                        <div className='flex items-center justify-center text-sm text-white'>
                          <span className='font-bold text-white'>
                            Previous Score: &nbsp;
                          </span>{' '}
                          <span className='font-mono'>{item.pre_score}</span>
                        </div>
                      </div>
                    ) : (
                      <div className='text-center uppercase mt-5 text-3xl font-semibold text-slate-500 font-mono tracking-wider'>
                        Captain of Direction
                      </div>
                    )}

                    {item.courses && item.courses.length > 0 && (
                      <div className='col-span-2 font-bold my-2 tracking-widest text-black bg-transparent text-lg border-solid border-2 border-gray-700 p-3 rounded-md w-full'>
                        <h3 className='text-sm font-bold text-white my-1 mb-2'>
                          Courses:
                        </h3>
                        <ul className='list-disc pl-5 text-sm text-white'>
                          {item.courses.split(';').map(
                            (course) =>
                              course.length > 0 && (
                                <li key={course} className='my-1'>
                                  {course}
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700'
          onClick={handleNext}
        >
          &#8594;
        </button>

        {/* Thumbnail Navigation */}
        <div className='absolute bottom-10 flex justify-center w-full space-x-3 grayscale contrast-100 brightness-110'>
          {allAgents?.map((item, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-full border-4 cursor-pointer transition-all duration-300 ${
                currentIndex === index
                  ? 'border-gray-200 scale-110'
                  : 'border-transparent'
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={
                  `${item.domain_name}.png`.toString() in agentsImages
                    ? agentsImages[`${item.domain_name}.png`]
                    : detectiveProfile
                }
                alt={item.name}
                className={`w-full h-full object-cover rounded-full ${
                  `${item.domain_name}.png`.toString() in agentsImages
                    ? 'grayscale'
                    : 'brightness-0 invert'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    )
  )
}

export default Bureau
