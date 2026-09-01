import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserNotes } from "../Features/UserNotes";
import { useNavigate } from "react-router-dom";
import CustomStar from "../assets/photos/CustomStar.jsx";
import getTimeAgo from "../utils/GetTime.jsx";


const NoteCard = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getText = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || "";
  };

  useEffect(() => {
    dispatch(fetchUserNotes());
  }, []);

  return (
    <div className="m-10">
      <div className=" h-[75vh] w-auto flex flex-wrap  overflow-auto  ">
        {data?.map((ele, idx) => (
          <div
            key={idx}
            className="h-50 w-60 shadow-md m-2 rounded-xl bg-[#e6e3f9] p-4 flex flex-col gap-3 "
            onClick={() => {
              navigate("/layout/noteDetail", { state: { ele: ele } });
            }}
          >
            <h1 className="text-3xl font-bold flex  justify-between ">
              {ele.title.slice(0,11)+"..."} <CustomStar data={ele} />
            </h1>
            <button className="border border-gray-700 rounded-xl p-1 shadow-md  w-fit ">
              {ele.label}
            </button>
            <p
              dangerouslySetInnerHTML={{
                __html: getText(ele.note).slice(0, 30) + "....",
              }}
            ></p>
            <p>{getTimeAgo(ele.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteCard;
