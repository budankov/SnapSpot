import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

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
const auth = getAuth(app);

export { auth };
