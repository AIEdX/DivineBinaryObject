import { DBOScehema, DBOScehemaPrimitiveElementTypes, DBOScehemaAdvancedElementTypes, DBOScehemaElement } from "Meta/Schema.types";
export declare const DBO: {
    schemas: Record<string, {
        length: number;
        schema: DBOScehema;
    }>;
    elementByteCounts: Record<DBOScehemaPrimitiveElementTypes, number>;
    elementGetFunctions: Record<DBOScehemaPrimitiveElementTypes, (dv: DataView, index: number) => any>;
    elementSetFunctions: Record<DBOScehemaPrimitiveElementTypes, (dv: DataView, index: number, value: number) => any>;
    advancedElementSetFunctions: Record<DBOScehemaAdvancedElementTypes, (dv: DataView, byteCount: number, element: DBOScehemaElement) => number>;
    advancedElementGetFunctions: Record<DBOScehemaAdvancedElementTypes, (dv: DataView, byteCount: number, element: DBOScehemaElement, targetObject: any, name: string) => number>;
    getBuffer(length: number, SAB: boolean): ArrayBuffer;
    syncSABWtihBuffer(sab: SharedArrayBuffer, buffer: ArrayBuffer): void;
    sharedBufferToBuffer(sab: SharedArrayBuffer): ArrayBufferLike;
    registerSchema(id: string, schema: DBOScehema): void;
    _calculateSchemaLength(schema: DBOScehema): number;
    getSchema(id: string): {
        length: number;
        schema: DBOScehema;
    };
    createObject<T>(schemaId: string, buffer: ArrayBuffer | SharedArrayBuffer | DataView): T;
    _calculateVariableSizeBuffer(scehma: DBOScehema): number;
    createBuffer(schemaId: string, updatedValues?: any): ArrayBuffer;
};
