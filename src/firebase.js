import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDioa6dQt0RrsxKoz1pmiWOivqWa37UKdA",
  authDomain: "apex-route-website.firebaseapp.com",
  projectId: "apex-route-website",
  storageBucket: "apex-route-website.firebasestorage.app",
  messagingSenderId: "547865633571",
  appId: "1:547865633571:web:f7eb187c8f083b6838e296",
  measurementId: "G-9MV99CHP39",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);