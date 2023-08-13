import "./index.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Charts from "./Components/Charts";
import Main from "./pages/Main"
function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/charts" element={<Charts />} />
      </Routes>
    </div>
  );
}

export default App;
