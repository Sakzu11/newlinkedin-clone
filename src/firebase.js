

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCNCC7bp-Y37NWJMl-7DxWDXQJGHiNJDZM",
  authDomain: "linkedin-clone-yt-29138.firebaseapp.com",
  projectId: "linkedin-clone-yt-29138",
  storageBucket: "linkedin-clone-yt-29138.firebasestorage.app",
  messagingSenderId: "735953835160",
  appId: "1:735953835160:web:21906bee09b0d8aca76ced",
  measurementId: "G-WH5SWH8NP6"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
 