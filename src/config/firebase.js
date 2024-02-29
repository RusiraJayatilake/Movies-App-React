import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "movieappreact-9eaa9.firebaseapp.com",
  projectId: "movieappreact-9eaa9",
  storageBucket: "movieappreact-9eaa9.appspot.com",
  messagingSenderId: "552675141608",
  appId: "1:552675141608:web:c34a0081e66e9ef7f1a65d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };