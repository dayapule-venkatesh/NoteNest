import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,

  Pencil,
  Trash2,
  EllipsisVertical,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserNotes } from "../Features/UserNotes";
import CustomStar from '../assets/photos/CustomStar'

const NoteDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userNotes = useSelector((state) => state.userNotes.userdata);
  const dispatch = useDispatch();
 

 
  const handleEdit=async()=>{
    navigate('/layout/NewNote',{state:{ele:location.state?.ele}})

  }

  return (
    <div className="w-full p-2  h-[90%]">
      <nav className="flex justify-between w-full border-gray-500 rounded-xl  p-2 shadow-md">
        <div
          onClick={() => {
            return navigate("/layout/allNotes");
          }}
          className="flex gap-2"
        >
          <ArrowLeft /> Back to All Notes
        </div>
        <div className="flex gap-3">
          <CustomStar data={location.state?.ele} />
          <Pencil onClick={handleEdit}/>
          <Trash2 /> <EllipsisVertical />
        </div>
      </nav>
      <h1 className="text-3xl font-bold my-4 my-2 ">{location.state?.ele.title}</h1>
      <div
        className="
    [&_h2]:text-2xl
    [&_h2]:font-bold
    [&_h2]:my-4
    [&_p]:my-2
    p-2 pr-3 overflow-x-auto h-[90%]
  "
        dangerouslySetInnerHTML={{ __html: location.state?.ele.note }}
      />
    </div>
  );
};

export default NoteDetails;
