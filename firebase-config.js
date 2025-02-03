// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc0E6G_zM79p2wVJDgm8bX1tzaWb8_OuE",
  authDomain: "market-fb791.firebaseapp.com",
  projectId: "market-fb791",
  storageBucket: "market-fb791.firebasestorage.app",
  messagingSenderId: "953599307663",
  appId: "1:953599307663:web:26310a3a55746a8ca625fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Export Firestore and Storage references for use in other files
export { db, storage };
