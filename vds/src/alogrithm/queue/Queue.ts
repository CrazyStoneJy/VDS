class Queue<T> implements IQueue<T>{

    len = 0;
    list: Array<T>;
    constructor() {
        this.list = new Array();
    }

    count(): number {
        return this.len;
    }

    enqueue(element: T): void {
        this.list.push(element);
        this.len++;
    }

    dequeue(): T {
        this.len--;
        return this.list.shift();
    }

    isEmpty(): boolean {
        return this.len === 0;
    }
    
}

interface IQueue<T> {
    // 队列的个数
    count(): number;
    // 入队列
    enqueue(element: T): void;
    // 出队列
    dequeue(): T;
    // 队列是否为空
    isEmpty(): boolean;
}

export {
    Queue
}