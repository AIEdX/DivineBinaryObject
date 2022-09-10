import { DBOAdvancedTypes, DBOPrimitiveTypes } from "./DBO.types";
export declare type MetaMarkedElementObject = Record<string, MetaMarkedElement>;
export declare type MetaMarkedElementObjectList = Record<string, MetaMarkedElement>[];
export declare type MetaMarkedElement = {
    type: number;
    listType?: DBOPrimitiveTypes;
    value: string | number | MetaMarkedElementObject | MetaMarkedElementObjectList;
};
export declare type MMDMarks = "start" | "end" | "name" | "object" | "object-start" | "object-end" | "array" | "array-start" | "array-end" | DBOPrimitiveTypes | DBOAdvancedTypes;
