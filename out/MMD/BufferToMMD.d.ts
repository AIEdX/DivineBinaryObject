import type { MMDMarks } from "Meta/MMD.types.js";
export declare const BToMMD: {
    _cobj: any;
    _parents: any[];
    _objArray: never[];
    _name: string;
    _length: number;
    _objCount: number;
    _inOject: boolean;
    _assign(value: any): void;
    markFunctions: Record<MMDMarks, (dv: DataView, index: number) => number>;
    toObject<T>(buffer: ArrayBuffer): T;
};
