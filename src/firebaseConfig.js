// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA_fbIkOCuvaLc5j5WHGXv5R_ptdG8aEvU",
    authDomain: "smsnxt-821af.firebaseapp.com",
    projectId: "smsnxt-821af",
    storageBucket: "smsnxt-821af.firebasestorage.app",
    messagingSenderId: "664399274432",
    appId: "1:664399274432:web:789c2ad73aeffc2009e825",
    measurementId: "G-85LZ6S059E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
