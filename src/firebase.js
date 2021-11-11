import { initializeApp } from 'firebase/app'; 
import {getAuth} from "firebase/auth";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig ={
    apiKey: "AIzaSyBJQaGPESpG-vlcnpajwa3IY0J6MNUIdYg",
    authDomain: "shoponwheel-7028e.firebaseapp.com",
    projectId: "shoponwheel-7028e",
    storageBucket: "shoponwheel-7028e.appspot.com",
    messagingSenderId: "19733146857",
    appId: "1:19733146857:web:c6c2922a42542629f95478",
    measurementId: "G-Z1SC657WQG"
}

const app= initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const db= getFirestore(app);


