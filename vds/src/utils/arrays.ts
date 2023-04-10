

export function isEmpty(obj: any) {
    return !Array.isArray(obj);
}

export function clone(array: number[]): number[] {
    if (!array || array.length === 0) {
        return [];
    }
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray[i] = array[i];
    }
    return newArray;
}

export function shuffle(array: number[]): void {
    if (isEmpty(array)) {
        return;
    }
    for (let i = array.length - 1; i >= 0; i--) {
        let randIndex = Math.ceil(Math.random() * (array.length - 1)); 
        swap(array, randIndex, i);
    }
}

function swap(array: number[], target: number, dest: number) {
    if (target > array.length - 1 || dest > array.length - 1 || target < 0 || dest < 0) {
        return;
    } 
    const temp = array[target];
    array[target] = array[dest];
    array[dest] = temp;
}

