import { Search } from 'lucide-react'
import React from 'react'
import del from '../assets/photos/delete.png'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { API_URL } from '../Features/API'
import { fetchUserNotes } from '../Features/UserNotes'
import { useNavigate } from 'react-router-dom'

const Trash = () => {
  const Notes=useSelector(state=>state.userNotes.userdata);
  const dispatch=useDispatch()
  const Trash=Notes?.filter(ele=>ele.Trash==true)
  const navigate=useNavigate()

  const handleRestore=async(id)=>{
    const restore=await axios.patch(`${API_URL}/api/note/restore`,{id:id},{withCredentials:true})
    if(restore.data.status){ dispatch(fetchUserNotes());
     
      alert(restore.data.message)
      navigate('/layout/allNotes')  

    }
      else{alert(restore.data.message)}
  }
  const handleDelete=async(id)=>{
    const deleteNote=await axios.delete(`${API_URL}/api/note/deleteNote`,{data:{id:id},withCredentials:true});
    if(deleteNote.data.status){
      dispatch(fetchUserNotes());
      alert(deleteNote.data.message);
      navigate('/layout/allNotes')
    }
    else{
      alert(deleteNote.data.message)
    }


  }
  return (
    <div className='w-full p-3 flex flex-col gap-10 h-full'>
        <nav className='flex gap-1 p-4  rounded-xl shadow-md '>
            <Search/> <input type="search"  placeholder='Search trashed notes ...' className='outline-none'/>
        </nav>
        <p className='text-gray-500'>Notes in trash will be permanantly deleted after 30 days</p>
        <table className=' w-full table-fixed shadow-md '>
          <thead  >
            <tr className='text-gray-500'>
              <td className=' p-3 text-left'>TITLE</td>
              <td className=' p-3 text-left'>LABEL</td>
              <td className=' p-3 text-center'>ACTIONS</td>
            </tr>
          </thead>
          <tbody>
            {Trash?.map((ele,idx)=>(
              <tr key={idx}>
              <td className='px-3'>{ele.title}</td>
              <td className='px-3'>{ele.label}</td>
              <td className='px-3 text-center '>
                <button className='text-[#373ae1] p-1' onClick={()=>handleRestore(ele._id)} >Restore</button>
                <button className='text-red-500 p-1'onClick={()=>handleDelete(ele._id)}>Delete</button>
              </td>
            </tr>


            )
            
          )
              

            }
            
          </tbody>
        </table>
        <footer className='mt-auto ml-auto'>
          <img src={del} alt="delete" className='h-30 w-30   ' />
        </footer>
    </div>
  )
}

export default Trash