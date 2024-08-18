import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCDiymVjmLSy1AFf4TmmhGjqtO_665GKRM",
    authDomain: "gideys-manga-store.firebaseapp.com",
    projectId: "gideys-manga-store",
    storageBucket: "gideys-manga-store.appspot.com",
    messagingSenderId: "64285146225",
    appId: "1:64285146225:web:b779484f88ec37b0a52fd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);