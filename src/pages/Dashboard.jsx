import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Drawer } from "@mui/material";

//sab thik h ?

const UserInfoPanel = ({ open, onClose }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || "");
        setEmail(currentUser.email || "");
        
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setPhone(userData.phone || "");
          setPosition(userData.position || "");
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, db, navigate]);

  const handleUpdate = async () => {
    try {
      if (user) {
        await updateProfile(user, { displayName: name });
        await updateEmail(user, email);
        if (password) await updatePassword(user, password);

        await setDoc(doc(db, "users", user.uid), { phone, position }, { merge: true });
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.error("Update Error:", error.message);
      alert("Failed to update profile: " + error.message);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="w-96 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
        {user && (
          <div className="space-y-4">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
            <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded" />
            <input type="text" placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} className="w-full p-2 border rounded" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
            <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
            <button onClick={handleUpdate} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Save Changes</button>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default UserInfoPanel;
