// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhz_7F2hbLyWXxRaBrMrgj9npQ60GEj48",
  authDomain: "admin-dashboard-550f8.firebaseapp.com",
  projectId: "admin-dashboard-550f8",
  storageBucket: "admin-dashboard-550f8.appspot.com",
  messagingSenderId: "573765813307",
  appId: "1:573765813307:web:935360550b6eb68600c81e",
  measurementId: "G-8CZ9PKSKGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Only this! No extra import statement
export { app, db, storage, auth, provider };
