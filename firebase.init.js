// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACupR2GPxmR__kRd__Tk91ErW2spTGbw0",
  authDomain: "medi-camp-5c833.firebaseapp.com",
  projectId: "medi-camp-5c833",
  storageBucket: "medi-camp-5c833.firebasestorage.app",
  messagingSenderId: "785493036860",
  appId: "1:785493036860:web:5ed72af8aee04a3e8a9839"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
