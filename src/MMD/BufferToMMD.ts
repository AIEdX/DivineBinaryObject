import { MetaValues, MetaMapValues } from "../Constants/MetaValues.js";
//import { MMDNode } from "../Classes/MMDNode.js";
import { ByteCounts as BC, ByteDataGet } from "../Constants/ByteData.js";
import type { MMDMarks } from "Meta/MMD.types.js";
import { DBOPrimitiveTypes } from "index.js";

export const BToMMD = {
  _cobj: <any>{},
  _parents: <any[]>[],
  _objArray: [],
  _name: "",
  _length: 0,
  _objCount: 0,
  _inOject: false,

  _assign(value: any) {
    if (Array.isArray(this._cobj)) {
      this._cobj.push(value);
    } else {
      this._cobj[this._name] = value;
    }
  },

  markFunctions: <Record<MMDMarks, (dv: DataView, index: number) => number>>{
    start: (dv, index) => {
      return BC["8ui"] + index;
    },
    end: (dv, index) => {
      return BC["8ui"] + index;
    },
    name: (dv, index) => {
      BToMMD._name = "";
      const length = ByteDataGet["8ui"](dv, index + 1);
      index += BC["8ui"] * 2;
      for (let i = index; i < index + length * BC["16ui"]; i += 2) {
        BToMMD._name += String.fromCharCode(ByteDataGet["16ui"](dv, i));
      }
      return index + length * BC["16ui"];
    },
    object: (dv, index) => {},
    "object-start": (dv, index) => {
      const newObj: any = {};
      if (BToMMD._objCount != 0) {
        BToMMD._assign(newObj);
        BToMMD._parents.push(BToMMD._cobj);
      }

      BToMMD._objCount++;
      BToMMD._cobj = newObj;
      return BC["8ui"] + index;
    },
    "object-end": (dv, index) => {
      if (BToMMD._parents.length > 0) {
        BToMMD._cobj = BToMMD._parents.pop();
      }
      return BC["8ui"] + index;
    },
    array: (dv, index) => {
      return BC["8ui"] + index;
    },
    "array-start": (dv, index) => {
      const newObj: any[] = [];
      if (BToMMD._objCount != 0) {
        BToMMD._assign(newObj);
        BToMMD._parents.push(BToMMD._cobj);
      }

      BToMMD._objCount++;
      BToMMD._cobj = newObj;

      return BC["8ui"] + index;
    },
    "array-end": (dv, index) => {
      if (BToMMD._parents.length > 0) {
        BToMMD._cobj = BToMMD._parents.pop();
      }
      return BC["8ui"] + index;
    },
    "8i": (dv, index) => {
      BToMMD._assign(ByteDataGet["8i"](dv, index + 1));
      return BC["8ui"] + BC["8i"] + index;
    },
    "8ui": (dv, index) => {
      BToMMD._assign(ByteDataGet["8ui"](dv, index + 1));
      return BC["8ui"] + BC["8ui"] + index;
    },
    "16i": (dv, index) => {
      BToMMD._assign(ByteDataGet["16i"](dv, index + 1));
      return BC["8ui"] + BC["16i"] + index;
    },
    "16ui": (dv, index) => {
      BToMMD._assign(ByteDataGet["16ui"](dv, index + 1));
      return BC["8ui"] + BC["16ui"] + index;
    },
    "32f": (dv, index) => {
      BToMMD._assign(ByteDataGet["32f"](dv, index + 1));
      return BC["8ui"] + BC["32f"] + index;
    },
    "32i": (dv, index) => {
      BToMMD._assign(ByteDataGet["32i"](dv, index + 1));
      return BC["8ui"] + BC["32i"] + index;
    },
    "32ui": (dv, index) => {
      BToMMD._assign(ByteDataGet["32ui"](dv, index + 1));
      return BC["8ui"] + BC["8ui"] + BC["32ui"] + index + 1;
    },
    "64f": (dv, index) => {
      BToMMD._assign(ByteDataGet["64f"](dv, index + 1));
      return BC["8ui"] + BC["64f"] + index;
    },
    bigi: (dv, index) => {
      BToMMD._assign(ByteDataGet["bigi"](dv, index + 1));
      return BC["8ui"] + BC["bigi"] + index;
    },
    bigui: (dv, index) => {
      BToMMD._assign(ByteDataGet["bigui"](dv, index + 1));
      return BC["8ui"] + BC["bigui"] + index;
    },
    "fixed-typed-array": (dv, index) => {},
    "fixed-string": (dv, index) => {},
    string: (dv, index) => {
      const length = ByteDataGet["32ui"](dv, index + 1);
      index += BC["32f"] + BC["8ui"];
      let string = "";
      for (let i = index; i < index + length * BC["16ui"]; i += 2) {
        string += String.fromCharCode(ByteDataGet["16ui"](dv, i));
      }
      BToMMD._assign(string);
      return index + length * BC["16ui"];
    },
    "typed-array": (dv, index) => {
      const type = MetaMapValues[ByteDataGet["8ui"](dv, index + 1)];
      const length = ByteDataGet["32ui"](dv, index + 2);
      index += BC["8ui"] * 2 + BC["32ui"];
      let array = [];
      const func = ByteDataGet[<DBOPrimitiveTypes>type];
      for (let i = 0; i < length; i++) {
        array.push(func(dv, index));
        index += BC[<DBOPrimitiveTypes>type];
      }
      BToMMD._assign(array);
      return index;
    },
    mmd: (dv, index) => {},
  },

  toObject<T>(buffer: ArrayBuffer): T {
    let legnth = buffer.byteLength;
    const dv = new DataView(buffer);
    this._objCount = 0;
    let index = 0;
    let mark: MMDMarks = "16i";
    let markType: number = 0;
    while (index < legnth) {
      markType = ByteDataGet["8ui"](dv, index);
      mark = MetaMapValues[markType];
      index = this.markFunctions[mark](dv, index);
    }

    return <T>this._cobj;
  },
};
