import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./API";

export const fetchUserNotes = createAsyncThunk(
  "userNotes/fetchUserNotes",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/note/allnotes`, {
        withCredentials: true,
      });

      if (!data.status) {
        return rejectWithValue(data.message || "Could not load notes");
      }

      return data.notes;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Could not load notes",
      );
    }
  },
);

export const UserNotes = createSlice({
  name: "userNotes",
  initialState: { userdata: null, status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserNotes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserNotes.fulfilled, (state, action) => {
        state.userdata = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUserNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

const userNotesReducer = UserNotes.reducer;

export default userNotesReducer;
