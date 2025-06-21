import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD1342l7XO_izcVDqsUmOoCrSy02enwklk",
  authDomain: "snapspot-87db0.firebaseapp.com",
  projectId: "snapspot-87db0",
  storageBucket: "snapspot-87db0.firebasestorage.app",
  messagingSenderId: "289360853950",
  appId: "1:289360853950:web:335eeb11586b7245aa97ef",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
