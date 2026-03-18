import type { Ability, AbilityType, Activation, CP, DiceAmount, Die, HP, Inches, Keyword, ModelsAmount, Phase, RoA, Roll, Shield, Size, Speed, SquadProfile, SurgeType, TacticalCard, Tag, Target, UnitCard, UnitStats, Upgrade, UpgradeDescription } from "./types";

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
    tags: card.tags.split(",").map(k => k.trim() as Tag),
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

const postprocessUnitStats = (stats: UnitStats<"Raw">): UnitStats<"Parsed"> => {
    return {
        size: parseInt(stats.size) as Size<"Parsed">,
        speed: stats.speed === "-" ? undefined : postprocessSpeed(stats.speed),
        evade: stats.evade === "-" ? undefined : postprocessRoll(stats.evade),
        hp: parseInt(stats.hp) as HP<"Parsed">,
        armor: postprocessRoll(stats.armor),
        shield: stats.shield === "-" ? undefined : parseInt(stats.shield) as Shield<"Parsed">,
    }
}

const postprocessActivation = (activation: Activation<"Raw">): Activation<"Parsed"> => {
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

const postprocessUpgradeDescription = (description: UpgradeDescription<"Raw">): UpgradeDescription<"Parsed"> => {
    if (!description.startsWith("RANGE:")) {
        return description;
    }

    const normalized = description.replace(/\n/g, " | ");

    const [, range, target, roa, hit, dmg, surge, keywords] =
        normalized.match(
            /^RANGE:\s*(E|\d+)\s*\|\s*TARGET:\s*(Ground|All|Flying)\s*\|\s*RoA:\s*(\d+)\s*\|\s*HIT:\s*([2-6])\+\s*\|\s*DMG:\s*(\d+)\s*\|\s*SURGE:\s*([^|]+?)(?:\s*\|\s*\|\s*(.*))?$/,
        ) ?? [];
    if (!range || !target || !roa || !hit || !dmg || !surge) {
        throw new Error("Invalid upgrade description: " + normalized);
    }

    
    return {
        range: range === "E" ? 0 as Inches : parseInt(range) as Inches,
        target: target as Target,
        roa: parseInt(roa) as RoA,
        hit: parseInt(hit) as Roll<"Parsed">,
        dmg: parseInt(dmg),
        surge: surge.trim() === "-" ? undefined : {
            against: (surge.match(/^(Light|Armoured)(?:,\s*(Light|Armoured))?/)?.slice(1).filter(Boolean) ?? []) as SurgeType[],
            die: (surge.match(/\((D3|D6)(?:\+\d+)?\)/)?.[1] ?? "D3") as Die,
            plus: parseInt(surge.match(/\((?:D3|D6)\+(\d+)\)/)?.[1] ?? "0") as DiceAmount,
        },
        keywords: keywords?.trim().split(",").map(k => k.trim() as Keyword) ?? [],
    }
}

export const postprocessUpgrade = (upgrade: Upgrade<"Raw">): Upgrade<"Parsed"> => {
    const phase = upgrade.phase.match(/^(Movement|Assault|Combat|Any) Phase$/)?.[1]
    if (!phase) {
        throw new Error("Invalid phase: " + upgrade.phase);
    }

    return {
        ...upgrade,
        linkedTo: upgrade.linkedTo === "" ? undefined : upgrade.linkedTo,
        description: postprocessUpgradeDescription(upgrade.description),
        activation: upgrade.activation ? postprocessActivation(upgrade.activation) : undefined,
        phase: phase as Phase,
    }
}

export const postprocessUnitCard = (card: UnitCard<"Raw">): UnitCard<"Parsed"> => {
    return {
        ...card,
        tags: card.tags.split(",").map(k => k.trim() as Tag),
        keywords: card.keywords.split(",").map(k => k.trim() as Keyword),
        stats: postprocessUnitStats(card.stats),
        squadProfile: card.squadProfile.map(postprocessSquadProfile),
        upgrades: card.upgrades.map(postprocessUpgrade),
    }
}