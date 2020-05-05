export default interface IStack<T> {

    peek(): T;

    pop(): T;

    push(value: T): void;

    size(): number;

    isEmpty(): boolean;


}