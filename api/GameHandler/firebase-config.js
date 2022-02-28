const firebaseApp = require('firebase/app');
const firestore = require('@firebase/firestore')
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

const app = firebaseApp.initializeApp(firebaseConfig);

const db = firestore.getFirestore(app);
module.exports = {
  db
}