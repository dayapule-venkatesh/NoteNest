import React from 'react'
import { Link, Links } from 'react-router-dom'
import logo from '../assets/photos/logo.png'


const Navbar = () => {
  return (
    <div className='flex items-center justify-between rounded-xl shadow-md'>
       <img src={logo} alt="logo" className='size-20 ' />
       <div className=' flex gap-20'>
        <Link>Features</Link>
        <Link>How it works</Link>
        <Link>Pricing</Link>
        <Link>Frequently asked questions</Link>
       </div>
       <div >
         <Link to={'/login'} className='text-[#937CF1] bg-[#FFFFFF] rounded-xl shadow-md p-2 border-gray-500 mx-5'>Login</Link>
        <Link to={'/signup'} className='text-[#ffffff] bg-[#937CF1] rounded-xl shadow-md p-2 border-gray-500 mr-5'>Signup</Link>
       </div>
       
    </div>
  )
}

export default Navbar