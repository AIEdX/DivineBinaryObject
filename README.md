<h1 align="center">
  Divine Binary Object
</h1>

<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>

---

```ts
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

```

The result is:

```console
ArrayBuffer {
  [Uint8Contents]: <0a 42 34 cc cd 42 35 33 33 42 35 99 9a>,
  byteLength: 13
}
```

```json
{
  "header": 10,
  "positionX": 45.20000076293945,
  "positionY": 45.29999923706055,
  "positionZ": 45.400001525878906
}
```

```console
ArrayBuffer {
  [Uint8Contents]: <0a 42 34 cc cd 42 35 33 33 42 35 99 9a>,
  byteLength: 13
}
```

```json
{
  "header": 10,
  "position": [45.20000076293945, 45.29999923706055, 45.400001525878906]
}
```

```console
ArrayBuffer {
  [Uint8Contents]: <0a 00 00 00 3c 00 03 08 02 00 76 00 31 0d 41 41 99 9a 08 04 00 6a 00 73 00 6f 00 6e 19 00 00 00 0f 00 7b 00 22 00 68 00 65 00 6c 00 6c 00 6f 00 22 00 3a 00 22 00 73 00 75 00 70 00 22 00 7d 04 01 00 00 00 0f 00 7b 00 22 00 68 00 65 00 6c 00 6c 00 6f 00 22 00 3a 00 22 00 73 00 75 00 70 00 22 00 7d 00 ... 21 more bytes>,
  byteLength: 121
}
```

```json
{
  "header": 10,
  "mmd": {
    "t": 26,
    "lt": 0,
    "l": 0,
    "v": {
      "t": 2,
      "lt": 0,
      "l": 0,
      "v": {
        "v1": {
          "t": 13,
          "lt": 0,
          "l": 0,
          "v": 12.100000381469727
        },
        "json": {
          "t": 21,
          "lt": 0,
          "l": 0,
          "v": {
            "hello": "sup"
          }
        }
      }
    }
  },
  "json": {
    "hello": "sup"
  },
  "string": "hello there"
}
```

## Meta Marked Data

Meta Marked Data (MMD) is a way to store any type of data in binary.

DBO comes with a MMD buffer creator and parser.

```ts
import { MMD } from "../out/MetaMarkedData.js";
import { TNM } from "../out/NodeMaker.js";
const mmdData = TNM.object({
  v0: TNM.array([
    TNM._8ui(1),
    TNM.object({
      v0: TNM.typedArray("16ui", [1, 2, 3, 4]),
    }),
  ]),
  v1: TNM._32f(12.12),
  v2: TNM._16ui(1212),
  v3: TNM.string("value 3"),
  v4: TNM.typedArray("16ui", [1, 2, 3, 4, 5, 6, 7, 8]),
  v5: TNM.stringArray(["hello", "sup"]),
});
const buffer = MMD.parser.toBuffer(mmdData);
console.log(buffer);

const object = MMD.parser.toObject(buffer);
console.log(TNM.toJSONString(object));
```

The result is:

```console
ArrayBuffer {
  [Uint8Contents]: <00 03 08 02 00 76 00 30 06 0a 01 03 08 02 00 76 00 30 18 0c 00 00 00 04 00 01 00 02 00 03 00 04 04 07 08 02 00 76 00 31 0d 41 41 eb 85 08 02 00 76 00 32 0c 04 bc 08 02 00 76 00 33 15 00 00 00 07 00 76 00 61 00 6c 00 75 00 65 00 20 00 33 08 02 00 76 00 34 18 0c 00 00 00 08 00 01 00 02 00 03 00 04 00 ... 44 more bytes>,
  byteLength: 144
}
```

```json
{
  "v0": [1, { "v0": [1, 2, 3, 4] }],
  "v1": 12.119999885559082,
  "v2": 1212,
  "v3": "value 3",
  "v4": [1, 2, 3, 4, 5, 6, 7, 8],
  "v5": ["hello", "sup"]
}
```

Another DBO Examples

```ts
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

```

```console
ArrayBuffer {
  [Uint8Contents]: <0a 00 66 00 37 00 63 00 32 00 66 00 36 00 36 00 62 00 2d 00 64 00 65 00 39 00 36 00 2d 00 34 00 39 00 61 00 65 00 2d 00 61 00 37 00 65 00 37 00 2d 00 36 00 36 00 65 00 61 00 38 00 63 00 32 00 34 00 36 00 62 00 65 00 64 00 00 00 23 00 61 00 61 00 61 00 61 00 61 00 61 00 61 00 61 00 61 00 61 00 61 00 ... 62 more bytes>,
  byteLength: 162
}
```

```json
{
  "header": 10,
  "uuid": "f7c2f66b-de96-49ae-a7e7-66ea8c246bed",
  "message": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "data": [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
}
```
