import { MMDP } from "./MMD/MetaMarkedParser.js";
import { MMDNode } from "./Classes/MMDNode.js";
import { MetaValues } from "./Constants/MetaValues.js";
export const MMD = {
    parser: MMDP,
    object(data) {
        return new MMDNode(MetaValues["object"], data);
    },
    array(data) {
        if (!Array.isArray(data))
            throw new Error("Data for array must be an array.");
        return new MMDNode(MetaValues["array"], data);
    },
    _8i(value) {
        return new MMDNode(MetaValues["8i"], value);
    },
    _8ui(value) {
        return new MMDNode(MetaValues["8ui"], value);
    },
    _16i(value) {
        return new MMDNode(MetaValues["16i"], value);
    },
    _16ui(value) {
        return new MMDNode(MetaValues["16ui"], value);
    },
    _32ui(value) {
        return new MMDNode(MetaValues["32ui"], value);
    },
    _32i(value) {
        return new MMDNode(MetaValues["32i"], value);
    },
    _32f(value) {
        return new MMDNode(MetaValues["32f"], value);
    },
    _64f(value) {
        return new MMDNode(MetaValues["64f"], value);
    },
    bigi(value) {
        return new MMDNode(MetaValues["bigi"], value);
    },
    bigui(value) {
        return new MMDNode(MetaValues["bigui"], value);
    },
    typedArray(type, value) {
        return new MMDNode(MetaValues["typed-array"], value, MetaValues[type]);
    },
    string(value) {
        return new MMDNode(MetaValues["string"], value);
    },
};
