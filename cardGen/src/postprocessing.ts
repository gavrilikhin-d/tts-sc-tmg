import type { Ability, AbilityType, Activation, CP, HP, Inches, ModelsAmount, Phase, Roll, Shield, Size, Speed, SquadProfile, TacticalCard, UnitCard, UnitStats, Upgrade } from "./types";

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

const postprocessRoll = (roll: Roll<"Raw">): Roll<"Parsed"> => {
    return parseInt(roll.substring(0, 1)) as Roll<"Parsed">;
}

const postprocessSpeed = (speed: Speed<"Raw">): Speed<"Parsed"> => {
    const [, multipleModels, singleModel] =
        speed.replace(/\s+/g, "").match(/^(\d+)(?:\/(\d+))?$/) ?? [];
    if (!multipleModels) {
        throw new Error("Invalid speed: " + speed);
    }

    return {
        multipleModels: parseInt(multipleModels) as Inches,
        singleModel: parseInt(singleModel ?? multipleModels) as Inches,
    }
}

export const postprocessUnitStats = (stats: UnitStats<"Raw">): UnitStats<"Parsed"> => {
    return {
        size: parseInt(stats.size) as Size<"Parsed">,
        speed: stats.speed === "-" ? undefined : postprocessSpeed(stats.speed),
        evade: stats.evade === "-" ? undefined : postprocessRoll(stats.evade),
        hp: parseInt(stats.hp) as HP<"Parsed">,
        armor: postprocessRoll(stats.armor),
        shield: stats.shield === "-" ? undefined : parseInt(stats.shield) as Shield<"Parsed">,
    }
}

export const postprocessActivation = (activation: Activation<"Raw">): Activation<"Parsed"> => {
    const normalized = activation.replace(/[ \n<>()]/g, "");
    const [, type, cost] =
        normalized.match(/^(Active|Passive|Reaction)(?:(X|\d+).*)?$/) ?? [];
    if (!type) {
        throw new Error("Invalid activation: " + activation);
    }

    if (cost === "X") {
        return {
            type: type as AbilityType,
            cost: "X",
        }
    }

    return {
        type: type as AbilityType,
        cost: cost ? parseInt(cost) as CP : undefined,
    }
}

export const postprocessUpgrade = (upgrade: Upgrade<"Raw">): Upgrade<"Parsed"> => {
    const phase = upgrade.phase.match(/^(Movement|Assault|Combat|Any) Phase$/)?.[1]
    if (!phase) {
        throw new Error("Invalid phase: " + upgrade.phase);
    }

    return {
        ...upgrade,
        activation: upgrade.activation ? postprocessActivation(upgrade.activation) : undefined,
        phase: phase as Phase,
    }
}

export const postprocessUnitCard = (card: UnitCard<"Raw">): UnitCard<"Parsed"> => {
    return {
        ...card,
        stats: postprocessUnitStats(card.stats),
        squadProfile: card.squadProfile.map(postprocessSquadProfile),
        upgrades: card.upgrades.map(postprocessUpgrade),
    }
}