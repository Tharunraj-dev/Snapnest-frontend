import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../features/authSlice";
import loadingReducer from "./../features/LoadingSlice";

const store = configureStore({
  devTools: true,
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  },
});

export default store;
