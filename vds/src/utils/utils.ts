import Stack from '../alogrithm/stack/stack';

export function convertToArray(stack: Stack<T>): Array<T> {
    let array = new Array();
    while (!stack.isEmpty()) {
        array.push(stack.pop());
    }
    return array;
}