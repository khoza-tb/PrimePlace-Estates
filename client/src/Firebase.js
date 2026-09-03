// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "primeplaceestate.firebaseapp.com",
  projectId: "primeplaceestate",
  storageBucket: "primeplaceestate.firebasestorage.app",
  messagingSenderId: "908408857144",
  appId: "1:908408857144:web:1fef26b5801257198a7ccd"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);