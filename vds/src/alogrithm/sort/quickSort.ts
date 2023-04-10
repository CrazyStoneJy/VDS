import { BaseSort } from './base';

class QuickSort extends BaseSort {

    sort(elements: number[]): void {
        const low = 0;
        const high = elements.length - 1;
        this.quickSort(elements, low, high);
    }

    partition(elements: number[], low: number, high: number ): number {
        const pivot = elements[low];
        while (low < high) {
            while (low < high && elements[high] > pivot) {
                --high;
            }
            elements[low] = elements[high];
            while (low < high && elements[low] < pivot) {
                ++low;
            }
            elements[high] = elements[low];
        }
        elements[low] = pivot;
        return low;
    }

    quickSort(elements: number[], low: number, high: number): void {
        if(low < high) {
            const pivot = this.partition(elements, low, high);
            this.quickSort(elements, low, pivot - 1);
            this.quickSort(elements, pivot + 1, high);
        }
    }

}

export {
    QuickSort
}