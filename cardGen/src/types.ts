import { Timestamp } from "firebase/firestore";

export type Distinct<DistinctName, T> = T & { __TYPE__: DistinctName };

export type CardId = Distinct<"CardId", string>;
export type CardName = Distinct<"CardName", string>;

export type Fraction = "Zerg" | "Protoss" | "Terran";

export type Vespene = Distinct<"Vespene", number>;

export type CP = Distinct<"CP", number>;

export type Supply = Distinct<"Supply", number>;

export type ImageUrl = Distinct<"ImageUrl", string>;

export type Tag = Distinct<"Tag", string>;
export type Tags<S extends State> = S extends "Raw" ? string : Tag[];
export type Subfraction = Distinct<"Subfraction", string>;

export type Slots = {
  Support: Supply;
  Hero: Supply;
  Air: Supply;
  Elite: Supply;
  Core: Supply;
};
export type UnitType = keyof Slots | "Other";

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

export type Ability<S extends State> = {
  name: AbilityName;
  description: S extends "Parsed" ? AbilityDescription : RawAbilityDescription;
};

export type TacticalCard<S extends State> = {
  id: CardId;
  name: CardName;
  cost: Vespene;
  resource: CP;
  faction: Fraction;
  isFractionCard: boolean;
  isUnique: boolean;
  slots: Slots;
  timestamp: Timestamp;
  tags: Tags<S>;
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

export type Size<S extends State> = S extends "Raw" ? `${number}` : Distinct<"Size", number>;
export type Inches = Distinct<"Inches", number>;
export type Speed<S extends State> = S extends "Raw" ? `${Inches}` | `${Inches}/${Inches}` : {
    multipleModels: Inches;
    singleModel: Inches;
};
export type Roll<S extends State> = S extends "Raw" ? `${2 | 3 | 4 | 5 | 6}+` : Distinct<"Roll", 2 | 3 | 4 | 5 | 6>;
export type HP<S extends State> = S extends "Raw" ? `${number}` : Distinct<"HP", number>;
export type Shield<S extends State> = S extends "Raw" ? `${number}` : Distinct<"Shield", number>;
export type Keyword = Distinct<"Keyword", string>;
export type Keywords<S extends State> = S extends "Raw" ? string : Keyword[];

export type UnitStats<S extends State> = {
    size: Size<S>;
    speed: S extends "Raw" ? Speed<"Raw"> | "-" : Speed<"Parsed"> | undefined;
    evade: S extends "Raw" ? Roll<"Raw"> | "-" : Roll<"Parsed"> | undefined
    hp: HP<S>
    armor: Roll<S>
    shield: S extends "Raw" ? Shield<"Raw"> | "-" : Shield<"Parsed"> | undefined
}

export type UpgradeName = Distinct<"UpgradeName", string>;
export type PointsName = "Biomass"
export type Target = "Ground" | "All" | "Flying"
export type Die = "D3" | "D6"
export type SurgeType = "Light" | "Armoured"
export type SurgeDescription = `${SurgeType | `${SurgeType}, ${SurgeType}`} (${Die})`
export type RoA = Distinct<"RoA", number>;
export type DiceAmount = Distinct<"DiceAmount", number>;
export type WeaponDescription<S extends State> = S extends "Raw" ? `RANGE: ${Inches | "E"} | TARGET: ${Target} | RoA: ${RoA} | HIT: ${Roll<"Raw">} | DMG: ${number}\nSURGE: ${SurgeDescription | "-"}` : {
    range: Inches;
    target: Target;
    roa: RoA;
    hit: Roll<"Parsed">;
    dmg: number;
    surge?: {
        against: SurgeType[]
        die: Die
        /** E.g. +1 from D3+1 */
        plus: DiceAmount
    };
    keywords: Keywords<S>;
};
export type Activation<S extends State> = S extends "Raw" ? `<${AbilityType}>` | `<${AbilityType}>\n(${CP} ${PointsName})` : {
    type: AbilityType;
    /** Abilities like Raynor's "Orders" may have a cost of "X" */
    cost?: CP | "X";
};

export type UpgradeDescription<S extends State> = S extends "Raw" ? string | WeaponDescription<"Raw"> : string | WeaponDescription<"Parsed">;
export type LinkedTo<S extends State> = S extends "Raw" ? '' | '-' | UpgradeName : UpgradeName | '-' | undefined;

export type Upgrade<S extends State> = {
    name: UpgradeName;
    linkedTo: LinkedTo<S>;
    activation: S extends "Raw" ? Activation<"Raw"> | '' : Activation<"Parsed"> | undefined;
    phase: S extends "Raw" ? `${Phase} Phase` : Phase;
    /** Cost in large squar */
    costL: Minerals
    /** Cost in small squad */ 
    costS: Minerals
    description: UpgradeDescription<S>;
}

export type SquadProfile<S extends State> = {
    supply: Supply;
    tier: 1 | 2 | 3;
} & (S extends "Raw" ? {
    modelCount: `${ModelsAmount} - ${ModelsAmount}` | "-";
}: {
    minModels: ModelsAmount;
    maxModels: ModelsAmount;
})

export type UnitCard<S extends State> = {
    id: UnitId
    name: UnitName;
    unitType: UnitType;
    fraction: Fraction;
    tags: Tags<S>;
    combatRange: CombatRange;
    small: UnitProfile;
    large: UnitProfile;
    stats: UnitStats<S>;
    keywords: Keywords<S>;
    upgrades: Upgrade<S>[]
    squadProfile: SquadProfile<S>[];
}
