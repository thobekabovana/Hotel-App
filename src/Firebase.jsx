// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDol0S2XePySCINIUSdCuBHhvZUcIAGo5o",
  authDomain: "hotel-app-95d63.firebaseapp.com",
  projectId: "hotel-app-95d63",
  storageBucket: "hotel-app-95d63.appspot.com",
  messagingSenderId: "1057692196388",
  appId: "1:1057692196388:web:67d1a6958f184fa82a02b1",
  measurementId: "G-09VCPYF58L"
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
//   const auth = getAuth(app)

  export const auth=getAuth();
  export const db=getFirestore(app);
  export default app;
  export const storage = getStorage(app)