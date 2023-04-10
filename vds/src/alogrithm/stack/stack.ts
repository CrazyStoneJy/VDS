export default class Stack<T> implements IStack<T>{

    _array: Array<T>;
    _size: number = 0;

    constructor() {
        this._array = [];
        this._size = 0;
    }

    peek(): T {
        let firstElement = this._array[this._size - 1];
        return firstElement;
    }

    pop(): T {
        let elements = this._array.splice(this._size - 1 , 1);
        this._size--;
        return elements[0];
    }

    push(value: T): void {
        this._array.push(value);
        this._size++;
    }

    size(): number {
        return this._size;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    print() {
        if (!this.isEmpty()) {
            // let str = "";
            console.log('>>>>>>print before>>>>>>>>>>');
            for (let element of this._array) {
                // str += element + " ";c
                console.log('element:', element);
            }
            // console.log(str);
            console.log('>>>>>>print after>>>>>>>>>>');
        }
    }

}

interface IStack<T> {

    peek(): T;

    pop(): T;

    push(value: T): void;

    size(): number;

    isEmpty(): boolean;


}