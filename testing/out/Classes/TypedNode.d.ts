export declare class TypedNode<T> {
    t: number;
    lt: number;
    l: number;
    v: T;
    get length(): number;
    get type(): number;
    get typeName(): import("../Meta/MMD.types.js").MMDMarks;
    get listType(): number;
    get listTypeName(): import("../Meta/MMD.types.js").MMDMarks;
    get value(): T;
    constructor(type: number, value: T, listType?: number, length?: number);
}
