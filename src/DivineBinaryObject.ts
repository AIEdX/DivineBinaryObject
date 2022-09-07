import {
  DBOScehema,
  DBOScehemaElementTypes,
  DBOCreateBufferData as DBOCreateBufferSchema,
} from "Meta/Schema.types";

export const DBO = {
  schemas: <Record<string, DBOScehema>>{},
  createSchemas: <
    Record<
      string,
      {
        length: number;
        schema: DBOCreateBufferSchema;
      }
    >
  >{},
  elementGetFunctions: <
    Record<
      Exclude<DBOScehemaElementTypes, "list" | "string">,
      (dv: DataView, index: number) => any
    >
  >{
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

  elementSetFunctions: <
    Record<
      Exclude<DBOScehemaElementTypes, "list" | "string">,
      (dv: DataView, index: number, value: number) => any
    >
  >{
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

  elementByteCounts: <
    Record<Exclude<DBOScehemaElementTypes, "list" | "string">, number>
  >{
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

  getBuffer(length: number, SAB: boolean) {
    if (SAB) {
      return new SharedArrayBuffer(length);
    }
    return new ArrayBuffer(length);
  },

  syncSABWtihBuffer(sab: SharedArrayBuffer, buffer: ArrayBuffer) {
    const temp1 = new Uint8Array(sab);
    const temp2 = new Uint8Array(buffer);
    temp1.set(temp2, 0);
  },

  sharedBufferToBuffer(sab: SharedArrayBuffer) {
    const temp1 = new Uint8Array(sab);
    const temp2 = new Uint8Array(sab.byteLength);
    temp2.set(temp1, 0);
    return temp2.buffer;
  },

  registerSchema(id: string, schema: DBOScehema) {
    this.schemas[id] = schema;
  },

  _calculateSchemaLength(schema: DBOCreateBufferSchema) {
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
  registerCreateSchema(id: string, schema: DBOCreateBufferSchema) {
    const legnth = this._calculateSchemaLength(schema);
    this.createSchemas[id] = {
      length: legnth,
      schema: schema,
    };
  },

  getSchema(id: string) {
    return this.schemas[id];
  },

  getCreateSchema(id: string) {
    return this.createSchemas[id];
  },

  createObject<T>(
    schemaId: string,
    buffer: ArrayBuffer | SharedArrayBuffer | DataView
  ): T {
    let dv;
    if (buffer instanceof DataView) {
      dv = buffer;
    } else {
      dv = new DataView(buffer);
    }
    const schema = this.getSchema(schemaId);
    const object: any = new Object();

    let byteCount = 0;
    for (let i = 0; i < schema.length; i++) {
      const element = schema[i];
      if (element.type == "string") {
        continue;
      }
      if (element.type == "list") {
        continue;
      }
      object[element.name] = this.elementGetFunctions[element.type](
        dv,
        byteCount
      );
      byteCount += this.elementByteCounts[element.type];
    }
    return object;
  },

  _calculateVariableSizeBuffer(scehma: DBOCreateBufferSchema) {
    return 1;
  },

  createBuffer(schemaId: string, updatedValues: any = {}) {
    const schemaData = this.getCreateSchema(schemaId);
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
      this.elementSetFunctions[element.type](
        dv,
        byteCount,
        Number(element.value)
      );
      byteCount += this.elementByteCounts[element.type];
    }
    return buffer;
  },
};