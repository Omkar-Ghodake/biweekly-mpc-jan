import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import { LuAsterisk } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { ToastNotificationContext } from '../context/ToastNotificationProvider'

const CreateNewAgent = () => {
  const [formData, setFormData] = useState({
    domain_name: '',
    emp_id: '',
    pre_score: '',
    total_score: 0,
    severity_count: {
      blocker: 0,
      critical: 0,
      major: 0,
      normal: 0,
      minor: 0,
    },
    courses: '',
  })

  const [severityCount, setSeverityCount] = useState({
    blocker: 0,
    critical: 0,
    major: 0,
    normal: 0,
    minor: 0,
  })

  const { showToastMessage } = useContext(ToastNotificationContext)

  const formRef = useRef(null)

  const onSeverityChange = (e) => {
    setSeverityCount({ ...severityCount, [e.target.name]: e.target.value })

    setFormData({
      ...formData,
      severity_count: {
        ...formData.severity_count,
        [e.target.name]: e.target.value,
      },
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(
      'http://localhost:5000/api/auth/create-agent',
      {
        method: 'POST',
        body: JSON.stringify({
          domain_name: formData.domain_name,
          emp_id: formData.emp_id,
          pre_score: formData.pre_score,
          total_score: formData.total_score,
          resigned: formData.resigned,
          severity_count: {
            blocker: severityCount.blocker,
            critical: severityCount.critical,
            major: severityCount.major,
            normal: severityCount.normal,
            minor: severityCount.minor,
          },
          authToken: localStorage.getItem('auth-token'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const json = await response.json()

    if (json.success) {
      setFormData({
        domain_name: '',
        emp_id: '',
        pre_score: '',
        total_score: 0,
        severity_count: {
          blocker: 0,
          critical: 0,
          major: 0,
          normal: 0,
          minor: 0,
        },
        resigned: false,
      })
      formRef.current.reset()
    } else {
    }
    showToastMessage(json.message)
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
    <div className='create-new-agent relative h-full flex flex-col justify-center items-center'>
      <Link
        to={'/dashboard'}
        className='absolute left-[20vw] top-0 text-3xl hover:text-inherit hover:bg-slate-500/40 p-1 rounded-full duration-150'
      >
        <IoArrowBackSharp />
      </Link>

      <div className='flex flex-col justify-center items-center -translate-y-10 space-y-5 h-full w-1/2 mx-auto'>
        <div className='flex justify-between w-full'>
          <h2 className='text-3xl font-semibold w-full'>Create New Agent</h2>

          <span className='w-full text-right flex justify-end'>
            <LuAsterisk className='text-red-200' />{' '}
            <span className='text-sm'>Indicates mandatory fields</span>
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col space-y-8 text-lg'
          ref={formRef}
        >
          <div className='input-row flex space-x-5'>
            <div className='input-group flex flex-col space-y-2'>
              <label htmlFor='domain_name' className=''>
                <span className='flex'>
                  <span>Enter Domain Name </span>
                  <LuAsterisk className='text-red-200 text-base' />
                </span>
              </label>

              <input
                className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono'
                name='domain_name'
                type='text'
                onChange={onChange}
                onInput={maxLengthCheck}
                maxLength={25}
              />
            </div>
            <div className='input-group flex flex-col space-y-2'>
              <label htmlFor='emp_id' className=''>
                <span className='flex'>
                  <span>Enter Detective Code </span>
                  <LuAsterisk className='text-red-200 text-base' />
                </span>
              </label>

              <input
                className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                name='emp_id'
                type='number'
                onChange={onChange}
                onInput={maxLengthCheck}
                maxLength={8}
              />
            </div>
          </div>

          <div className='input-row flex flex-col space-y-2'>
            <p>Enter Severities</p>

            <div className='grid grid-cols-3 gap-x-5 gap-y-5'>
              <div className='flex justify-between items-center w-full space-x-2'>
                <p className='min-w-[4rem] text-base'>Blocker</p>{' '}
                <input
                  className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                  type='number'
                  name='blocker'
                  onChange={onSeverityChange}
                />
              </div>

              <div className='flex justify-between items-center w-full space-x-2'>
                <p className='min-w-[4rem] text-base'>Critical</p>{' '}
                <input
                  className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                  type='number'
                  name='critical'
                  onChange={onSeverityChange}
                />
              </div>

              <div className='flex justify-between items-center w-full space-x-2'>
                <p className='min-w-[4rem] text-base'>Major</p>{' '}
                <input
                  className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                  type='number'
                  name='major'
                  onChange={onSeverityChange}
                />
              </div>

              <div className='flex justify-between items-center w-full space-x-2'>
                <p className='min-w-[4rem] text-base'>Normal</p>{' '}
                <input
                  className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                  type='number'
                  name='normal'
                  onChange={onSeverityChange}
                />
              </div>

              <div className='flex justify-between items-center w-full space-x-2'>
                <p className='min-w-[4rem] text-base'>Minor</p>{' '}
                <input
                  className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                  type='number'
                  name='minor'
                  onChange={onSeverityChange}
                />
              </div>
            </div>
          </div>

          <div className='input-row flex space-x-5'>
            <div className='input-group flex flex-col space-y-2'>
              <label htmlFor='pre_score' className=''>
                Previous Score
              </label>

              <input
                className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                name='pre_score'
                type='number'
                onChange={onChange}
                onInput={maxLengthCheck}
                maxLength={8}
              />
            </div>

            <div className='input-group flex flex-col space-y-2'>
              <label
                htmlFor='courses'
                className='flex justify-between items-center'
              >
                <span>Courses </span>
                <span className='text-xs text-red-200'>
                  Enter courses separated by semicolon (;)
                </span>
              </label>

              <input
                className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono'
                name='courses'
                onChange={onChange}
              />
            </div>
          </div>

          {/* <div className='input-row flex space-x-5'>
            <div className='input-group flex space-x-5'>
              <label htmlFor='resigned' className='mr-5'>
                Resigned
              </label>

              <Switch state={formData.resigned} handler={toggleIsResigned} />
            </div>
          </div> */}

          <Button className={'text-base px-5 py-2 font-bold w-full'}>
            CREATE AGENT
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateNewAgent
