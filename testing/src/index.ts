import { DBO } from "../out/DivineBinaryObject.js";
import { TNM } from "../out/NodeMaker.js";

const basicSchema = {
  header: TNM._8ui(10),
  positionX: TNM._32f(45.2),
  positionY: TNM._32f(45.3),
  positionZ: TNM._32f(45.4),
  t1: TNM.stringArray(["hello", "sup"]),
};

const basicArray = {
  header: TNM._8ui(10),
  position: TNM.fixedTypedArray("32f", [45.2, 45.3, 45.4], 3),
};

const withMMD = {
  header: TNM._8ui(10),
  mmd: TNM.mmd(
    TNM.object({
      v1: TNM._32f(12.1),
      json: TNM.json({
        hello: "sup",
      }),
    })
  ),
  json: TNM.json({
    hello: "sup",
  }),
  string : TNM.fixedString("hello there",11)
};

DBO.parser.registerSchema("basic", basicSchema);
DBO.parser.registerSchema("basicArray", basicArray);
DBO.parser.registerSchema("withMMD", withMMD);

const b1 = DBO.parser.createBuffer("basic");
console.log(b1);
const r1 = DBO.parser.createObject("basic", b1);
console.log(TNM.toJSONString(r1));

const b2 = DBO.parser.createBuffer("basicArray");
console.log(b2);
const r2 = DBO.parser.createObject("basicArray", b2);
console.log(TNM.toJSONString(r2));

const b3 = DBO.parser.createBuffer("withMMD");
console.log(b3);
const r3 = DBO.parser.createObject<typeof withMMD>("withMMD", b3);
console.log(TNM.toJSONString(r3));
