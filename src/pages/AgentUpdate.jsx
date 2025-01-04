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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => {
            const updatedValue = type === 'checkbox' ? checked : value;
            const updatedFormData = { ...prev, [name]: updatedValue };


            updatedFormData.total_score = (updatedFormData.blocker || 0) * 10 + (updatedFormData.critical || 0) * 8 + (updatedFormData.major || 0) * 5 + (updatedFormData.normal || 0) * 3 + (updatedFormData.minor || 0) * 1;


            return updatedFormData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className=" w-full min-h-screen flex justify-center items-center "  >
            <div className=" w-1/2 p-5 rounded-lg justify-center flex flex-col space-y-8 border border-slate-500 bg-slate-800/40"
            >
                <h1 className="text-center text-3xl font-semibold ">
                    Update Agent Details
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className=" flex flex-col items-center space-y-5 "

                >

                    <div className="input-group flex flex-col w-full">
                        <label htmlFor="domain_name" className="">
                            Domain Name
                        </label>
                        <input
                            className="outline-none bg-black border border-red-500 px-4 py-2 "
                            name="domain_name"
                            type="text"
                            value={formData.domain_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group flex flex-col w-full">
                        <label htmlFor="emp_id" className="text-white">
                            Employee ID
                        </label>
                        <input
                            className="outline-none bg-black border border-red-500 px-4 py-2 text-white"
                            name="emp_id"
                            type="number"
                            value={formData.emp_id}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group flex flex-col w-full">
                        <label htmlFor="pre_score" className="text-white">
                            Previous Score
                        </label>
                        <input
                            className="outline-none bg-black border border-red-500 px-4 py-2 text-white"
                            name="pre_score"
                            type="number"
                            value={formData.pre_score}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col w-full space-y-2">
                        <label className="text-white">Severity Counts</label>

                        {/* First Row - Blocker, Critical, Major */}
                        <div className="flex space-x-5">
                            {['blocker', 'critical', 'major'].map((key) => (
                                <div className="flex justify-between items-center w-1/3" key={key}>
                                    <span className="capitalize text-white">{key}</span>
                                    <input
                                        className="outline-none bg-black border border-red-500 px-4 py-2 text-white w-20"
                                        name={key}
                                        type="number"
                                        min={0}
                                        value={formData[key]}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Second Row - Normal, Minor */}
                        <div className="flex space-x-5">
                            {['normal','minor'].map((severity) => (
                                <div className="flex justify-between items-center w-[238px] " key={severity}>
                                    <span className="capitalize text-white ">{severity}</span>
                                    <input
                                        className="outline-none  bg-black border border-red-500 px-4 py-2 text-white w-20"
                                        name={severity}
                                        type="number"
                                        min={0}
                                        value={formData[severity]}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>



                    <div className="input-group flex flex-col w-full">
                        <label htmlFor="total_score" className="text-white">
                            Total Score
                        </label>
                        <input
                            className="outline-none bg-black border border-red-500 px-4 py-2 text-white"
                            name="total_score"
                            type="number"
                            value={formData.total_score}
                            readOnly
                        />
                    </div>

                    <div className="input-group flex flex-col w-full">
                        <label htmlFor="courses" className="text-white">
                            Courses
                        </label>
                        <input
                            className="outline-none bg-black border border-red-500 px-4 py-2 text-white"
                            name="courses"
                            type="text"
                            value={formData.courses}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group flex justify-between items-center w-full">
                        <label htmlFor="resigned" className="text-white">
                            Resigned
                        </label>
                        <input
                            className="outline-none"
                            name="resigned"
                            type="checkbox"
                            checked={formData.resigned}
                            onChange={handleChange}
                        />
                    </div>
                    <Button className="text-base px-5 py-2 font-bold w-full bg-white text-black hover:bg-red-700">
                        Update
                    </Button>
                </form>
            </div>
        </div>
    );
};
export default AgentUpdate