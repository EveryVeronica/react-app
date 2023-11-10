// Firebase SDK v9+
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAghrJeehIFZk5muYAGtV6Wx-z3pZLTNIg",
  authDomain: "react-app-814e7.firebaseapp.com",
  projectId: "react-app-814e7",
  storageBucket: "react-app-814e7.appspot.com",
  messagingSenderId: "722417538879",
  appId: "1:722417538879:web:4f2ce7788c74cb9698258a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
