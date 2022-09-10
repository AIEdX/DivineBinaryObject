import { DBO } from "../out/DivineBinaryObject.js";
import { TNM } from "../out/NodeMaker.js";
import * as crypto from "crypto";
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
const basicUUID = {
    header: TNM._8ui(10),
    uuid: TNM.fixedString(uuid, uuid.length),
    message: TNM.string(randomString),
    data: TNM.typedArray("8ui", randomArray),
};
DBO.parser.registerSchema("basicUUID", basicUUID);
const b3 = DBO.parser.createBuffer("basicUUID");
console.log(b3);
const r3 = DBO.parser.createObject("basicUUID", b3);
console.log(r3);
