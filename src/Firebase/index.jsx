// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW-rOdx9N8Y896VFv5gkOL3u-nc47ihhI",
  authDomain: "detona-ralph-ranking.firebaseapp.com",
  projectId: "detona-ralph-ranking",
  storageBucket: "detona-ralph-ranking.appspot.com",
  messagingSenderId: "1052509867133",
  appId: "1:1052509867133:web:8672db44438c7359943514",
  measurementId: "G-1B1QQ5ZNP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore(app)
export const auth = getAuth(app)