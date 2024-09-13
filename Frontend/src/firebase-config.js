import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyBmRI28EFBhyyFckg75JkKj0Ece4PRYDPU",
  authDomain: "edubridge-81cda.firebaseapp.com",
  projectId: "edubridge-81cda",
  storageBucket: "edubridge-81cda.appspot.com",
  messagingSenderId: "819003835457",
  appId: "1:819003835457:web:d4519deff9ad97a5b472c0",
  measurementId: "G-5KTWRWPKMJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); 

export { app, auth, db, storage };