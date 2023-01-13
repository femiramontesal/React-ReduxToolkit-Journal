// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1zck0x-gHNcWrslIW-3BAM20e8t9diM0",
  authDomain: "react-cursos-e2cb2.firebaseapp.com",
  projectId: "react-cursos-e2cb2",
  storageBucket: "react-cursos-e2cb2.appspot.com",
  messagingSenderId: "863156893345",
  appId: "1:863156893345:web:e67436c2f56efebeb462e0",
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
