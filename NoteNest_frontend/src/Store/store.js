import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/UserDetails.js";
import userNoteReducer from "../Features/UserNotes.jsx";

export const store = configureStore({
  reducer: {
    userDetails: userReducer,
    userNotes: userNoteReducer,
  },
});
