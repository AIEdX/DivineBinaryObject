import { DBOPrimitiveTypes } from "index";
export declare const ByteCounts: Record<DBOPrimitiveTypes, number>;
export declare const ByteDataGet: Record<DBOPrimitiveTypes, (dv: DataView, index: number) => number>;
export declare const ByteDataSet: Record<DBOPrimitiveTypes, (dv: DataView, index: number, value: number) => void>;
