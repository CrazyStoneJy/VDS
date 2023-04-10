import { OrderType }  from "./sort";
import { BaseSort } from './base';
import { Printer } from '../../printer/printer';

class InsertionSort extends BaseSort {

    // todo
    sort(elements: number[]): void {
        for (let i = 1; i < elements.length; i++) {
            let swapIndex = -1;
            for (let j = i - 1; j >= 0; j--) {
                if (elements[i] > elements[j]) {
                    break;
                }
                swapIndex = j;
            }
            if (swapIndex != -1) {
                this.swap(elements, swapIndex, i);
            }
            console.log("swapIndex:", swapIndex, ',i:', i);
            Printer.print(elements);
        }
    }
}

export {
    InsertionSort
}

