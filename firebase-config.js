// Import Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "market-fb791.firebaseapp.com",
    projectId: "market-fb791",
    storageBucket: "market-fb791.appspot.com",
    messagingSenderId: "953599307663",
    appId: "1:953599307663:web:26310a3a55746a8ca625fa"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();



