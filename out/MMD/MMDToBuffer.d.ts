import { MMDNode } from "../Classes/MMDNode.js";
declare type MMDToken = [number, number] | [number, -1, string] | [number, -2, number[]];
export declare const MMDToBuffer: {
    _tokens: MMDToken[];
    metaValues: Record<import("../Meta/MMD.types.js").MMDMarks, number>;
    metaMapValues: Record<number, import("../Meta/MMD.types.js").MMDMarks>;
    _tokenizeString(string: string): void;
    _traverseObj(data: MMDNode<any>, size: number): number;
    _traverseArray(data: MMDNode<any>, size: number): number;
    _tokenizePrimiives(node: MMDNode<any>, size: number): number;
    _tokenize(data: MMDNode<any>): number;
    toBuffer(data: MMDNode<any>): ArrayBuffer;
    _addMarker(value: number): void;
    _addToken(dataType: number, value: number): void;
};
export {};
