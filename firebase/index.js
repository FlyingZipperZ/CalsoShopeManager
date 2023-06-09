import { initilizedApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore";

const firebaseApp = initilizedApp({
  apiKey: "AIzaSyBwY1VXe0nr9xEfWMvDlUippTsIfSSvuoA",
  authDomain: "shop-manager-d9c60.firebaseapp.com",
  projectId: "shop-manager-d9c60",
  storageBucket: "shop-manager-d9c60.appspot.com",
  messagingSenderId: "400418613996",
  appId: "",
});

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

a;
