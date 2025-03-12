import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Schedule from "./pages/Schedule";
import Chat  from "./pages/Chat";
import Materials from "./pages/Materials";

const App = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path= "/Courses" element={<Courses />} />
      <Route path="/Schedule" element={<Schedule/>} />
      <Route path="/Chat" element={<Chat/>} />
      <Route path="/Materials" element={<Materials/>} />
    </Routes>
  );
};

export default App;
