import { BaseSort } from './base';
import { clone } from '../../utils/arrays';
import { Printer } from '../../printer/printer';

class MergeSort extends BaseSort {

    // todo
    sort(elements: number[]): void {
        if (!elements || elements.length === 0) {
            return;
        }
        let dest = new Array<number>();
        this.mergeSort(elements, dest, 0, elements.length - 1);
    }

    mergeSort(elements: number[], dest: number[], low: number, high: number) {
        if (low < high) {
            let mid = Math.floor((low + high) >>> 1);
            console.log(">mid:", mid);
            
            // divide
            this.mergeSort(elements, dest, low, mid);
            this.mergeSort(elements, dest, mid+1, high);
            // conquer
            this.merge(elements, dest, low, high, mid);
        }
    }

    merge(elements: number[], dest: number[], low: number, high: number, mid: number) {
        let lowIndex = low, highIndex = mid + 1, tempIndex = 0;
        while(lowIndex <= mid && highIndex <= high) {
            if (elements[lowIndex] <= elements[highIndex]) {
                dest[tempIndex++] = elements[lowIndex++];
            } else {
                dest[tempIndex++] = elements[highIndex++]; 
            }
        }

        // 左部分剩下的
        while(lowIndex <= mid) {
            dest[tempIndex++] = elements[lowIndex++];
        }

        // 右部分剩下的
        while(highIndex <= high) {
            dest[tempIndex++] = elements[highIndex++];
        }
        console.log(">>dest");
        Printer.print(dest);
        console.log(">>>elements");
        Printer.print(elements);

        tempIndex = 0;
        while(lowIndex <= highIndex) {
            elements[lowIndex++] = dest[tempIndex++];
        }
    }

}

export {
    MergeSort
}