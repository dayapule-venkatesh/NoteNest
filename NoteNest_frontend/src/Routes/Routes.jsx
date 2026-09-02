import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "../Pages/Login";
import { Logindata } from "../actions/Logindata";
import Signup from "../Pages/Signup";
import { Signupdata } from "../actions/Signupdata";
import LandingPage from "../Pages/LandingPage";
import Forgot from "../Pages/Forgot";
import { Forgotdata } from "../actions/Forgotdata";
import Dashboard from "../Pages/Dashboard";

import Profile from "../Pages/Profile";
import NewNote from "../Pages/newNote/NewNote";
import NoteDetails from "../Pages/NoteDetails";
import All_Notes from "../Pages/All_Notes";
import Favorites from "../Pages/Favorites";
import Trash from "../Pages/Trash";
import ProtectedRoute from "../Components/ProtectedRoute";
import Error from "../Pages/Error";
import Otp from "../Pages/OTP";



const Routes = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login />, action: Logindata },
  { path: "/signup", element: <Signup />, action: Signupdata },
  {path:"/otp", element:<Otp/>},
  { path: "/forgot", element: <Forgot />, action: Forgotdata },
  {path:"/error",element:<Error/>},
  {
    path: "/layout",
    element: <ProtectedRoute><Layout/></ProtectedRoute> ,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "allNotes",  element:<All_Notes/>},
      { path: "noteDetail", element:<NoteDetails/>},
      { path: "newNote" , element:<NewNote/> },
      { path: "favorites", element:<Favorites/>},
      { path: "trash", element:<Trash/> },
      { path: "profile", element:<Profile/> },
      { path: "settings" },
      
    ],
   
  },
]);

export default Routes;
