import { ByteCounts, ByteDataGet, ByteDataSet } from "../Constants/ByteData.js";
import { MMDP } from "../MMD/MetaMarkedParser.js";
import { TypedNode } from "../Classes/TypedNode.js";
import { MetaMapValues, MetaValues } from "../Constants/MetaValues.js";
import { MMD } from "../MetaMarkedData.js";
export const DBOP = {
    mmdTokens: [],
    schemas: {},
    advancedElementSetFunctions: {
        string: (dv, byteCount, element) => {
            if (typeof element.value != "string") {
                throw new Error("Value must a string for 'fixed-length-string'");
            }
            const length = element.value.length;
            const string = element.value;
            dv.setUint32(byteCount, length);
            byteCount += 4;
            for (let i = 0; i < length; i++) {
                dv.setUint16(byteCount, string.charCodeAt(i));
                byteCount += 2;
            }
            return byteCount;
        },
        "fixed-string": (dv, byteCount, element) => {
            if (typeof element.value != "string") {
                throw new Error("Value must a string for 'fixed-length-string'");
            }
            if (!element.length) {
                throw new Error("Length must be set for 'fixed-length-string'");
            }
            const string = element.value;
            for (let i = 0; i < element.length; i++) {
                dv.setUint16(byteCount, string.charCodeAt(i));
                byteCount += 2;
            }
            return byteCount;
        },
        "string-array": (dv, byteCount, element) => {
            if (!element.listType || !Array.isArray(element.value)) {
                throw new Error("Fixed length type list must have list type set");
            }
            let value = element.value;
            const arrayLength = element.value.length;
            const byteLength = ByteCounts["16ui"];
            const func = ByteDataSet["16ui"];
            dv.setUint32(byteCount, arrayLength);
            byteCount += ByteCounts["32ui"];
            for (let i = 0; i < arrayLength; i++) {
                let string = value[i];
                dv.setUint32(byteCount, string.length);
                byteCount += ByteCounts["32ui"];
                for (let k = 0; k < string.length; i++) {
                    func(dv, byteCount, string.charCodeAt(k));
                    byteCount += byteLength;
                }
            }
            return byteCount;
        },
        "typed-array": (dv, byteCount, element) => {
            if (!element.listType || !Array.isArray(element.value)) {
                throw new Error("Fixed length type list must have list type set");
            }
            const value = element.value;
            const arrayLength = element.value.length;
            const arrayType = MetaMapValues[element.listType];
            const byteLength = ByteCounts[arrayType];
            const func = ByteDataSet[arrayType];
            dv.setUint32(byteCount, arrayLength);
            byteCount += 4;
            for (let i = 0; i < arrayLength; i++) {
                func(dv, byteCount, value[i]);
                byteCount += byteLength;
            }
            return byteCount;
        },
        "fixed-typed-array": (dv, byteCount, element) => {
            if (!element.listType ||
                !Array.isArray(element.value) ||
                !element.length) {
                throw new Error("Fixed length type list must have list type set");
            }
            const value = element.value;
            const arrayLength = element.length;
            const arrayType = MetaMapValues[element.listType];
            const byteLength = ByteCounts[arrayType];
            const func = ByteDataSet[arrayType];
            for (let i = 0; i < arrayLength; i++) {
                func(dv, byteCount, value[i]);
                byteCount += byteLength;
            }
            return byteCount;
        },
        mmd: (dv, byteCount, element) => {
            const mmdData = DBOP.mmdTokens.shift();
            if (!mmdData)
                return;
            const length = mmdData[1];
            ByteDataSet["32ui"](dv, byteCount, length);
            byteCount += ByteCounts["32ui"];
            MMDP.toeknsToBuffer(mmdData[0], mmdData[1], dv.buffer, byteCount);
            byteCount += length;
            return byteCount;
        },
    },
    advancedElementGetFunctions: {
        string: (dv, byteCount, element, targetObject, name) => {
            let string = "";
            const length = dv.getUint32(byteCount);
            byteCount += 4;
            for (let i = 0; i < length; i++) {
                string += String.fromCharCode(dv.getUint16(byteCount));
                byteCount += 2;
            }
            targetObject[name] = string;
            return byteCount;
        },
        "fixed-string": (dv, byteCount, element, targetObject, name) => {
            if (typeof element.value != "string") {
                throw new Error("Value must a string for 'fixed-length-string'");
            }
            if (!element.length) {
                throw new Error("Length must be set for 'fixed-length-string'");
            }
            let string = "";
            for (let i = 0; i < element.length; i++) {
                string += String.fromCharCode(dv.getUint16(byteCount));
                byteCount += 2;
            }
            targetObject[name] = string;
            return byteCount;
        },
        "typed-array": (dv, byteCount, element, targetObject, name) => {
            if (!element.listType || !Array.isArray(element.value)) {
                throw new Error("Fixed length type list must have list type set");
            }
            const payloadArray = [];
            const arrayType = element.listTypeName;
            const byteLength = ByteCounts[arrayType];
            const func = ByteDataGet[arrayType];
            const arrayLength = dv.getUint32(byteCount);
            byteCount += 4;
            for (let i = 0; i < arrayLength; i++) {
                payloadArray[i] = func(dv, byteCount);
                byteCount += byteLength;
            }
            targetObject[name] = payloadArray;
            return byteCount;
        },
        "fixed-typed-array": (dv, byteCount, element, targetObject, name) => {
            if (!element.listType ||
                !Array.isArray(element.value) ||
                !element.length) {
                throw new Error("Fixed length type list must have list type set");
            }
            const payloadArray = [];
            const arrayLength = element.length;
            const arrayType = element.listTypeName;
            const byteLength = ByteCounts[arrayType];
            const func = ByteDataGet[arrayType];
            for (let i = 0; i < arrayLength; i++) {
                payloadArray[i] = func(dv, byteCount);
                byteCount += byteLength;
            }
            targetObject[name] = payloadArray;
            return byteCount;
        },
        mmd: (dv, byteCount, element, targetObject, name) => {
            const length = ByteDataGet["32ui"](dv, byteCount);
            byteCount += ByteCounts["32ui"];
            targetObject[name] = new TypedNode(MetaValues["mmd"], MMD.parser.toMMD(dv.buffer, byteCount, byteCount + length));
            return byteCount;
        },
    },
    getBuffer(length, SAB) {
        if (SAB) {
            return new SharedArrayBuffer(length);
        }
        return new ArrayBuffer(length);
    },
    syncSABWtihBuffer(sab, buffer) {
        const temp1 = new Uint8Array(sab);
        const temp2 = new Uint8Array(buffer);
        temp1.set(temp2, 0);
    },
    sharedBufferToBuffer(sab) {
        const temp1 = new Uint8Array(sab);
        const temp2 = new Uint8Array(sab.byteLength);
        temp2.set(temp1, 0);
        return temp2.buffer;
    },
    registerSchema(id, schema) {
        const legnth = this._calculateSchemaLength(schema);
        this.schemas[id] = {
            length: legnth,
            schema: schema,
        };
    },
    _calculateSchemaLength(schema) {
        let length = 0;
        for (const key of Object.keys(schema)) {
            const element = schema[key];
            if (element.typeName == "mmd") {
                length = -1;
                break;
            }
            if (element.typeName == "typed-array") {
                length = -1;
                break;
            }
            if (element.typeName == "string") {
                length = -1;
                break;
            }
            if (element.typeName == "fixed-string" && element.length) {
                length += element.length * 2;
                continue;
            }
            if (element.typeName == "fixed-typed-array" &&
                element.length &&
                element.listType) {
                length +=
                    element.length * ByteCounts[element.listTypeName];
                continue;
            }
            length += ByteCounts[element.typeName];
        }
        return length;
    },
    _calculateVariableSizeBuffer(schema) {
        let length = 0;
        for (const key of Object.keys(schema)) {
            const element = schema[key];
            if (element.typeName == "mmd") {
                const mmdData = MMD.parser.toToekns(element.value);
                this.mmdTokens.push(mmdData);
                length += mmdData[1] + ByteCounts["32ui"];
                continue;
            }
            if (element.typeName == "fixed-string" && element.length) {
                length += element.length * 2;
                continue;
            }
            if (element.typeName == "string" && typeof element.value == "string") {
                length += element.value.length * 2 + 4;
                continue;
            }
            if (element.typeName == "fixed-typed-array" &&
                element.length &&
                element.listType) {
                length +=
                    element.length * ByteCounts[element.listTypeName];
                continue;
            }
            if (element.typeName == "typed-array" &&
                Array.isArray(element.value) &&
                element.listType) {
                length +=
                    element.value.length *
                        ByteCounts[element.listTypeName] +
                        4;
                continue;
            }
            length += ByteCounts[element.typeName];
        }
        return length;
    },
    getSchema(id) {
        return this.schemas[id];
    },
    createObject(schemaId, buffer) {
        let dv;
        //@ts-ignore
        if (Buffer && !(buffer instanceof DataView)) {
            //@ts-ignore
            dv = new DataView(new Uint8Array(buffer).buffer);
        }
        else {
            if (buffer instanceof DataView) {
                dv = buffer;
            }
            else {
                dv = new DataView(buffer);
            }
        }
        const schemaData = this.getSchema(schemaId);
        const object = new Object();
        const schema = schemaData.schema;
        let byteCount = 0;
        for (const name of Object.keys(schema)) {
            const element = schema[name];
            if (this.advancedElementGetFunctions[element.typeName]) {
                byteCount = this.advancedElementGetFunctions[element.typeName](dv, byteCount, element, object, name);
                continue;
            }
            if (ByteDataGet[element.typeName]) {
                object[name] = ByteDataGet[element.typeName](dv, byteCount);
                byteCount += ByteCounts[element.typeName];
            }
        }
        return object;
    },
    createBuffer(schemaId, updatedValues = {}) {
        const schemaData = this.getSchema(schemaId);
        const schema = schemaData.schema;
        for (const key of Object.keys(updatedValues)) {
            const val = updatedValues[key];
            if (schema[key]) {
                schema[key].v = val;
            }
        }
        let length = schemaData.length;
        if (length < 0) {
            length = this._calculateVariableSizeBuffer(schema);
        }
        const buffer = new ArrayBuffer(length);
        const dv = new DataView(buffer);
        let byteCount = 0;
        for (const key of Object.keys(schema)) {
            const element = schema[key];
            if (this.advancedElementSetFunctions[element.typeName]) {
                byteCount = this.advancedElementSetFunctions[element.typeName](dv, byteCount, element);
                continue;
            }
            if (ByteDataSet[element.typeName]) {
                ByteDataSet[element.typeName](dv, byteCount, Number(element.value));
                byteCount += ByteCounts[element.typeName];
            }
        }
        return buffer;
    },
};
