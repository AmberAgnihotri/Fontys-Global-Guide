import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD6PUinsM68EspwyW5uhtJBliLtwwuz0MQ",
    authDomain: "fontys-global-guide.firebaseapp.com",
    projectId: "fontys-global-guide",
    storageBucket: "fontys-global-guide.firebasestorage.app",
    messagingSenderId: "211226555044",
    appId: "1:211226555044:web:3d111ed9f81604e09f6c31",
    measurementId: "G-4026W89B61"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);