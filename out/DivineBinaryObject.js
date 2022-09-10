import { ByteCounts, ByteDataGet, ByteDataSet } from "./Constants/ByteData.js";
import { MMDP } from "./MMD/MetaMarkedParser.js";
ByteCounts;
export const DBO = {
    metaMarkedParser: MMDP,
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
        "typed-array": (dv, byteCount, element) => {
            if (!element.listType || !Array.isArray(element.value)) {
                throw new Error("Fixed length type list must have list type set");
            }
            const arrayLength = element.value.length;
            const arrayType = element.listType;
            const byteLength = ByteCounts[arrayType];
            const func = ByteDataSet[arrayType];
            dv.setUint32(byteCount, arrayLength);
            byteCount += 4;
            for (let i = 0; i < arrayLength; i++) {
                func(dv, byteCount, element.value[i]);
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
            const arrayLength = element.length;
            const arrayType = element.listType;
            const byteLength = ByteCounts[arrayType];
            const func = ByteDataSet[arrayType];
            for (let i = 0; i < arrayLength; i++) {
                func(dv, byteCount, element.value[i]);
                byteCount += byteLength;
            }
            return byteCount;
        },
        mmd: (dv, byteCount, element) => {
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
            const arrayType = element.listType;
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
            const arrayType = element.listType;
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
            if (element.type == "typed-array") {
                length = -1;
                break;
            }
            if (element.type == "string") {
                length = -1;
                break;
            }
            if (element.type == "fixed-string" && element.length) {
                length += element.length * 2;
                continue;
            }
            if (element.type == "fixed-typed-array" &&
                element.length &&
                element.listType) {
                length += element.length * ByteCounts[element.listType];
                continue;
            }
            length += ByteCounts[element.type];
        }
        return length;
    },
    _calculateVariableSizeBuffer(schema) {
        let length = 0;
        for (const key of Object.keys(schema)) {
            const element = schema[key];
            if (element.type == "fixed-string" && element.length) {
                length += element.length * 2;
                continue;
            }
            if (element.type == "string" && typeof element.value == "string") {
                length += element.value.length * 2 + 4;
                continue;
            }
            if (element.type == "fixed-typed-array" &&
                element.length &&
                element.listType) {
                length += element.length * ByteCounts[element.listType];
                continue;
            }
            if (element.type == "typed-array" &&
                Array.isArray(element.value) &&
                element.listType) {
                length += element.value.length * ByteCounts[element.listType] + 4;
                continue;
            }
            length += ByteCounts[element.type];
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
            if (this.advancedElementGetFunctions[element.type]) {
                byteCount = this.advancedElementGetFunctions[element.type](dv, byteCount, element, object, name);
                continue;
            }
            if (ByteDataGet[element.type]) {
                object[name] = ByteDataGet[element.type](dv, byteCount);
                byteCount += ByteCounts[element.type];
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
                schema[key].value = val;
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
            if (this.advancedElementSetFunctions[element.type]) {
                byteCount = this.advancedElementSetFunctions[element.type](dv, byteCount, element);
                continue;
            }
            if (ByteDataSet[element.type]) {
                ByteDataSet[element.type](dv, byteCount, Number(element.value));
                byteCount += ByteCounts[element.type];
            }
        }
        return buffer;
    },
};
