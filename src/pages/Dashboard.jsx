import { useState, useEffect } from "react";
import { AppBar, Toolbar, Avatar, Drawer, TextField, Button, Box, IconButton, InputBase, Menu, MenuItem } from "@mui/material";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DescriptionIcon from "@mui/icons-material/Description";
import ForumIcon from "@mui/icons-material/Forum";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardContent from "../components/DashboardContent";
import LessonPage from "./Courses"; // ✅ Import LessonPage

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSection, setSelectedSection] = useState("Dashboard");

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || "");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-white-900 text-black flex flex-col p-4 shadow-2xl">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="flex-1">
          {[
            { icon: <DashboardIcon />, label: "Dashboard" },
            { icon: <MenuBookIcon />, label: "Courses" }, // ✅ Added LessonPage
            { icon: <ScheduleIcon />, label: "Schedule" },
            { icon: <DescriptionIcon />, label: "Materials" },
            { icon: <ForumIcon />, label: "Forum" },
            { icon: <AssessmentIcon />, label: "Assessments" },
            { icon: <SettingsIcon />, label: "Settings" },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-2 cursor-pointer hover:bg-blue-200 rounded-lg ${
                selectedSection === item.label ? "bg-blue-300" : ""
              }`}
              onClick={() => setSelectedSection(item.label)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
        <div
          className="flex items-center space-x-3 p-2 cursor-pointer hover:bg-blue-200 rounded-lg mt-auto"
          onClick={handleLogout}
        >
          <LogoutIcon />
          <span>Log Out</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-.5 flex-1 bg-white-900">
        <AppBar position="static" className="bg-white-900 shadow-md border-gray-300">
          <Toolbar className="flex justify-between px-4 bg-white-900">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-200 rounded-xl px-3 py-1 w-1/4 h-9">
              <SearchIcon className="text-gray-500" />
              <InputBase placeholder="Search..." className="ml-2 w-full" />
            </div>

            {/* Icons & Profile */}
            <div className="flex items-center space-x-4 ">
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <LanguageIcon className="text-gray-700" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuItem onClick={() => setAnchorEl(null)}>English</MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>Spanish</MenuItem>
              </Menu>
              <IconButton>
                <MailOutlineIcon className="text-gray-700" />
              </IconButton>
              <IconButton>
                <NotificationsIcon className="text-gray-700" />
              </IconButton>
              {user && (
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setOpenDrawer(true)}>
                  <Avatar src={user.photoURL || "https://via.placeholder.com/150"} alt="Profile" />
                  <span className="font-medium text-gray-700">{user.displayName}</span>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>

        {/* Profile Drawer */}
        <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <Box className="w-96 p-6">
            <Box className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Account Settings</h2>
              <IconButton onClick={() => setOpenDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box className="flex justify-start mb-4">
              <Avatar src={user?.photoURL || "https://via.placeholder.com/150"} alt="Profile" sx={{ width: 80, height: 80 }} />
            </Box>
            <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Phone Number" fullWidth margin="normal" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <TextField label="Position" fullWidth margin="normal" value={position} onChange={(e) => setPosition(e.target.value)} />
            <TextField label="Email" fullWidth margin="normal" value={user?.email || ""} disabled />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => setOpenDrawer(false)}>
              Save
            </Button>
          </Box>
        </Drawer>

        {/* Dynamic Content */}
        <div className="p-4">
          {selectedSection === "Courses" ? <LessonPage /> : <DashboardContent selectedSection={selectedSection} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
