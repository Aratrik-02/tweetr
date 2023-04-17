import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA-E4GG4prevq_wBUgvgcXFVKxvFAsUg-Y",
  authDomain: "tweetr-56742.firebaseapp.com",
  projectId: "tweetr-56742",
  storageBucket: "tweetr-56742.appspot.com",
  messagingSenderId: "397143665600",
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);