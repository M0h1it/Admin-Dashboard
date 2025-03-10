// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhz_7F2hbLyWXxRaBrMrgj9npQ60GEj48",
  authDomain: "admin-dashboard-550f8.firebaseapp.com",
  projectId: "admin-dashboard-550f8",
  storageBucket: "admin-dashboard-550f8.firebasestorage.app",
  messagingSenderId: "573765813307",
  appId: "1:573765813307:web:935360550b6eb68600c81e",
  measurementId: "G-8CZ9PKSKGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();