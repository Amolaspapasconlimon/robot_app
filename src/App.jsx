// Pages
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import RobotRequestPage from "./pages/RobotRequests.jsx";

// aesthetic
import "./App.css";

// modules/objects
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import supabase from "./api-connection/client.js";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, [navigate]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RobotRequestPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
