/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

const attendanceList = () => {
  const [ attendances, setAttendances ] = useState([]);
  
    useEffect(() => {
        getAttendances();
    }, []);

  const getAttendances = async () => {
    const response = await axios.get("http://localhost:5001/attendances");
    setAttendances(response.data);
  }

  return (
    <div>
        <h1 className='title'>Attendances</h1>
        <h2 className='subtitle'>List of Attendance</h2>

        <Link to="/attendances/add" className='button is-primary mb-2'>Add New Attendance</Link>
        
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Clock In Time</th>
                    <th>Clock Out Time</th>
                    <th>Photo File</th>
                </tr>
            </thead>
            <tbody>
                { attendances.map((attendance, index) => (
                    <tr key={attendance.uuid}>
                        <td>{index +1}</td>
                        <td>{attendance.user.name}</td>
                        <td>{attendance.clockIn}</td>
                        <td>{attendance.clockOut}</td>
                        <td>
                          <Link to={attendance.photoUrl}>
                            {attendance.photoFile}
                          </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default attendanceList