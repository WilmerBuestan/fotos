// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5pRktceF3nRFe7rpVFL4M0Z7ekVA0h_s",
  authDomain: "foto-casa-abierta.firebaseapp.com",
  projectId: "foto-casa-abierta",
  storageBucket: "foto-casa-abierta.firebasestorage.app",
  messagingSenderId: "930991338838",
  appId: "1:930991338838:web:4c0c898873760e9b1ad2f7",
  measurementId: "G-X3JTSRSMFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);