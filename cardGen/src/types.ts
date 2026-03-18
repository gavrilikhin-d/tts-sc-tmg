import { Timestamp } from "firebase/firestore";

export type Distinct<DistinctName, T> = T & { __TYPE__: DistinctName };

export type CardId = Distinct<"CardId", string>;
export type CardName = Distinct<"CardName", string>;

export type Fraction = "Zerg" | "Protoss" | "Terran";

export type Vespene = Distinct<"Vespene", number>;

export type CP = Distinct<"CP", number>;

export type Supply = Distinct<"Supply", number>;

export type ImageUrl = Distinct<"ImageUrl", string>;

export type TagsString = Distinct<"TagsString", string>;
export type Subfraction = Distinct<"Subfraction", string>;

export type Slots = {
  Support: Supply;
  Hero: Supply;
  Air: Supply;
  Elite: Supply;
  Core: Supply;
};
export type UnitType = keyof Slots;

export type AbilityName = Distinct<"AbilityName", string>;
export type RawAbilityDescription = Distinct<"RawAbilityDescription", string>;

export type AbilityType = "Active" | "Passive" | "Reaction";
export type Phase = "Movement" | "Assault" | "Combat" | "Any";
export type AbilityDescription = {
  type: AbilityType;
  phase: Phase;
  description: string;
};

type State = "Raw" | "Parsed";

export type Ability<S extends State = "Parsed"> = {
  name: AbilityName;
  description: S extends "Parsed" ? AbilityDescription : RawAbilityDescription;
};

export type TacticalCard<S extends State = "Parsed"> = {
  id: CardId;
  name: CardName;
  cost: Vespene;
  resource: CP;
  faction: Fraction;
  isFractionCard: boolean;
  isUnique: boolean;
  slots: Slots;
  timestamp: Timestamp;
  tags: TagsString;
  fractionTags: Subfraction[];
  boosts: Ability<S>[];
  frontUrl?: ImageUrl;
};

export type UnitId = Distinct<"UnitId", string>;
export type UnitName = Distinct<"UnitName", string>;
export type CombatRange = Distinct<"CombatRange", string>;

export type Minerals = Distinct<"Minerals", number>;
export type ModelsAmount = Distinct<"ModelsAmount", number>;

export type UnitProfile = {
    supply: Supply;
    cost: Minerals;
    models: ModelsAmount;
}

export type Size = `${number}`;
export type Speed = `${number}/${number}`;
export type Roll = `${2 | 3 | 4 | 5 | 6}+`;
export type HP = Distinct<"HP", `${number}`>;
export type KeywordsString = Distinct<"KeywordsString", string>;

export type UnitStats = {
    size: Size;
    speed: Speed;
    evade: Roll | "-"
    hp: HP
    armor: Roll
}

export type UpgradeName = Distinct<"UpgradeName", string>;
export type PointsName = "Biomass"
export type Target = "Ground" | "Air" | "All"
export type Die = "D3" | "D6"
export type SurgeType = "Light" | "Armoured"
export type SurgeDescription = `${SurgeType | `${SurgeType}, ${SurgeType}`} (${Die})`
export type WeaponDescription = `RANGE: ${number} | TARGET: ${Target} | RoA: ${number} | HIT: ${Roll} | DMG: ${number}\nSURGE: ${SurgeDescription | "-"}`;
export type Upgrade = {
    name: UpgradeName;
    linkedTo: '' | '-' | UpgradeName;
    activation: `<${AbilityType}>` | `<${AbilityType}>\n(${CP} ${PointsName})`
    phase: `${Phase} Phase`
    /** Cost in large squar */
    costL: Minerals
    /** Cost in small squad */ 
    costS: Minerals
    description: string
}

export type SquadProfile<S extends State = "Parsed"> = {
    supply: Supply;
    tier: 1 | 2 | 3;
} & (S extends "Raw" ? {
    modelCount: `${ModelsAmount} - ${ModelsAmount}` | "-";
}: {
    minModels: ModelsAmount;
    maxModels: ModelsAmount;
})

export type UnitCard<S extends State = "Parsed"> = {
    id: UnitId
    name: UnitName;
    unitType: UnitType;
    fraction: Fraction;
    tags: TagsString;
    combatRange: CombatRange;
    small: UnitProfile;
    large: UnitProfile;
    stats: UnitStats;
    keywords: KeywordsString;
    upgrades: Upgrade[]
    squadProfile: SquadProfile<S>[];
}
