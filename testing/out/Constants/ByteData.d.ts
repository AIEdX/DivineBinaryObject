import { DBOPrimitive } from "index";
export declare const ByteCounts: Record<DBOPrimitive, number>;
export declare const ByteDataGet: Record<DBOPrimitive, (dv: DataView, index: number) => number>;
export declare const ByteDataSet: Record<DBOPrimitive, (dv: DataView, index: number, value: number) => void>;
