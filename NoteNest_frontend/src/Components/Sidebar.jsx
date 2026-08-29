import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  House,
  Notebook,
  Star,
  Trash2,
  CircleUser,
  Settings,
  LogOut,
} from "lucide-react";
import logo from "../assets/photos/logo.png";
import axios from "axios";

const Sidebar = () => {
  const navigate=useNavigate()
  const active = useRef();
  const obj = {
    height: "60px",
    width: "20px",
  };
  const handelemenu = () => {
    active.current.classList.toggle("active");
  };

  const handleLogout=async()=>{
    const res= await axios.get("http://localhost:3000/api/auth/logout",{withCredentials:true})
    const status=res.data.status;
    if(status){
      alert("logout sucessfull")
      navigate('/')
    }
    else{
      navigate('error',{
        state:{
          message:res.data.message

        }
      })
    }
    
  }
  return (
    <aside
      ref={active}
      onMouseEnter={handelemenu}
      onMouseLeave={handelemenu}
      className="w-50 bg-[#2e2e30]"
    >
      <img src={logo} alt="logo" className="m-5 size-30" />
      <nav className="flex flex-col   ">
        <Link
          to={"/layout/"}
          className="p-3 mx-2 text-white flex gap-4 hover:bg-[#572ff5]  rounded-xl "
        >
          <House />
          <span className="text-xl ">Dashboard</span>
        </Link>
        <Link
          to={"/layout/allNotes"}
          className="p-3 mx-2 text-white flex gap-4 hover:bg-[#572ff5]  rounded-xl "
        >
          <Notebook />
          <span className="text-xl">AllNotes</span>
        </Link>
        <Link
          to={"/layout/favorites"}
          className="p-3 mx-2 text-white flex gap-4 hover:bg-[#572ff5]  rounded-xl "
        >
          <Star />
          <span className="text-xl">Favorites</span>
        </Link>

        <Link
          to={"/layout/trash"}
          className="p-3 mx-2 text-white flex gap-4 hover:bg-[#572ff5]  rounded-xl "
        >
          <Trash2 />
          <span className="text-xl">Trash</span>
        </Link>
        <Link
          to={"/layout/profile"}
          className="p-3 mx-2 text-white flex gap-4 hover:bg-[#572ff5]  rounded-xl "
        >
          <CircleUser />
          <span className="text-xl">Profile</span>
        </Link>
        <Link className="p-3 mx-2 text-white flex gap-4 hover:bg-[#572ff5]  rounded-xl ">
          <Settings />
          <span className="text-xl">Settings</span>
        </Link>
        <button onClick={handleLogout} className="p-3 mx-2 text-white flex gap-4 hover:bg-[#572ff5]  rounded-xl ">
          <LogOut />
          <span className="text-xl">Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
