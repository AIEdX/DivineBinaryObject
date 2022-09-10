import { MMDNode } from "../Classes/MMDNode.js";
import { BToMMD } from "./BufferToMMD.js";
import { MMDToBuffer } from "./MMDToBuffer.js";

export const MMDP = {
  toBuffer(data: MMDNode<any>) {
    return MMDToBuffer.toBuffer(data);
  },

  toObject(buffer: ArrayBuffer) {
    return BToMMD.toObject(buffer);
  },
};
