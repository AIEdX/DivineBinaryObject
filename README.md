<h1 align="center">
  Divine Binary Object
</h1>

<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>

---

```ts
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

````json
{
  header: 10,
  position: [ 45.20000076293945, 45.29999923706055, 45.400001525878906 ]
}
```console
ArrayBuffer {
  [Uint8Contents]: <0a 00 31 00 35 00 32 00 62 00 63 00 62 00 31 00 63 00 2d 00 65 00 31 00 31 00 66 00 2d 00 34 00 32 00 39 00 66 00 2d 00 38 00 34 00 36 00 64 00 2d 00 36 00 33 00 31 00 32 00 37 00 37 00 39 00 31 00 66 00 32 00 35 00 32 00 00 00 5f 00 61 00 61 00 61 00 61 00 61 00 61 00 61 00 61 00 61 00 61 00 61 00 ... 181 more bytes>,
  byteLength: 281
}
````

```json
{
  "header": 10,
  "uuid": "152bcb1c-e11f-429f-846d-63127791f252",
  "message": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "data": [12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
}
```

## Meta Marked Data

Meta Marked Data (MMD) is a way to store any type of data in binary.

DBO comes with a MMD buffer creator and parser.

```ts
import { MMD } from "../out/MetaMarkedData.js";
const mmdData = MMD.array([
  MMD.object({
    v0: MMD.array([
      MMD._8ui(1),
      MMD.object({
        v0: MMD.typedArray("16ui", [1, 2, 3, 4]),
      }),
    ]),
    v1: MMD._32f(12.12),
    v2: MMD._16ui(1212),
    v3: MMD.string("value 3"),
    v4: MMD.typedArray("16ui", [1, 2, 3, 4, 5, 6, 7, 8]),
  }),
]);

const buffer = MMD.parser.toBuffer(mmdData);
console.log(buffer);
const object = MMD.parser.toObject(buffer);
console.log(JSON.stringify(object, null, 2));
```

The result is:

```console
ArrayBuffer {
  [Uint8Contents]: <00 06 03 08 02 00 76 00 30 06 0a 01 03 08 02 00 76 00 30 16 0c 00 00 00 04 00 01 00 02 00 03 00 04 04 07 08 02 00 76 00 31 0d 41 41 eb 85 08 02 00 76 00 32 0c 04 bc 08 02 00 76 00 33 15 00 00 00 07 00 76 00 61 00 6c 00 75 00 65 00 20 00 33 08 02 00 76 00 34 16 0c 00 00 00 08 00 01 00 02 00 03 00 04 ... 11 more bytes>,
  byteLength: 111
}
```

```json
[
  {
    "v0": [
      1,
      {
        "v0": [1, 2, 3, 4]
      }
    ],
    "v1": 12.119999885559082,
    "v2": 1212,
    "v3": "value 3",
    "v4": [1, 2, 3, 4, 5, 6, 7, 8]
  }
]
```
