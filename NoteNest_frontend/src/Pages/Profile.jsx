import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import axios from "axios";
import { fetchUserData } from "../Features/UserDetails";
import { API_URL } from "../Features/domain";

const Profile = () => {
 const  userDetails=useSelector(state=>state.userDetails.userdata)
 const dispatch= useDispatch()
 console.log("redux2",userDetails)


  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [showPhotoModal, setShowPhotoModal] = useState(false);


  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();

    formData.append("profileImage", file);

    try {
      const response = await axios.post(
        `${API_URL}/api/upload/profileimg`,
        formData,
        {
          withCredentials: true,
        },
      );

      setImage(response.data.imageUrl);


      setShowPhotoModal(false);
    
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
      dispatch(fetchUserData())
  },[image])



  return (
    <div className="m-4 mx-10 flex  gap-10">
      <div >
        <h1 className="text-5xl font-bold m-3">Profile</h1>

        <div className="border m-3 p-5 rounded-xl shadow-md border-[#c2c2d6] flex gap-2 ">
          <div className="w-32 h-60 rounded-full overflow-hidden">
            {console.log(userDetails?.message?.profile)}
            {userDetails?.message?.profile ? (
              <img
                src={`${userDetails?.message?.profile}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 justify-evenly">
            <h1 className="text-2xl">{userDetails?.message?.name}</h1>
            <p>{userDetails?.message?.email}</p>
            <button
              onClick={() => setShowPhotoModal(true)}
              className="text-[#5c00e6] bg-[#e0ccff] p-2 border-gray-500 shadow-md w-fit-content rounded-xl "
            >
              Change photo
            </button>

            {showPhotoModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 w-[400px]">
                  <h2 className="text-xl font-bold mb-5">Change Photo</h2>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                  />

                  {file && (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-32 h-32 rounded-full object-cover mx-auto mt-5"
                    />
                  )}

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={() => setShowPhotoModal(false)}
                      className="px-4 py-2 border rounded-lg"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleUpload}
                      className="px-4 py-2 bg-[#5c00e6] text-white rounded-lg"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className=" flex flex-col  gap-2 shadow-md p-5 m-2 rounded-xl bg-[#EBE7FD] w-100 justify-between">
        <h1 className="font-bold text-xl">Account Information</h1>
        <label>Full Name:</label>
        <p className="rounded shadow-md bg-[#f0f0f5] px-2 py-1">{userDetails?.message?.name}</p>
        <label>Email</label>
        <p className="rounded shadow-md bg-[#f0f0f5] px-2 py-1">
          {userDetails?.message?.email}
        </p>
        <label>Skills</label>
        <p className="rounded shadow-md bg-[#f0f0f5] px-2 py-1">NA</p>
        <label>Bio</label>
        <textarea className="rounded shadow-md bg-[#f0f0f5] px-2 py-1 h-30  ">
          NA
        </textarea>
        <button className="bg-[#5c00e6] text-white mr-auto px-2 py-1 rounded ">
          Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;
