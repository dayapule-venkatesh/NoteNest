import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useMemo } from "react";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import { TextStyle, FontSize } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import HeaderOptions from "./HeaderOptions";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from "@tiptap/extension-table";
import { ArrowLeft, CheckCircle } from "lucide-react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import CustomStar from "../../assets/photos/CustomStar.jsx";
import { useDispatch } from "react-redux";
import { fetchUserNotes } from "../../Features/UserNotes.jsx";
import { API_URL } from "../../Features/domain.jsx";

const NewNote = () => {
  const navigate = useNavigate();
  const location = useLocation();
   const dispatch = useDispatch();
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextStyle,
      Color,
      Highlight,
      TaskList,
      FontSize,
      TaskItem.configure({
        nested: true,
      }),
      Image.configure({
        inline: false,
      }),
      Table.configure({
        resizable: true,
      }),

      TableRow,
      TableHeader,
      TableCell,
    ],
    editorProps: {
      attributes: {
        class:
          " tiptap outline-none min-h-[20px]    w-240 max-w-240 p-4 bg-white ",
      },
    },
    content: "<p>Hello world</p>",
  });
  const providerValue = useMemo(() => ({ editor }), [editor]);
  const [title, setTitle] = useState("Untitled Note");
  const labelarr = ["work", "Personal", "Study", "Ideas"];
  const [label, setLabel] = useState("");

  const [selectedLabel, setSelectedLabel] = useState("");
 

  const HandelSave = async () => {
    const note = editor.getHTML();
    const res = await axios.post(
      `${API_URL}/api/note/newnote`,
      {
        title,
        label,
        note,
      },
      { withCredentials: true },
    );
    alert(res.data.message);
    navigate("/layout/allNotes");
  };

  const handelEdit=async()=>{
    const note = editor.getHTML();
    const update=await axios.patch(`${API_URL}/api/note/edit`,{id:location.state?.ele._id, title:title,label:label,note:note},{withCredentials:true});
    alert(update.data.message);
    dispatch(fetchUserNotes())
    navigate("/layout/noteDetail",{state:{ele:update.data.note}})
  }

  useEffect(() => {
    editor.commands.setContent(location.state?.ele.note);
    setTitle(location.state?.ele.title);
    setSelectedLabel(location.state?.ele.label);
  }, [editor]);

  return (
    <div className="flex flex-col  mx-10 gap-3">
      <nav className="flex justify-between my-1 border-gray-500 rounded-xl shadow-md p-2">
        <span
          className="flex"
          onClick={() => {
            return navigate("/layout/allNotes");
          }}
        >
          <ArrowLeft />
          Back
        </span>
        <button
          className="bg-[#3d0099] text-white  rounded-xl px-5 py-1 "
          onClick={()=>{location.state?.ele.note?handelEdit():HandelSave()}}
        >
          Save
        </button>
      </nav>
      <div className="flex  justify-between">
        <input
        type="text"
        className="max-w-60"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
        <div className="flex gap-1" >
        <CustomStar  data={location.state?.ele}/>
    mark Favorite
      </div>
      
      
      
      </div>
      <div className=" border-gray bg-white h-105 rounded-xl shadow-md">
        <HeaderOptions editor={editor} />
        <EditorContext.Provider value={providerValue}>
          <EditorContent
            editor={editor}
            className="h-80 overfolw-auto overflow-x-hidden "
          />
        </EditorContext.Provider>
      </div>

      <footer className="pb-5 flex  justify-between">
        <div className="flex gap-5">
          <select
            name="lables"
            id="1"
            value={selectedLabel}
            onChange={(e) => setLabel(e.target.value)}
            className="bg-[#e0ccff] text-[#3d0099] rounded"
          >
            <option value="" disabled hidden>
              Select Label
            </option>

            {labelarr.map((ele, idx) => (
              <option key={idx}>{ele}</option>
            ))}
          </select>
          <input
            className="text-gray-500 bg-[#e0ccff] rounded p-1 px-3"
            placeholder=" Add label ..."
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <div className="flex gap-2 ">
          <CheckCircle className=" text-green-500" />
          Saved
        </div>
      </footer>
    </div>
  );
};

export default NewNote;
