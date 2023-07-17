// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0O9N-cLcQBYZX3phNuBmN_Cdss2sXlbU",
  authDomain: "test-30001.firebaseapp.com",
  projectId: "test-30001",
  storageBucket: "test-30001.appspot.com",
  messagingSenderId: "620538213056",
  appId: "1:620538213056:web:c83e0e55064e65f8a87325"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
