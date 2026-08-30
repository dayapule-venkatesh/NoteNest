import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";
import { Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import { IoPricetagOutline } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { GoTrash } from "react-icons/go";
import { useSelector } from "react-redux";
import getTimeAgo from "../utils/GetTime";

const Dashboard = () => {
  const  userDetails=useSelector(state=>state.userDetails.userdata)
  const userNotes=useSelector(state=>state.userNotes.userdata);
  const favorite=userNotes?.filter(ele=>ele.favorite==true).length;
  const labels=[...new Set(userNotes?.map(ele=>ele.label))].length;
  const recentNotes = userNotes
  ? [...userNotes].sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt)
    ).slice(0,5)
  : [];



  
  return (
    <div className="flex-1 flex flex-col">
      <nav className=" flex flex-row justify-between w-[100%] p-3  border-gray shadow-md">
        <SearchBar />

        <div className="flex gap-3">
          <Link
            to={"/layout/newNote"}
            className="bg-[#373ae1] text-white p-3 rounded-xl shadow-md"
          >
            + New Note
          </Link>
          <img src={`${userDetails?.message?.profile}`} alt="profile" className="rounded-full w-20 h-10" />
        </div>
      </nav>

      <div className="m-4">
        <h1 className="text-3xl font-bold ">Welcome back, Venkatesh! 🖐</h1>
        <p className="text-gray-500 text-xl">
          Here's what's happening with your notes.
        </p>
      </div>

      <div className="flex  justify-evenly">
        <div className="p-7 flex border-gray-500 rounded-xl shadow-md">
          <CgNotes className="size-10 text-[#5200cc]" />
          <div>
            <p>Total notes</p>
            <p>{userNotes?.length}</p>
          </div>
        </div>
        <div className="p-7 flex border-gray-500 rounded-xl shadow-md">
          <FiStar size={28} className="size-10 text-[#ffa366]" />
          <div>
            <p>Favorites</p>
            <p>{favorite}</p>
          </div>
        </div>
        <div className="p-7 flex border-gray-500 rounded-xl shadow-md">
          <IoPricetagOutline className="size-10 text-[#3bb300] m-1" />
          <div>
            <p>labels</p>
            <p>{labels}</p>
          </div>
        </div>
        <div className="p-7 flex border-gray-500 rounded-xl shadow-md bg-[#]">
          <GoTrash className="size-10 " />
          <div>
            <p>Trash</p>
            <p>128</p>
          </div>
        </div>
      </div>
      <div className="m-7  rounded-md border-gray-500 shadow-md">
        <h1 className="text-2xl">Recent Notes</h1>
        <table className="w-full  ">
          <tbody>
          {
            recentNotes.map((ele,idx)=>(
              <tr key={idx} className="flex rounded-md border-gray-500 shadow-md m-2 p-1">
                <td  className=" w-full">{ele.title}</td>
                <td className="  w-full">{ele.label}</td>
                <td className="w-full ">{getTimeAgo(ele.updatedAt||ele.createdAt)}</td>
              </tr>
            ))

          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
