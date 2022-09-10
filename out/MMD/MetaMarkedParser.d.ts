import { MMDNode } from "../Classes/MMDNode.js";
export declare const MMDP: {
    toBuffer(data: MMDNode<any>): ArrayBuffer;
    toObject(buffer: ArrayBuffer): unknown;
};
