import { DBObject, DBOAdvancedTypes, DBOElement } from "Meta/DBO.types";
export declare const DBO: {
    metaMarkedParser: {
        toBuffer(data: import("./Classes/MMDNode.js").MMDNode<any>): ArrayBuffer;
        toObject(buffer: ArrayBuffer): unknown;
    };
    schemas: Record<string, {
        length: number;
        schema: DBObject;
    }>;
    advancedElementSetFunctions: Record<DBOAdvancedTypes, (dv: DataView, byteCount: number, element: DBOElement) => number>;
    advancedElementGetFunctions: Record<DBOAdvancedTypes, (dv: DataView, byteCount: number, element: DBOElement, targetObject: any, name: string) => number>;
    getBuffer(length: number, SAB: boolean): ArrayBuffer;
    syncSABWtihBuffer(sab: SharedArrayBuffer, buffer: ArrayBuffer): void;
    sharedBufferToBuffer(sab: SharedArrayBuffer): ArrayBufferLike;
    registerSchema(id: string, schema: DBObject): void;
    _calculateSchemaLength(schema: DBObject): number;
    _calculateVariableSizeBuffer(schema: DBObject): number;
    getSchema(id: string): {
        length: number;
        schema: DBObject;
    };
    createObject<T>(schemaId: string, buffer: ArrayBuffer | SharedArrayBuffer | DataView): T;
    createBuffer(schemaId: string, updatedValues?: any): ArrayBuffer;
};
