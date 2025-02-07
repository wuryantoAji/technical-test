/* eslint-disable @typescript-eslint/no-restricted-imports */
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoPerson, IoHome, IoLogOut, IoCalendar } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import { logOut, reset } from "../features/authSlice"

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const logout = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate("/");
  }

  return (
    <div>
      <aside className="menu pl-4 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li><NavLink to={"/dashboard"}><IoHome/> Dashboard</NavLink></li>
          <li><NavLink to={"/attendances"}><IoCalendar/> Attendance</NavLink></li>
        </ul>

        {user && user.role === "HRD" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li><NavLink to={"/users"}><IoPerson/> Users</NavLink></li>
            </ul>
          </div>
        )}
        
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li><button onClick={logout} className='button is-white'><IoLogOut/>  Logout</button></li>
        </ul>
      </aside>
    </div>
  )
}

export default Sidebar