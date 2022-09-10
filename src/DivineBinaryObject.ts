import { ByteCounts, ByteDataGet, ByteDataSet } from "./Constants/ByteData.js";
import {
  DBObject,
  DBOPrimitive,
  DBOARich,
  DBOElement,
} from "Meta/DBO.types";
import { MMDP } from "./MMD/MetaMarkedParser.js";
import { DBOP } from "./DBO/DivineBinaryObjectParser.js";

ByteCounts;
export const DBO = {
  metaMarkedParser: MMDP,

  parser: DBOP,
};
