import { DBOARich } from "Meta/DBO.types";
export declare const DBO: {
    metaMarkedParser: {
        toBuffer(data: import("./Classes/TypedNode.js").TypedNode<any>): ArrayBuffer;
        toObject<T>(buffer: ArrayBuffer, byteOffSet?: number): T;
        toMMD<T_1>(buffer: ArrayBuffer, byteOffSet?: number, byteOffSetEnd?: number): import("./Classes/TypedNode.js").TypedNode<T_1>;
        toToekns(data: import("./Classes/TypedNode.js").TypedNode<any>): [([number, number] | [number, -1, string] | [number, -2, number[]] | [number, -3, string[]])[], number];
        toeknsToBuffer(data: any, size: number, buffer: ArrayBuffer, byteOffSet?: number): void;
    };
    parser: {
        mmdTokens: any[];
        jsonStrings: string[];
        schemas: Record<string, {
            length: number;
            schema: {
                [x: string]: import("./Classes/TypedNode.js").TypedNode<any>;
            };
        }>;
        advancedElementSetFunctions: Record<DBOARich, (dv: DataView, byteCount: number, element: import("./Classes/TypedNode.js").TypedNode<any>) => number>;
        advancedElementGetFunctions: Record<DBOARich, (dv: DataView, byteCount: number, element: import("./Classes/TypedNode.js").TypedNode<any>, targetObject: any, name: string) => number>;
        getBuffer(length: number, SAB: boolean): ArrayBuffer;
        syncSABWtihBuffer(sab: SharedArrayBuffer, buffer: ArrayBuffer): void;
        sharedBufferToBuffer(sab: SharedArrayBuffer): ArrayBufferLike;
        registerSchema(id: string, schema: {
            [x: string]: import("./Classes/TypedNode.js").TypedNode<any>;
        }): void;
        _calculateSchemaLength(schema: {
            [x: string]: import("./Classes/TypedNode.js").TypedNode<any>;
        }): number;
        _calculateVariableSizeBuffer(schema: {
            [x: string]: import("./Classes/TypedNode.js").TypedNode<any>;
        }): number;
        getSchema(id: string): {
            length: number;
            schema: {
                [x: string]: import("./Classes/TypedNode.js").TypedNode<any>;
            };
        };
        createObject<T_2>(schemaId: string, buffer: DataView | ArrayBuffer | SharedArrayBuffer): T_2;
        createBuffer(schemaId: string, updatedValues?: any): ArrayBuffer;
    };
};
