import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./domain";

export const fetchUserNotes=createAsyncThunk("userNotes/fetchUserNotes",async()=>{
    const {data} = await axios.get(`${API_URL}/api/note/allnotes`, {
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