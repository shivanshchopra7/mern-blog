// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-6d251.firebaseapp.com",
  projectId: "mern-blog-6d251",
  storageBucket: "mern-blog-6d251.appspot.com",
  messagingSenderId: "408621940465",
  appId: "1:408621940465:web:abfcdb7a5f9b9e73ba7350"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

