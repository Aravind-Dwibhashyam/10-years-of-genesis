// filepath: src/utils/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Use your existing Firebase config
const firebaseConfig = {
 apiKey: "AIzaSyDogHgQgTKrDhgoW7nbqBPlBh5Jsq1ujuE",
  authDomain: "ethereum-trivia.firebaseapp.com",
  projectId: "ethereum-trivia",
  databaseURL: "https://ethereum-trivia-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "ethereum-trivia.firebasestorage.app",
  messagingSenderId: "545676208673",
  appId: "1:545676208673:web:754d81aaac8c0b8f115160",
  measurementId: "G-J4K7J83BVY"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);
export { app, auth, database, analytics };