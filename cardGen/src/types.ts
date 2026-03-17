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
