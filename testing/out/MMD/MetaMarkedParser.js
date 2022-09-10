import { BToMMD } from "./BufferToMMD.js";
import { MMDToBuffer } from "./MMDToBuffer.js";
export const MMDP = {
    toBuffer(data) {
        return MMDToBuffer.toBuffer(data);
    },
    toObject(buffer) {
        return BToMMD.toObject(buffer);
    },
};
