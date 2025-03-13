import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Schedule from "./pages/Schedule";
import Chat  from "./pages/Chat";
import Materials from "./pages/Materials";
import Assessments from "./pages/Assessments";
import Settings from "./pages/Settings";

const App = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path= "/Courses" element={<Courses />} />
      <Route path="/Schedule" element={<Schedule/>} />
      <Route path="/Chat" element={<Chat/>} />
      <Route path="/Materials" element={<Materials/>} />
      <Route path="/Assessments" element={<Assessments/>} />
      <Route path="/Settings" element={<Settings/>} />
    </Routes>
  );
};

export default App;
