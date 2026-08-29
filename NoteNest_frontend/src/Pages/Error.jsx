import React from 'react'
import { useLocation } from 'react-router-dom'

const Error = () => {
    const location =useLocation();

  return (
    <div>{location.state?.message}</div>
  )
}

export default Error