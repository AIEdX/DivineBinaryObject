<h1 align="center">
  Divine Binary Object
</h1>

<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>

---

```ts
import { DBO } from "../out/DivineBinaryObject.js";
import type { DBOScehema } from "../out/Meta/Schema.types.js";

const basicSchema: DBOScehema = {
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

DBO.registerSchema("basic", basicSchema);

const buffer = DBO.createBuffer("basic");
console.log(buffer);
const result = DBO.createObject("basic", buffer);
console.log(result);
```

The result is:

```console
{
  header: 10,
  positionX: 45.20000076293945,
  positionY: 45.29999923706055,
  positionZ: 45.400001525878906
}
```
