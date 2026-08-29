import {  useEffect } from "react";
import { useDispatch} from "react-redux";
import { fetchUserNotes } from "../Features/UserNotes";
import { useNavigate } from "react-router-dom"; 
import CustomStar from '../assets/photos/CustomStar.jsx'
const NoteCard = ({data}) => {
  const dispatch=useDispatch();
  const navigate=useNavigate()

  
const getTimeAgo = (date) => {
  const seconds = Math.floor(
    (new Date() - new Date(date)) / 1000
  );

  if (seconds < 60) {
    return "just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(days / 365);

  return `${years} year${years > 1 ? "s" : ""} ago`;
};
  const getText = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || "";
};
 
  
  useEffect(() => {    
     dispatch(fetchUserNotes())
  }, []);

  

  return (
    <div className="m-10">
    <div className="h-full w-auto flex flex-wrap  overflow-auto  ">
      
        {data?.map((ele, idx) => (
          <div
            key={idx}
            className="h-50 w-60 shadow-md m-2 rounded-xl bg-[#e6e3f9] p-4 flex flex-col gap-3 "
            onClick={ ()=>{navigate("/layout/noteDetail",{state:{ele:ele}})}}
          >
            <h1 className="text-3xl font-bold flex  justify-between ">{ele.title} <CustomStar data={ele}/></h1>
            <button className="border border-gray-700 rounded-xl p-1 shadow-md  w-fit ">{ele.label}</button>
            <p  dangerouslySetInnerHTML={{ __html: getText(ele.note).slice(0,30)+"...."}}>
            </p>
            <p>{getTimeAgo(ele.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteCard;