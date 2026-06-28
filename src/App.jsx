import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
function App() {
  return (
    <div className="vh-100 vw-100 bg-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
