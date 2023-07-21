import Cell from "../ui/Sudoku/cell";


function isEmpty(obj: any) {
    return !Array.isArray(obj);
}

function clone(array: number[]): number[] {
    if (!array || array.length === 0) {
        return [];
    }
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray[i] = array[i];
    }
    return newArray;
}

function isEquals(array1: number[], array2: number[]) {
    if (!array1 || !array2) {
        return false;
    }
    if (array1.length !== array2.length) {
        return false;
    }
    array1.sort();
    array2.sort();
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

function shuffle(array: number[]): void {
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

function print(array: number[]): String {
    let out = '[';
    for (let i = 0; i < array.length; i++) {
        out += array[i] + ((i !== array.length - 1) ? ", " : "");
    }
    out += ']';
    console.log(out);
    return out;
}

function print2DArray(array: number[][]): String {
    if (isEmpty(array)) {
        return;
    }
    let out = '[';
    for (let i = 0; i < array.length; i++) {
        out += '\n\t['
        for (let j = 0; j < array[i].length; j++) {
            out += array[i][j] + ((j !== array[i].length - 1) ? ", " : "");
        }
        out += ']\n';
    }
    out += ']';
    console.log(out);
    return out;
}

function print2DCellArray(array: Cell[][]): String {
    if (isEmpty(array)) {
        return;
    }
    let out = '[';
    for (let i = 0; i < array.length; i++) {
        out += '\n\t['
        for (let j = 0; j < array[i].length; j++) {
            const num = array[i][j].isShowNum ? array[i][j].num : '';
            out += num + ((j !== array[i].length - 1) ? ", " : "");
        }
        out += ']\n';
    }
    out += ']';
    console.log(out);
    return out;
}

export {
    isEmpty,
    clone,
    shuffle,
    print,
    print2DArray,
    print2DCellArray,
    isEquals
}