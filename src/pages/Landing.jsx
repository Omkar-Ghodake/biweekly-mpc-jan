import React from 'react'
import landingImage from '../assets/landing_detective.jpg'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { GiPistolGun } from 'react-icons/gi'

const Landing = () => {
  return (
    <div className='h-[90vh] w-full bg-transparent flex justify-between mt-[10vh] overflow-hidden'>
      <div className='w-fit p-20 pr-0 flex flex-col space-y-10'>
        <div className='flex flex-col space-y-5'>
          <h1 className='title text-9xl font-bold'>MPC</h1>

          <h2 className='text-6xl'>
            Member of Parliament's <br /> Corner
          </h2>
        </div>

        <p className='text text-4xl text-red-400 font-bebas tracking-wider'>
          Investigating the Seva trail: Every MP’s contribution revealed.
        </p>

        <Link to={'/what-we-do'}>
          <Button>
            Uncover Our Mission <GiPistolGun />
          </Button>
        </Link>
      </div>

      <div className='landing-image h-full'>
        <img src={landingImage} alt='' className='h-full' />
      </div>
    </div>
  )
}

export default Landing
