

import { initializeApp } from "firebase/app";

import {getFirestore} from "@firebase/firestore"

import { getStorage,ref } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyDWjlFDr0-qVtTCpQKy423lloIy8BTwImk",

  authDomain: "crud-react-5439a.firebaseapp.com",

  projectId: "crud-react-5439a",

  storageBucket: "crud-react-5439a.appspot.com",

  messagingSenderId: "323111630180",

  appId: "1:323111630180:web:1057c473c9c38767a93671",

  measurementId: "G-503Z0BNY2K"

};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app,"gs://crud-react-5439a.appspot.com");
// const storageref = ref(storage);
export { db, storage,ref };