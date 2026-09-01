import React from 'react'
import {  Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import NoteCard from '../Components/NoteCard'
import { useSelector } from 'react-redux'

const All_Notes = () => {
  const UserNotes=useSelector(state=>state.userNotes.userdata)?.filter(ele=>ele.Trash==false)
  return (
    <div className='w-full h-110'>
        <nav className='flex justify-between mx-2 rounded-xl shadow-md p-2'>
         <div className='flex p-1 bg-[#f0e6ff] rounded'> <Search/>  <input type="search" placeholder='Search notes ...' className='outline-none' /></div>
         <Link to={'/layout/NewNote'}  className='p-2 rounded shadow-md bg-[#373ae1] text-white'>+ New Note</Link>
        </nav>

        <div>
            <NoteCard data={UserNotes}/>
        </div>
    </div>
  )
}

export default All_Notes