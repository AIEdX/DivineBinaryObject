import { DBOPrimitiveTypes } from "index.js";
import { MMDP } from "./MMD/MetaMarkedParser.js";
import { MMDNode } from "./Classes/MMDNode.js";
import { MetaValues } from "./Constants/MetaValues.js";

export const MMD = {
  parser: MMDP,

  object<T>(data: T) {
    return new MMDNode<T>(MetaValues["object"], data);
  },

  array<T>(data: T) {
    if (!Array.isArray(data))
      throw new Error("Data for array must be an array.");
    return new MMDNode<T>(MetaValues["array"], data);
  },

  _8i(value: number) {
    return new MMDNode<number>(MetaValues["8i"], value);
  },

  _8ui(value: number) {
    return new MMDNode<number>(MetaValues["8ui"], value);
  },

  _16i(value: number) {
    return new MMDNode<number>(MetaValues["16i"], value);
  },

  _16ui(value: number) {
    return new MMDNode<number>(MetaValues["16ui"], value);
  },

  _32ui(value: number) {
    return new MMDNode<number>(MetaValues["32ui"], value);
  },

  _32i(value: number) {
    return new MMDNode<number>(MetaValues["32i"], value);
  },

  _32f(value: number) {
    return new MMDNode<number>(MetaValues["32f"], value);
  },

  _64f(value: number) {
    return new MMDNode<number>(MetaValues["64f"], value);
  },

  bigi(value: number) {
    return new MMDNode<number>(MetaValues["bigi"], value);
  },

  bigui(value: number) {
    return new MMDNode<number>(MetaValues["bigui"], value);
  },

  typedArray(type: DBOPrimitiveTypes, value: number[]) {
    return new MMDNode<number[]>(
      MetaValues["typed-array"],
      value,
      MetaValues[type]
    );
  },

  string(value: string) {
    return new MMDNode<string>(MetaValues["string"], value);
  },
};
