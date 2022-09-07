export const DBO = {
    schemas: {},
    elementGetFunctions: {
        "8-bit-int": (dv, index) => {
            return dv.getInt8(index);
        },
        "8-bit-uint": (dv, index) => {
            return dv.getUint8(index);
        },
        "16-bit-int": (dv, index) => {
            return dv.getInt16(index);
        },
        "16-bit-uint": (dv, index) => {
            return dv.getUint16(index);
        },
        "32-bit-int": (dv, index) => {
            return dv.getInt32(index);
        },
        "32-bit-uint": (dv, index) => {
            return dv.getUint32(index);
        },
        "32-bit-float": (dv, index) => {
            return dv.getFloat32(index);
        },
        "big-int": (dv, index) => {
            return dv.getBigInt64(index);
        },
        "big-uint": (dv, index) => {
            return dv.getBigUint64(index);
        },
    },
    elementSetFunctions: {
        "8-bit-int": (dv, index, value) => {
            return dv.setInt8(index, value);
        },
        "8-bit-uint": (dv, index, value) => {
            return dv.setUint8(index, value);
        },
        "16-bit-int": (dv, index, value) => {
            return dv.setInt16(index, value);
        },
        "16-bit-uint": (dv, index, value) => {
            return dv.setUint16(index, value);
        },
        "32-bit-int": (dv, index, value) => {
            return dv.setInt32(index, value);
        },
        "32-bit-uint": (dv, index, value) => {
            return dv.setUint32(index, value);
        },
        "32-bit-float": (dv, index, value) => {
            return dv.setFloat32(index, value);
        },
        "big-int": (dv, index, value) => {
            return dv.setBigInt64(index, BigInt(value));
        },
        "big-uint": (dv, index, value) => {
            return dv.setBigUint64(index, BigInt(value));
        },
    },
    elementByteCounts: {
        "8-bit-int": 1,
        "8-bit-uint": 1,
        "16-bit-int": 2,
        "16-bit-uint": 2,
        "32-bit-int": 4,
        "32-bit-uint": 4,
        "32-bit-float": 4,
        "big-int": 8,
        "big-uint": 8,
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
            if (element.length == "variable") {
                length = -1;
                break;
            }
            if (element.type == "string" && element.length) {
                length += element.length * 4;
                continue;
            }
            if (element.type == "list" && element.length && element.listType) {
                length += element.length * this.elementByteCounts[element.listType];
                continue;
            }
            //@ts-ignore
            length += this.elementByteCounts[element.type];
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
            if (element.type == "string") {
                continue;
            }
            if (element.type == "list") {
                continue;
            }
            object[name] = this.elementGetFunctions[element.type](dv, byteCount);
            byteCount += this.elementByteCounts[element.type];
        }
        return object;
    },
    _calculateVariableSizeBuffer(scehma) {
        return 1;
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
            if (element.type == "string") {
                continue;
            }
            if (element.type == "list") {
                continue;
            }
            this.elementSetFunctions[element.type](dv, byteCount, Number(element.value));
            byteCount += this.elementByteCounts[element.type];
        }
        return buffer;
    },
};
