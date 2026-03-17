import * as api from "./src/api";
import { postprocessTacticalCards } from "./src/postprocessing";

api.fetchTacticalCards().then((cards) => {
  const parsedCards = postprocessTacticalCards(cards);
  parsedCards.forEach((card) => {
    console.log(card.boosts);
  });
});
