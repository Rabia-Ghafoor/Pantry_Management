// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdi2IG3bj0tqbsAOb31kOq63kWzjIXqoY",
  authDomain: "pantry-management-fe785.firebaseapp.com",
  projectId: "pantry-management-fe785",
  storageBucket: "pantry-management-fe785.appspot.com",
  messagingSenderId: "196321855079",
  appId: "1:196321855079:web:38a00bee136109405476c2",
  measurementId: "G-G6FJ33SHDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { app, firestore }


// firebase.js or firebase.ts



const auth = getAuth(app);

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const signOut = () => {
    return firebaseSignOut(auth);
};
