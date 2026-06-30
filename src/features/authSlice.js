import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    isAuthenticated: false,
    userName: "",
    email: "",
    uid: "",
    profileURL:"",
  },
  reducers: {
    initializeData: (state, action) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.profileURL = action.payload.profileURL;
    },
    resertData: (state) => {
      state.isAuthenticated = false;
      state.userName = "";
      state.email = "";
      state.uid = "";
      state.profileURL = "";
    },
  },
});
export const { initializeData } = authSlice.actions;
export default authSlice.reducer;
