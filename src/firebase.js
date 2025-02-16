// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAP4doixMxiRgFCDvQaDSo_EnjT_2Sxik",
  authDomain: "couponx-2001f.firebaseapp.com",
  projectId: "couponx-2001f",
  storageBucket: "couponx-2001f.firebasestorage.app",
  messagingSenderId: "1083996397560",
  appId: "1:1083996397560:web:d54d789c59c49b5850400d"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
