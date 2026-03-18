import { collection, getDocs, query } from "firebase/firestore";
import db from "./db";
import type { TacticalCard, UnitCard } from "./types";

export const fetchTacticalCards = async () => {
  const snapshot = await getDocs(query(collection(db, "tactical_cards")));
  return snapshot.docs.map((doc) => doc.data() as TacticalCard<"Raw">);
};

export const fetchUnitCards = async () => {
  const snapshot = await getDocs(query(collection(db, "army_units")));
  return snapshot.docs.map((doc) => doc.data() as UnitCard<"Raw">);
};
