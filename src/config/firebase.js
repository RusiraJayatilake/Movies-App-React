import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC8IpxN8YehEi9lW8DdPX1wMRHWU8-uanw",
  authDomain: "movieappreact-9eaa9.firebaseapp.com",
  projectId: "movieappreact-9eaa9",
  storageBucket: "movieappreact-9eaa9.appspot.com",
  messagingSenderId: "552675141608",
  appId: "1:552675141608:web:c34a0081e66e9ef7f1a65d"
};

// Initialize Firebase
const db = initializeApp(firebaseConfig);

module.exports = db;