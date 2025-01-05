import React, { useContext, useEffect, useState } from 'react'
import { LuFingerprint } from 'react-icons/lu'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { AgentAuthenticationContext } from '../context/AgentAuthenticationProvider'
import { ToastNotificationContext } from '../context/ToastNotificationProvider'

const SignIn = () => {
  const [detectiveCode, setDetectiveCode] = useState()
  const [isInvalidAttempt, setIsInvalidAttempt] = useState(null)

  const { showToastMessage } = useContext(ToastNotificationContext)
  const { agent, getAgent } = useContext(AgentAuthenticationContext)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/agent-login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emp_id: detectiveCode }),
        }
      )

      const json = await response.json()

      if (json.success) {
        localStorage.setItem('auth-token', json.authToken)
        navigate('/')
      } else {
        setIsInvalidAttempt(true)
      }

      showToastMessage(json.message)
    } catch (error) {
      showToastMessage('Something went wrong.')
    }
  }

  const onChange = (e) => {
    setDetectiveCode(e.target.value)
  }

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      )
    }
  }

  return (
    <div className='w-screen h-screen absolute inset-0 flex justify-center items-center'>
      <div className='container w-1/3 p-5 rounded-lg flex flex-col space-y-10 border-2 border-slate-500/30 bg-slate-800/40'>
        <div className='space-y-5'>
          <h1 className='text-center text-3xl font-semibold'>
            AUTHENTICATE YOURSELF
          </h1>

          <span
            className={`flex justify-center items-center mx-auto text-5xl ${
              agent.isAuthenticated
                ? 'text-green-500'
                : isInvalidAttempt
                ? 'text-red-500'
                : 'text-white'
            } duration-150`}
          >
            <LuFingerprint />
          </span>
        </div>

        <div className='sign_in_form flex justify-center items-center'>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col items-center space-y-10 w-2/3'
          >
            <div className='input-group flex flex-col items-center space-y-2'>
              <label htmlFor='emp_id' className='text-lg'>
                Enter Detective Code
              </label>

              <input
                className='outline-none bg-black border border-red-500 px-4 py-2 text-xl font-semibold text-center tracking-[10px] w-full font-mono'
                name='detectiveCode'
                type='number'
                onChange={onChange}
                onInput={maxLengthCheck}
                maxLength={8}
              />
            </div>

            <Button className={'text-base px-5 py-2 font-bold w-full'}>
              AUTHENTICATE
            </Button>
          </form>
        </div>
      </div>

      {/* <Link to={'/landing'}>Home</Link> */}
    </div>
  )
}

export default SignIn
