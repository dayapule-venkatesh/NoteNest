import React from 'react'
import Login from '../Pages/Login'
import { Outlet,Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'



const Layout = () => {
  return (
    <div className='bg-linear-[25deg,#b6a7f1,#efecfe,#b6acdd] h-screen flex '>
      <Sidebar/>
      <Outlet />
    </div>
   
  )
}

export default Layout