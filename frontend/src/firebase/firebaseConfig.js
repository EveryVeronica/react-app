// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAghrJeehIFZk5muYAGtV6Wx-z3pZLTNIg",
  authDomain: "react-app-814e7.firebaseapp.com",
  projectId: "react-app-814e7",
  storageBucket: "react-app-814e7.appspot.com",
  messagingSenderId: "722417538879",
  appId: "1:722417538879:web:4f2ce7788c74cb9698258a",
  measurementId: "G-Q0C48KTLLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);