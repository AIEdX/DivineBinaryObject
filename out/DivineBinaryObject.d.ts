import { DBOScehema } from "Meta/Schema.types";
export declare const DBO: {
    schemas: Record<string, {
        length: number;
        schema: DBOScehema;
    }>;
    elementGetFunctions: Record<"8-bit-int" | "8-bit-uint" | "16-bit-int" | "16-bit-uint" | "32-bit-float" | "32-bit-int" | "32-bit-uint" | "big-int" | "big-uint", (dv: DataView, index: number) => any>;
    elementSetFunctions: Record<"8-bit-int" | "8-bit-uint" | "16-bit-int" | "16-bit-uint" | "32-bit-float" | "32-bit-int" | "32-bit-uint" | "big-int" | "big-uint", (dv: DataView, index: number, value: number) => any>;
    elementByteCounts: Record<"8-bit-int" | "8-bit-uint" | "16-bit-int" | "16-bit-uint" | "32-bit-float" | "32-bit-int" | "32-bit-uint" | "big-int" | "big-uint", number>;
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
