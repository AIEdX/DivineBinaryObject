export declare type DBObject = Record<string, DBOElement>;
export declare type DBOPrimitiveTypes = "8i" | "8ui" | "16i" | "16ui" | "32f" | "32i" | "32ui" | "64f" | "bigi" | "bigui";
export declare type DBOAdvancedTypes = "fixed-typed-array" | "fixed-string" | "string" | "typed-array" | "mmd";
export declare type DBOElement = {
    type: DBOPrimitiveTypes | DBOAdvancedTypes;
    listType?: DBOPrimitiveTypes;
    length?: number;
    value: string | number | number[];
};
