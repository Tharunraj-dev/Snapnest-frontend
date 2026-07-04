import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Loading from "./components/Loading";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserRoutes from "./routes/userRoutes";
function App() {
  return (
    <div className="vw-100 vh-100 overflow-auto">
      <Loading />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user/*" element={<UserRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
