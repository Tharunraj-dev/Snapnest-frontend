import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Cookie from "js-cookie";

import Profile from "./../pages/user/Profile";
import ChatContainer from "../pages/user/chats/ChatContainer";

import { initializeData } from "./../features/authSlice";
import fethData from "./../api/fetchData";

const userRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const uid = Cookie.get("uid");
    if (isAuthenticated || !uid) return;
    const fetchUserData = async () => {
      const res = await fethData();
      const { userName, email, role, uid, profileURL } = res.data;
      dispatch(initializeData({ userName, email, role, uid, profileURL }));
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/chats" element={<ChatContainer />} />
    </Routes>
  );
};

export default userRoutes;
