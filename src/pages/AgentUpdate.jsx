import React, { useState } from 'react'
import Button from '../components/Button';
import logo from '../assets/mpcBadge.png'
const AgentUpdate = () => {
    const [formData, setFormData] = useState({
        domain_name: '',
        emp_id: '',
        pre_score: '',
        blocker: 0,
        critical: 0,
        major: 0,
        normal: 0,
        minor: 0,
        total_score: 0,
        courses: '',
        role: 'agent',
        resigned: false,
    });

    const toggleIsResigned = () => {
        setFormData({ ...formData, resigned: !formData.resigned })
      }
    
      const onChange = (e) => {
        // setDetectiveCode(e.target.value)
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
        <div className='create-new-agent h-full flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center -translate-y-10 space-y-5 h-full w-1/2 mx-auto'>
        <h2 className='text-3xl font-semibold w-full'>Create New Agent</h2>

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
                  onChange={(e) => {
                    setSeverityCount({
                      ...severityCount,
                      blocker: e.target.value,
                    })
                    setTotalScore()
                  }}
                />
              </div>

              <div className='flex justify-between items-center w-full space-x-2'>
                <p className='min-w-[4rem] text-base'>Critical</p>{' '}
                <input
                  className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                  type='number'
                  onChange={(e) => {
                    setSeverityCount({
                      ...severityCount,
                      critical: e.target.value,
                    })
                    setTotalScore()
                  }}
                />
              </div>

              <div className='flex justify-between items-center w-full space-x-2'>
                <p className='min-w-[4rem] text-base'>Major</p>{' '}
                <input
                  className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                  type='number'
                  onChange={(e) => {
                    setSeverityCount({
                      ...severityCount,
                      major: e.target.value,
                    })
                    setTotalScore()
                  }}
                />
              </div>

              <div className='flex justify-between items-center w-full space-x-2'>
                <p className='min-w-[4rem] text-base'>Normal</p>{' '}
                <input
                  className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                  type='number'
                  onChange={(e) => {
                    setSeverityCount({
                      ...severityCount,
                      normal: e.target.value,
                    })
                    setTotalScore()
                  }}
                />
              </div>

              <div className='flex justify-between items-center w-full space-x-2'>
                <p className='min-w-[4rem] text-base'>Minor</p>{' '}
                <input
                  className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono tracking-[10px]'
                  type='number'
                  onChange={(e) => {
                    setSeverityCount({
                      ...severityCount,
                      minor: e.target.value,
                    })
                    setTotalScore()
                  }}
                />
              </div>
            </div>
          </div>

          <div className='input-row flex space-x-5'>
            <div className='input-group flex flex-col space-y-2'>
              <label htmlFor='total_score' className=''>
                Total Score
              </label>

              <input
                className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 text-xl font-semibold w-full font-mono'
                name='total_score'
                type='text'
                value={formData.total_score}
                onChange={onChange}
                onInput={maxLengthCheck}
                maxLength={25}
                disabled
              />
            </div>
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
          </div>

          <div className='input-row flex space-x-5'>
            <div className='input-group flex space-x-5'>
              <label htmlFor='resigned' className='mr-5'>
                Resigned
              </label>

              <Switch state={formData.resigned} handler={toggleIsResigned} />
            </div>
          </div>

          <Button className={'text-base px-5 py-2 font-bold w-full'}>
            CREATE AGENT
          </Button>
        </form>
      </div>
    </div>
    );
};
export default AgentUpdate