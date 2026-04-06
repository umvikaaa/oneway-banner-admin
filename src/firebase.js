import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7cjGRtgaxCcqFDjzzILGRMgfkOoK9bDs",
  authDomain: "oneway-banner-admin.firebaseapp.com",
  projectId: "oneway-banner-admin",
  storageBucket: "oneway-banner-admin.firebasestorage.app",
  messagingSenderId: "591545680926",
  appId: "1:591545680926:web:7b6823249bfeb2d2599a0f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
