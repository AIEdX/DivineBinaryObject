export type DBOScehema = Record<string, DBOScehemaElement>;
export type DBOScehemaPrimitiveElementTypes =
  | "8-bit-int"
  | "8-bit-uint"
  | "16-bit-int"
  | "16-bit-uint"
  | "32-bit-float"
  | "32-bit-int"
  | "32-bit-uint"
  | "big-int"
  | "big-uint";

export type DBOScehemaAdvancedElementTypes =
  | "fixed-length-typed-list"
  | "fixed-length-string"
  | "meta-marked-data";

export type DBOScehemaElement = {
  type: DBOScehemaPrimitiveElementTypes | DBOScehemaAdvancedElementTypes;
  listType?: Exclude<
    DBOScehemaPrimitiveElementTypes,
    "fixed-length-typed-list" | "fixed-length-string"
  >;
  length?: number;
  value: string | number | number[];
};
