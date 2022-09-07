export type DBOScehema = DBOScehemaElement[];
export type DBOCreateBufferData = Record<string,DBOCreateElement>;
export type DBOScehemaElementTypes =
  | "8-bit-int"
  | "8-bit-uint"
  | "16-bit-int"
  | "16-bit-uint"
  | "32-bit-float"
  | "32-bit-int"
  | "32-bit-uint"
  | "big-int"
  | "big-uint"
  | "list"
  | "string";

export type DBOScehemaElement = {
  name: string;
  type: DBOScehemaElementTypes;
  listType?: Exclude<DBOScehemaElementTypes, "list" | "string">;
  length?: number | "variable";
};

export type DBOCreateElement = {
  type: DBOScehemaElementTypes;
  listType?: Exclude<DBOScehemaElementTypes, "list" | "string">;
  value: number | string | number[];
  length?: number | "variable";
};
