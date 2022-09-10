import { DBO } from "../out/DivineBinaryObject.js";
import type { DBObject } from "../out/Meta/DBO.types.js";
import * as crypto from "crypto";

const basicSchema: DBObject = {
  header: {
    type: "8ui",
    value: 10,
  },
  positionX: {
    type: "32f",
    value: 45.2,
  },
  positionY: {
    type: "32f",
    value: 45.3,
  },
  positionZ: {
    type: "32f",
    value: 45.4,
  },
};
const basicArray: DBObject = {
  header: {
    type: "8ui",
    value: 10,
  },
  position: {
    type: "fixed-typed-array",
    listType: "32f",
    length: 3,
    value: [45.2, 45.3, 45.4],
  },
};

const getRandomLengthString = () => {
  let count = (100 * Math.random()) >> 0;
  let string = "";
  while (count--) {
    string += "a";
  }
  return string;
};

const getRandomArray = () => {
  let count = (100 * Math.random()) >> 0;
  const array = [];
  while (count--) {
    array.push(12);
  }
  return array;
};

const randomString = getRandomLengthString();
const randomArray = getRandomArray();
const uuid = crypto.randomUUID();
const basicUUID: DBObject = {
  header: {
    type: "8ui",
    value: 10,
  },
  uuid: {
    type: "fixed-string",
    length: uuid.length,
    value: uuid,
  },
  message: {
    type: "string",
    value: randomString,
  },
  data: {
    type: "typed-array",
    listType: "8ui",
    value: randomArray,
  },
};

DBO.registerSchema("basic", basicSchema);
DBO.registerSchema("basicArray", basicArray);
DBO.registerSchema("basicUUID", basicUUID);

const t1 = () => {
  const buffer = DBO.createBuffer("basic");
  console.log(buffer);
  const result = DBO.createObject("basic", buffer);
  console.log(result);
};
const t2 = () => {
  const buffer = DBO.createBuffer("basicArray");
  console.log(buffer);
  const result = DBO.createObject("basicArray", buffer);
  console.log(result);
};
const t3 = () => {
  const buffer = DBO.createBuffer("basicUUID");
  console.log(buffer);
  const result = DBO.createObject("basicUUID", buffer);
  console.log(result);
};
t1();
t2();
t3();
