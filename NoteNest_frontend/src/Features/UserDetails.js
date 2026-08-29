import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUserData=createAsyncThunk("userDetails/fetchUserDetails",async()=>{
    const {data} = await axios.get("http://localhost:3000/api/user/userprofile", {
        withCredentials: true,
      });

      return data
})

export const UserDetails= createSlice({
    name:"userDetails",
    initialState:{userdata:null},
    
    extraReducers:(builder)=>{
        builder.addCase(fetchUserData.fulfilled,(state,action)=>{
            state.userdata=action.payload;
        })
    }

}) 

export const {userdata}=UserDetails.actions;
export default UserDetails.reducer



