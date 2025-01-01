/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const formAddAttendance = () => {
  const [clockInTime, setClockInTime] = useState("");
  const [clockOutTime, setClockOutTime] = useState("");
  const [photoFile, setPhotoFile] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveAttendance = async(e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5001/attendances', {
            photoFile: photoFile,
            clockIn: clockInTime,
            clockOut: clockOutTime,
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        navigate("/attendances")
    } catch(error) {
        if(error.response){
            setMsg(error.response.data.msg);
        }
    }
  }

  return (
    <div>
        <h1 className='title'>Attendance</h1>
        <h2 className='subtitle'>Add New Attendance</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                    <form onSubmit={saveAttendance}>
                        <p className='has-text-centered'>{msg}</p>
                        <div className="field">
                            <label className="label">Clock In Time</label>
                            <div className="control">
                                <input 
                                    type="datetime-local" 
                                    className="input" 
                                    value = {clockInTime}
                                    onChange={(e) => setClockInTime(e.target.value)}
                                    placeholder="01-02-2023"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Clock Out Time</label>
                            <div className="control">
                                <input 
                                    type="datetime-local" 
                                    className="input" 
                                    value = {clockOutTime}
                                    onChange={(e) => setClockOutTime(e.target.value)}
                                    placeholder="01-02-2023"/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Photo File</label>
                            <div className="control">
                                <input 
                                    type="file" 
                                    onChange={(e) => setPhotoFile(e.target.files[0])}
                                    className="input"
                                />
                            </div>
                        </div>                        
                        <div className="field">
                            <div className="control">
                                <button
                                    type="submit" 
                                    className="button is-success">
                                    Add Attendance
                                </button>
                            </div>                        
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default formAddAttendance