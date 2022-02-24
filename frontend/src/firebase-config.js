import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
//import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBm1YjqGO3_8VfH97Je0LIIUm62jT1ifVs",
  authDomain: "rafflehouse.firebaseapp.com",
  databaseURL: "https://rafflehouse-default-rtdb.firebaseio.com",
  projectId: "rafflehouse",
  storageBucket: "rafflehouse.appspot.com",
  messagingSenderId: "716022730545",
  appId: "1:716022730545:web:b27ef5ab1531953ffb2a10",
  measurementId: "G-PFKTX646E6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getFirestore(app);