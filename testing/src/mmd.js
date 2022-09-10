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
console.log(object);
