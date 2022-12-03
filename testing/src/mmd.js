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
    v6: TNM.json({
        hello: "sup",
    }),
});
const buffer = MMD.parser.toBuffer(mmdData);
console.log(buffer);
const object = MMD.parser.toObject(buffer);
console.log(TNM.toJSONString(object));
console.log(MMD.parser.toMMD(buffer));
