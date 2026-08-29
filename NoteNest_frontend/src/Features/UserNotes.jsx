import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserNotes=createAsyncThunk("userNotes/fetchUserNotes",async()=>{
    const {data} = await axios.get("http://localhost:3000/api/note/allnotes", {
        withCredentials: true,
      });

      return data.notes
})



export const UserNotes=createSlice({
    name:"userNotes",
    initialState:{userdata:null},
   
    extraReducers:(builder)=>{builder.addCase(fetchUserNotes.fulfilled,(state,action)=>{
        state.userdata=action.payload;
    })}
})
export const {userNotes}=UserNotes.actions;
export default UserNotes.reducer