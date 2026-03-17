import type { Ability, AbilityType, Phase, TacticalCard } from "./types";

export const postprocessAbility = (
  ability: Ability<"Raw">,
): Ability<"Parsed"> => {
  const prefixLength = ability.description.indexOf(":");
  if (prefixLength === -1) {
    throw new Error("Invalid ability description: " + ability.description);
  }

  const prefix = ability.description.substring(0, prefixLength);
  const match = prefix.match(
    /.* <(Active|Passive|Reaction)> <(Movement|Assault|Combat|Any) Phase>/,
  );
  const [, type, phase] = match ?? [];
  if (!type || !phase) {
    throw new Error("Invalid ability description: " + ability.description);
  }

  return {
    ...ability,
    description: {
      type: type as AbilityType,
      phase: phase as Phase,
      description: ability.description.substring(prefixLength + 1).trim(),
    },
  };
};

export const postprocessTacticalCards = (
  cards: TacticalCard<"Raw">[],
): TacticalCard<"Parsed">[] => {
  return cards.map((card) => ({
    ...card,
    boosts: card.boosts.map(postprocessAbility),
  }));
};
