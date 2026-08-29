import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserNotes } from '../../Features/UserNotes';
import { API_URL } from '../../Features/API';
const Star = ( {data }) => {
 
  const UserNote=useSelector(state=>state.userNotes.userdata)
  
  const favorite=UserNote?.find(ele=>ele._id==data?._id)?.favorite

  
  const dispatch = useDispatch();
 


const handelfavorite=async()=>{

   
   await axios.patch(`${API_URL}/api/note/favorite`, {
      id:data._id,
      favorite:!favorite,
    });
    
   
    dispatch(fetchUserNotes());
  };

 
 

  return (
    <><svg
      className={`w-6 h-6 ${favorite?"fill-yellow-400":"fill-white"} stroke-yellow`}
      viewBox="0 0 24 24"
      strokeWidth="2"
      onClick={(e)=>{
        e.stopPropagation();
        handelfavorite()}}
    >
      <path d="M12 2.5l2.94 5.95 6.56.95-4.75 4.63 1.12 6.54L12 17.48l-5.87 3.09 1.12-6.54L2.5 9.4l6.56-.95L12 2.5z" />
    </svg>  </>
  )
}

export default Star