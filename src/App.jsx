import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Courses from "./pages/Courses";


const App = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path= "/Courses" element={<Courses />} />
    </Routes>
  );
};

export default App;
