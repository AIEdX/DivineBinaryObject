import { DBOAdvancedTypes, DBOPrimitiveTypes } from "./DBO.types";

export type MetaMarkedElementObject = Record<string, MetaMarkedElement>;
export type MetaMarkedElementObjectList = Record<string, MetaMarkedElement>[];
export type MetaMarkedElement = {
  type: number;
  listType?: DBOPrimitiveTypes;
  value:
    | string
    | number
    | MetaMarkedElementObject
    | MetaMarkedElementObjectList;
};

export type MMDMarks =
  | "start"
  | "end"
  | "name"
  | "object"
  | "object-start"
  | "object-end"
  | "array"
  | "array-start"
  | "array-end"
  | DBOPrimitiveTypes
  | DBOAdvancedTypes;
