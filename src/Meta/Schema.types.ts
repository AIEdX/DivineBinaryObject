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
  | "variable-length-string"
  | "variable-length-typed-list"
  | "meta-marked-data";

export type DBOScehemaElement = {
  type: DBOScehemaPrimitiveElementTypes | DBOScehemaAdvancedElementTypes;
  listType?: DBOScehemaPrimitiveElementTypes;
  length?: number;
  value: string | number | number[];
};
