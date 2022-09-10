import { MMDMarks } from "Meta/MMD.types";

const markers: MMDMarks[] = [
  "start",
  "end",
  "object",
  "object-start",
  "object-end",
  "array",
  "array-start",
  "array-end",
  "name",
  "8i",
  "8ui",
  "16i",
  "16ui",
  "32f",
  "32i",
  "32ui",
  "64f",
  "bigi",
  "bigui",
  "fixed-typed-array",
  "fixed-string",
  "string",
  "typed-array",
  "mmd",
];

const metaValues: any = {};

for (let i = 0; i < markers.length; i++) {
  metaValues[markers[i]] = i;
}

export const MetaValues: Record<MMDMarks, number> = metaValues;
export const MetaMapValues: Record<number, MMDMarks> = {};
for (const key of Object.keys(MetaValues)) {
  //@ts-ignore
  MetaMapValues[Number(MetaValues[key])] = key;
}
