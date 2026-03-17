import { collection, getDocs, query } from "firebase/firestore";
import db from "./db";
import type { TacticalCard } from "./types";

export const fetchTacticalCards = async () => {
    const snapshot = await getDocs(query(collection(db, "tactical_cards")));    
    return snapshot.docs.map(doc => doc.data() as TacticalCard<"Raw">);
};

