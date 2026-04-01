import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsEhxCavhC4RT6B8w2dSxarOPfO0Udax4",
  authDomain: "banner-edit.firebaseapp.com",
  projectId: "banner-edit",
  storageBucket: "banner-edit.firebasestorage.app",
  messagingSenderId: "94783589813",
  appId: "1:94783589813:web:bf93e9b69a01fa78041dfc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
