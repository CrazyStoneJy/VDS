export default interface Tree<T> {
    
    print(): void;

    isEmpty(): boolean

    insert(value: T): boolean
         
    remove(value: T): boolean

    contains(value: T): boolean

    getHeight(): number

    traverse(): void;

}