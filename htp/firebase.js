// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCARFKDN65V5GJtbjlXzyfz9b9p5nqMHLg",
  authDomain: "htp-analyzer.firebaseapp.com",
  databaseURL: "https://htp-analyzer-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "htp-analyzer",
  storageBucket: "htp-analyzer.appspot.com",
  messagingSenderId: "445989100136",
  appId: "1:445989100136:web:528ba4b8d93b4e3d5479dd",
  measurementId: "G-R46Q30FE6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);