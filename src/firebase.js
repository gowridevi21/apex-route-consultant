// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { storage };