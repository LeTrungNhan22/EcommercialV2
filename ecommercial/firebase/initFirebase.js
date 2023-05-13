// Modular Firebase v.9 Initialization.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "@firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const clientCredentials = {
  apiKey: "AIzaSyBZNXkaHOrAeOfgsWu4oJc8jTEiQy2zr6A",
  authDomain: "tmdtnextjs.firebaseapp.com",
  projectId: "tmdtnextjs",
  storageBucket: "tmdtnextjs.appspot.com",
  messagingSenderId: "827078015447",
  appId: "1:827078015447:web:e976b4f4452a87970cf392",
  measurementId: "G-ZR0G65N733"
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
