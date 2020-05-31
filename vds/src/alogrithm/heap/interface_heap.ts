export default interface IHeap<T> {
    
    add(element: T): boolean;
    
    remove(): T;

    size(): number;

    isEmpty(): boolean;

    clear(): void;

}