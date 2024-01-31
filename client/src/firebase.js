// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-6529e.firebaseapp.com",
  projectId: "mern-blog-6529e",
  storageBucket: "mern-blog-6529e.appspot.com",
  messagingSenderId: "801290082420",
  appId: "1:801290082420:web:741291ac42e870ba045921"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
