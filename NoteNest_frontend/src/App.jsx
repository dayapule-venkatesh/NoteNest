import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import Routes from './Routes/Routes'
import { useDispatch } from 'react-redux'
import { fetchUserData } from './Features/UserDetails'
import { fetchUserNotes } from './Features/UserNotes'



const App = () => {
  
 const dispatch= useDispatch()
   useEffect(() => {
    
     dispatch(fetchUserData())
     dispatch(fetchUserNotes())
   }, [dispatch]);
  return (
    <div>
      <RouterProvider router={Routes}/>
    </div>
  )
}

export default App