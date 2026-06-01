// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjE-_d-UsuRp_wt2hfl6iDUsijZ0KgrtY",
  authDomain: "apex-route-website-ee028.firebaseapp.com",
  projectId: "apex-route-website-ee028",
  storageBucket: "apex-route-website-ee028.firebasestorage.app",
  messagingSenderId: "363309109942",
  appId: "1:363309109942:web:f2b471d12aa3f62f550c17",
  measurementId: "G-FDZQSFPMY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);