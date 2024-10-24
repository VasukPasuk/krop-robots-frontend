type EnumUnion<E> = E[keyof E];

export enum Plastic {
  CoPET = "CoPET",
  PLA = "PLA",
}

export type PlasticType = EnumUnion<typeof Plastic>;
