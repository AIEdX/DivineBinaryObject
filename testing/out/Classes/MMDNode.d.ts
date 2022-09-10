export declare class MMDNode<T> {
    t: number;
    lt: number;
    v: T;
    get type(): number;
    get typeName(): import("../Meta/MMD.types.js").MMDMarks;
    get listType(): number;
    get listTypeName(): import("../Meta/MMD.types.js").MMDMarks;
    get value(): T;
    constructor(type: number, value: T, listType?: number);
}
