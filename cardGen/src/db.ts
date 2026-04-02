import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebaseConfig.json";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "starcrafttmgbeta");
export default db;
