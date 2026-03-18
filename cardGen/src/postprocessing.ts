import type { Ability, AbilityType, ModelsAmount, Phase, SquadProfile, TacticalCard, UnitCard } from "./types";

const postprocessAbility = (
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

export const postprocessTacticalCard = (
  card: TacticalCard<"Raw">,
): TacticalCard<"Parsed"> => {
  return {
    ...card,
    boosts: card.boosts.map(postprocessAbility),
  };
};

const postprocessSquadProfile = ({ modelCount, ...rest }: SquadProfile<"Raw">): SquadProfile<"Parsed"> => {
    if (modelCount === "-") {
        return {
            ...rest,
            minModels: 0 as ModelsAmount,
            maxModels: 0 as ModelsAmount,
        }
    }

    const [min, max] = modelCount.match(/(\d+) - (\d+)/)?.slice(1) ?? [];
    if (!min || !max) {
        throw new Error("Invalid model count: " + modelCount);
    }

    return {
        ...rest,
        minModels: parseInt(min) as ModelsAmount,
        maxModels: parseInt(max) as ModelsAmount,
    }
}

export const postprocessUnitCard = (card: UnitCard<"Raw">): UnitCard<"Parsed"> => {
    return {
        ...card,
        squadProfile: card.squadProfile.map(postprocessSquadProfile),
    }
}