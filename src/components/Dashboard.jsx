import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Avatar, Drawer, TextField, Button, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || "");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSave = () => {
    setUser({ ...user, displayName: name });
    setOpenDrawer(false);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="font-bold">My Dashboard</Typography>
        {user && (
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setOpenDrawer(true)}>
            <Avatar src={user.photoURL || "https://via.placeholder.com/150"} alt="Profile" />
          </div>
        )}
      </Toolbar>

      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box className="w-96 p-6">
          {/* Top Bar with Title & Close Button */}
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h6" className="font-semibold">Account Settings</Typography>
            <IconButton onClick={() => setOpenDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Profile Image - Slightly Shifted Left */}
          <Box className="flex justify-start mb-4">
            <Avatar src={user?.photoURL || "https://via.placeholder.com/150"} alt="Profile" sx={{ width: 80, height: 80 }} />
          </Box>

          {/* User Info Fields */}
          <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Phone Number" fullWidth margin="normal" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <TextField label="Position" fullWidth margin="normal" value={position} onChange={(e) => setPosition(e.target.value)} />
          <TextField label="Email" fullWidth margin="normal" value={user?.email || ""} disabled />

          {/* Save Button */}
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSave}>Save</Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
