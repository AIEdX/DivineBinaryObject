export class MMDNode<T> {
  #t: number = 0;
  #lt: number = 0;
  #v: T;
  get type() {
    return this.#t;
  }
  get listType() {
    return this.#lt;
  }

  get value() {
    return this.#v;
  }

  set value(value: T) {
    this.#v = value;
  }

  constructor(type: number, value: T, listType = 0) {
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


