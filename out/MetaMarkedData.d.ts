import { DBOPrimitiveTypes } from "index.js";
import { MMDNode } from "./Classes/MMDNode.js";
export declare const MMD: {
    parser: {
        toBuffer(data: MMDNode<any>): ArrayBuffer;
        toObject(buffer: ArrayBuffer): unknown;
    };
    object<T>(data: T): MMDNode<T>;
    array<T_1>(data: T_1): MMDNode<T_1>;
    _8i(value: number): MMDNode<number>;
    _8ui(value: number): MMDNode<number>;
    _16i(value: number): MMDNode<number>;
    _16ui(value: number): MMDNode<number>;
    _32ui(value: number): MMDNode<number>;
    _32i(value: number): MMDNode<number>;
    _32f(value: number): MMDNode<number>;
    _64f(value: number): MMDNode<number>;
    bigi(value: number): MMDNode<number>;
    bigui(value: number): MMDNode<number>;
    typedArray(type: DBOPrimitiveTypes, value: number[]): MMDNode<number[]>;
    string(value: string): MMDNode<string>;
};
