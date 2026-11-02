import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./API";

export const fetchUserData = createAsyncThunk(
  "userDetails/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/user/userprofile`, {
        withCredentials: true,
      });

      if (!data.status) {
        return rejectWithValue(data.message || "Could not load your profile");
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Could not load your profile",
      );
    }
  },
);

export const UserDetails = createSlice({
  name: "userDetails",
  initialState: { userdata: null, status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userdata = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default UserDetails.reducer;
