import { motion } from 'framer-motion'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import Button from '../components/Button'
import { ToastNotificationContext } from '../context/ToastNotificationProvider'
import Switch from '../layouts/Switch'
import { AllAgentsContext } from '../context/AllAgentsProvider'
import { LoadingContext } from '../context/LoadingProvider'
import { AgentAuthenticationContext } from '../context/AgentAuthenticationProvider'

const UpdateExistingAgentForm = ({ selectedAgent, setSelectedAgent }) => {
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
    resigned: false,
  })

  const [severityCount, setSeverityCount] = useState({
    blocker: 0,
    critical: 0,
    major: 0,
    normal: 0,
    minor: 0,
  })
  const [isConfirmDeleteModalOn, setIsConfirmDeleteModalOn] = useState(false)
  const [agentImage, setAgentImage] = useState(null)

  const { showToastMessage } = useContext(ToastNotificationContext)
  const { getAllAgents } = useContext(AllAgentsContext)
  const { setLoadingState } = useContext(LoadingContext)
  const { agent } = useContext(AgentAuthenticationContext)

  const formRef = useRef(null)

  const onSeverityChange = (e) => {
    setSeverityCount({ ...severityCount, [e.target.name]: e.target.value })

    setFormData({
      ...formData,
      severity_count: {
        ...formData?.severity_count,
        [e.target.name]: e.target.value,
      },
    })
  }

  const uploadImage = async () => {
    if (!agentImage) return { success: true }

    try {
      const file = agentImage

      const renamedFile = new File([file], `${formData.domain_name}.png`, {
        type: file.type,
      })

      const form = new FormData()
      form.append('image', renamedFile)

      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: form,
      })

      const json = await response.json()

      return json
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoadingState({ isLoading: true, message: 'Updating Agent.' })

    const response = await fetch(
      'http://localhost:5000/api/auth/update-agent',
      {
        method: 'POST',
        body: JSON.stringify({
          domain_name: formData?.domain_name,
          emp_id: selectedAgent.emp_id,
          pre_score: formData?.pre_score,
          total_score: formData?.total_score,
          resigned: formData?.resigned,
          severity_count: {
            blocker: severityCount?.blocker,
            critical: severityCount?.critical,
            major: severityCount?.major,
            normal: severityCount?.normal,
            minor: severityCount?.minor,
          },
          courses: formData?.courses,
          authToken: localStorage.getItem('auth-token'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const json = await response.json()

    if (json.success) {
      const imageUpload = await uploadImage()

      if (!imageUpload.success) {
        throw new Error({ message: 'Error uploading image' })
      }

      setSelectedAgent(null)

      getAllAgents()
      setAgentImage('')

      formRef.current.reset()
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
        courses: '',
        resigned: false,
      })
    }

    showToastMessage(json.message)
    setLoadingState({ isLoading: false, message: null })
  }

  const handleDeleteAgent = async () => {
    setLoadingState({ isLoading: true, message: 'Deleting Agent.' })

    const response = await fetch(
      'http://localhost:5000/api/auth/delete-agent',
      {
        method: 'POST',
        body: JSON.stringify({
          emp_id: selectedAgent.emp_id,
          authToken: localStorage.getItem('auth-token'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const json = await response.json()

    if (json.success) {
      getAllAgents()

      setSelectedAgent(null)

      setIsConfirmDeleteModalOn(false)

      getAllAgents()

      formRef.current.reset()
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
        courses: '',
        resigned: false,
      })
    }

    showToastMessage(json.message)

    setLoadingState({ isLoading: false, message: null })
  }

  const toggleIsResigned = () => {
    setFormData({ ...formData, resigned: !formData?.resigned })
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

    if (e.target.name === 'image') {
      setAgentImage(e.target.files[0])
    }
  }

  useEffect(() => {
    setFormData(selectedAgent)
    setSeverityCount(selectedAgent?.severity_count)
  }, [selectedAgent])

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      )
    }
  }
  return (
    <>
      {selectedAgent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='absolute inset-0 h-screen flex justify-center items-center z-40 backdrop-blur-md'
        >
          <div className='update-existing-agent relative h-fit w-1/2 flex flex-col justify-center items-center bg-black p-5 border-2 border-white/30 rounded-lg'>
            <IoClose
              className='absolute top-5 right-5 text-4xl p-2 rounded-full cursor-pointer hover:bg-slate-500/30 duration-150'
              onClick={() => setSelectedAgent(null)}
            />

            <div className='flex flex-col justify-center items-center space-y-5 mx-auto'>
              <h2 className='text-3xl font-semibold w-full'>Update Agent</h2>

              <form
                onSubmit={handleSubmit}
                className='flex flex-col space-y-8 text-lg'
                ref={formRef}
              >
                <div className='input-row flex space-x-5'>
                  <div className='input-group flex flex-col space-y-2'>
                    <label htmlFor='domain_name' className=''>
                      <span className='flex'>
                        <span>Enter Domain Name</span>
                        {/* <LuAsterisk className='text-red-200 text-base' /> */}
                      </span>
                    </label>

                    <input
                      className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono'
                      name='domain_name'
                      type='text'
                      value={formData?.domain_name}
                      onChange={onChange}
                      onInput={maxLengthCheck}
                      maxLength={25}
                    />
                  </div>
                  <div className='input-group flex flex-col space-y-2'>
                    <label htmlFor='emp_id' className=''>
                      <span className='flex'>
                        <span>Detective Code </span>
                        {/* <LuAsterisk className='text-red-200 text-base' /> */}
                      </span>
                    </label>

                    <input
                      className='outline-none rounded-md bg-black border-2 border-slate-500/30 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px] text-white/70 cursor-not-allowed'
                      name='emp_id'
                      type='number'
                      value={formData?.emp_id}
                      onChange={onChange}
                      onInput={maxLengthCheck}
                      maxLength={8}
                      disabled
                    />
                  </div>
                </div>

                {formData?.role !== 'chief' && (
                  <div className='input-row flex flex-col space-y-2'>
                    <p>Enter Severities</p>

                    <div className='grid grid-cols-3 gap-x-5 gap-y-5'>
                      <div className='flex justify-between items-center w-full space-x-2'>
                        <p className='min-w-[4rem] text-base'>Blocker</p>{' '}
                        <input
                          className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                          type='number'
                          name='blocker'
                          value={formData?.severity_count.blocker}
                          onChange={onSeverityChange}
                        />
                      </div>

                      <div className='flex justify-between items-center w-full space-x-2'>
                        <p className='min-w-[4rem] text-base'>Critical</p>{' '}
                        <input
                          className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                          type='number'
                          name='critical'
                          value={formData?.severity_count.critical}
                          onChange={onSeverityChange}
                        />
                      </div>

                      <div className='flex justify-between items-center w-full space-x-2'>
                        <p className='min-w-[4rem] text-base'>Major</p>{' '}
                        <input
                          className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                          type='number'
                          name='major'
                          value={formData?.severity_count.major}
                          onChange={onSeverityChange}
                        />
                      </div>

                      <div className='flex justify-between items-center w-full space-x-2'>
                        <p className='min-w-[4rem] text-base'>Normal</p>{' '}
                        <input
                          className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                          type='number'
                          name='normal'
                          value={formData?.severity_count.normal}
                          onChange={onSeverityChange}
                        />
                      </div>

                      <div className='flex justify-between items-center w-full space-x-2'>
                        <p className='min-w-[4rem] text-base'>Minor</p>{' '}
                        <input
                          className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                          type='number'
                          name='minor'
                          value={formData?.severity_count.minor}
                          onChange={onSeverityChange}
                        />
                      </div>

                      <div className='flex justify-between items-center w-full space-x-2'>
                        <p className='min-w-[4rem] text-base'>Total</p>{' '}
                        <p className='outline-none rounded-md bg-black border-2 border-slate-500/30 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px] text-white/70'>
                          {selectedAgent.total_score}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {formData?.role !== 'chief' && (
                  <div className='input-row flex space-x-5'>
                    <div className='input-group flex flex-col space-y-2'>
                      <label htmlFor='pre_score' className=''>
                        Previous Score
                      </label>

                      <input
                        className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                        name='pre_score'
                        type='number'
                        value={formData?.pre_score}
                        onChange={onChange}
                        onInput={maxLengthCheck}
                        maxLength={8}
                      />
                    </div>

                    <div className='input-group flex flex-col space-y-2'>
                      <label htmlFor='courses' className=''>
                        Courses
                      </label>

                      <input
                        className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono'
                        name='courses'
                        type='text'
                        value={formData?.courses}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                )}

                <div className='input-row flex items-center justify-between space-x-5'>
                  <div className='input-group flex space-x-5'>
                    <label htmlFor='resigned' className='mr-5'>
                      Resigned
                    </label>

                    <Switch
                      state={formData?.resigned}
                      handler={toggleIsResigned}
                    />
                  </div>

                  <div className='input-group flex items-center space-x-5 w-1/2'>
                    <label htmlFor='courses' className='mr-5'>
                      <span>Image</span>
                    </label>

                    <input
                      className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 text-base font-semibold font-mono'
                      type='file'
                      name='image'
                      accept='image/png, image/jpeg'
                      onChange={onChange}
                    />
                  </div>

                  <div className='input-group flex justify-end space-x-5'>
                    <p
                      className='border-2 border-red-500 text-red-500 hover:bg-red-500/20 rounded-lg px-4 py-2 duration-150 cursor-pointer font-medium'
                      onClick={() => setIsConfirmDeleteModalOn(true)}
                    >
                      Delete Agent
                    </p>
                  </div>
                </div>

                <Button className={'text-base px-5 py-2 font-bold w-full'}>
                  UPDATE AGENT
                </Button>
              </form>
            </div>
          </div>

          {isConfirmDeleteModalOn && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='absolute w-screen h-screen p-5 rounded-lg delete-agent-confirmation backdrop-blur-md z-[60] flex justify-center items-center'
            >
              <div className='relative h-fit w-1/2 flex flex-col items-center bg-black p-5 border-2 border-white/30 rounded-lg space-y-5'>
                <IoClose
                  className='absolute top-5 right-5 text-4xl p-2 rounded-full cursor-pointer hover:bg-slate-500/30 duration-150'
                  onClick={() => setIsConfirmDeleteModalOn(false)}
                />
                <p className='text-2xl'>
                  Do you really want to delete{' '}
                  <b>{selectedAgent.domain_name}</b> with Detective Code{' '}
                  <b>{selectedAgent.emp_id}</b>?
                </p>

                <p className='w-full italic'>
                  <span className='font-semibold'>Warning:</span> This action
                  cannot be undone.
                </p>

                <div className='flex justify-end w-full space-x-5 font-medium'>
                  <p
                    className='border-2 border-white/70 text-white hover:bg-white/10 rounded-lg px-4 py-2 duration-150 cursor-pointer'
                    onClick={() => setIsConfirmDeleteModalOn(false)}
                  >
                    Cancel
                  </p>

                  <p
                    className='border-2 border-red-500 text-red-500 hover:bg-red-500/20 rounded-lg px-4 py-2 duration-150 cursor-pointer'
                    onClick={handleDeleteAgent}
                  >
                    Delete Agent
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </>
  )
}

export default UpdateExistingAgentForm
