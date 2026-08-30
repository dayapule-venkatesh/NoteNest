import React from 'react'
import { Search } from 'lucide-react'
import { useSelector } from 'react-redux'
import NoteCard from '../Components/NoteCard'

const Favorites = () => {
    const UserNote=useSelector(state=>state.userNotes.userdata)
    const favorite=UserNote?.filter(ele=>ele.favorite==true)
    
  
  return (
    <div className='w-full h-110'>
      <nav className='flex gap-1 p-4  rounded-xl shadow-md '>
            <Search/> <input type="search"  placeholder='Search favorites...' className='outline-none'/>
        </nav>
      <h1 className='text-3xl '>Favorites</h1>
      
     
        <NoteCard data={favorite}/>

      </div>

  )
}

export default Favorites