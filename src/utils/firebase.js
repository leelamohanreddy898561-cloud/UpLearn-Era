// Firebase initialization — UpLearn Era web app.
// Config was created with: firebase apps:create web "UpLearn Era Web"
// (project uplearn-era).

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKYW5ubQC7Mj5izZKjmkneflDFqTzptFE",
  authDomain: "uplearn-era.firebaseapp.com",
  projectId: "uplearn-era",
  storageBucket: "uplearn-era.firebasestorage.app",
  messagingSenderId: "430907040996",
  appId: "1:430907040996:web:aab4afef532ab809ca78f1",
  measurementId: "",
};

export const FIREBASE_READY = Boolean(firebaseConfig.apiKey && firebaseConfig.appId);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
