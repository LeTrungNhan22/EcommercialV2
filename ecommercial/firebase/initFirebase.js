// Modular Firebase v.9 Initialization.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "@firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const clientCredentials = {
  apiKey: "AIzaSyB8zQ8lA-LodYLgN2FdorAfXfsnEiCTXWc",
  authDomain: "storageimageweb.firebaseapp.com",
  projectId: "storageimageweb",
  storageBucket: "storageimageweb.appspot.com",
  messagingSenderId: "816436046329",
  appId: "1:816436046329:web:f6b4d2d9c6df1b9386f528",
  measurementId: "G-ER3DHD9G7H",
};

function initFirebase() {
  if (typeof window !== undefined) {
    initializeApp(clientCredentials);
    console.log("Firebase has been init successfully");
  }
}

const app = initializeApp(clientCredentials);
const db = getFirestore(app);
const realDB = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { initFirebase, db, realDB, storage, auth };
