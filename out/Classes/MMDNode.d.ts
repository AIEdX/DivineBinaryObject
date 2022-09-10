export declare class MMDNode<T> {
    #private;
    get type(): number;
    get listType(): number;
    get value(): T;
    set value(value: T);
    constructor(type: number, value: T, listType?: number);
    toJSON(): {
        value: T;
        type: number;
        listType: number;
    };
}
