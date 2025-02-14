import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAP4doixMxiRgFCDvQaDSo_EnjT_2Sxik",
  authDomain: "couponx-2001f.firebaseapp.com",
  projectId: "couponx-2001f",
  storageBucket: "couponx-2001f.firebasestorage.app",
  messagingSenderId: "1083996397560",
  appId: "1:1083996397560:web:d54d789c59c49b5850400d"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; // ✅ Ensure you are exporting db
