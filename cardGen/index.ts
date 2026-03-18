import * as api from "./src/api";
import { postprocessUnitCard } from "./src/postprocessing";

api.fetchUnitCards().then((cards) => {
    cards.map(postprocessUnitCard).forEach(card => {
        console.log(card)
        console.log(card.squadProfile);
        console.log(card.upgrades);
    });
});

