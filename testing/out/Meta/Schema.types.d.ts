export declare type DBOScehema = Record<string, DBOScehemaElement>;
export declare type DBOScehemaElementTypes = "8-bit-int" | "8-bit-uint" | "16-bit-int" | "16-bit-uint" | "32-bit-float" | "32-bit-int" | "32-bit-uint" | "big-int" | "big-uint" | "list" | "string";
export declare type DBOScehemaElement = {
    type: DBOScehemaElementTypes;
    listType?: Exclude<DBOScehemaElementTypes, "list" | "string">;
    length?: number | "variable";
    value: string | number;
};
