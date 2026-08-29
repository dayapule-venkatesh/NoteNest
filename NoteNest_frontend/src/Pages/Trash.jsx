import { Search } from 'lucide-react'
import React from 'react'
import del from '../assets/photos/delete.png'

const Trash = () => {
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
              <td className=' p-3 text-left'>DELETED ON</td>
              <td className=' p-3 text-center'>ACTIONS</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='px-3'>old ideas</td>
              <td className='px-3'>may 18,2019</td>
              <td className='px-3 text-center '>
                <button className='text-[#373ae1] p-1' >Restore</button>
                <button className='text-red-500 p-1'>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <footer className='mt-auto ml-auto'>
          <img src={del} alt="delete" className='h-30 w-30   ' />
        </footer>
    </div>
  )
}

export default Trash