import { MetaMapValues } from "../Constants/MetaValues.js";

export class TypedNode<T> {
  t = 0;
  lt = 0;
  l = 0;
  v: T;
  get length() {
    return this.l;
  }
  get type() {
    return this.t;
  }
  get typeName() {
    return MetaMapValues[this.t];
  }
  get listType() {
    return this.lt;
  }
  get listTypeName() {
    return MetaMapValues[this.lt];
  }
  get value() {
    return this.v;
  }

  constructor(type: number, value: T, listType = 0, length = 0) {
    this.t = type;
    this.v = value;
    this.lt = listType;
    this.l = length;
  }
}
