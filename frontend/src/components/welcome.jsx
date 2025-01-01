/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-restricted-imports */
import React from 'react'
import { useSelector } from 'react-redux'

const welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
        <h1 className='title'>Dashboard</h1>
        <h2 className='subtitle'>
          Welcome back <strong> {user && user.name} </strong>
        </h2>
    </div>
  )
}

export default welcome