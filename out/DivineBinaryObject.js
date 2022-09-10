import { ByteCounts } from "./Constants/ByteData.js";
import { MMDP } from "./MMD/MetaMarkedParser.js";
import { DBOP } from "./DBO/DivineBinaryObjectParser.js";
ByteCounts;
export const DBO = {
    metaMarkedParser: MMDP,
    parser: DBOP,
};
