<h1 align="center">
  Divine Binary Object
</h1>

<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>

---


```ts
import { DBO } from "../out/DivineBinaryObject.js";
import type { DBOCreateBufferData, DBOScehema } from "../out/Meta/Schema.types.js";

const basicSchema: DBOScehema = [
  {
    name: "header",
    type: "8-bit-uint",
  },
  {
    name: "positionX",
    type: "32-bit-float",
  },
  {
    name: "positionY",
    type: "32-bit-float",
  },
  {
    name: "positionZ",
    type: "32-bit-float",
  },
];

const basicCreateSchema: DBOCreateBufferData = {
  header: {
    type: "8-bit-uint",
    value: 10,
  },
  positionX: {
    type: "32-bit-float",
    value: 45.2,
  },
  positionY: {
    type: "32-bit-float",
    value: 45.3,
  },
  positionZ: {
    type: "32-bit-float",
    value: 45.4,
  },
};
DBO.registerCreateSchema("basic", basicCreateSchema);
DBO.registerSchema("basic", basicSchema);

const buffer = DBO.createBuffer("basic");
const dv = new DataView(buffer);
const result = DBO.createObject("basic", dv);
console.log(result);

```





