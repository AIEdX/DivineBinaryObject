export class MMDNode {
    #t = 0;
    #lt = 0;
    #v;
    get type() {
        return this.#t;
    }
    get listType() {
        return this.#lt;
    }
    get value() {
        return this.#v;
    }
    set value(value) {
        this.#v = value;
    }
    constructor(type, value, listType = 0) {
        this.#t = type;
        this.#v = value;
        this.#lt = listType;
    }
    toJSON() {
        return {
            value: this.#v,
            type: this.#t,
            listType: this.#lt,
        };
    }
}
