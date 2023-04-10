import { BubbleSort } from '../alogrithm/sort/bubble';
import { Printer } from '../printer/printer';
import { SelectionSort } from '../alogrithm/sort/selection';
import { InsertionSort } from '../alogrithm/sort/insertion';
import { MergeSort } from '../alogrithm/sort/merge';
import { QuickSort } from '../alogrithm/sort/quickSort';
import { shuffle } from '../utils/arrays';

describe('sort', () => {
    test('test sort', () => {

    });
    // console.log("sort 测试用例");
});
// describe('sort', () => {

//     let array: number[] = [2, 1, 5, 4, 6, 7];

//     test('bubble sort', () => {
//         let bubbleSort = new BubbleSort();
//         console.log('primary array----->');
//         Printer.print(array);
//         bubbleSort.sort(array);
//         console.log('bubble sorte asc---->');
//         Printer.print(array);
//     });

//     test('selection sort', () => {
//         shuffle(array);
//         let selectionSort = new SelectionSort();
//         console.log('primary array----->');
//         Printer.print(array);
//         selectionSort.sort(array);
//         console.log('selection sort asc---->');
//         Printer.print(array);
       
//     });

//     test('quick sort', () => {
//         shuffle(array);
//         let quickSort = new QuickSort();
//         console.log('primary array----->');
//         Printer.print(array);
//         quickSort.sort(array);
//         console.log('quick sorte asc---->');
//         Printer.print(array);
        
//     });

//     // test('insertion sort', () => {
//     //     array = [4, 3, 2, 5, 1];
//     //     let insertionSort = new InsertionSort();
//     //     console.log('primary array----->');
//     //     Printer.print(array);
//     //     console.log(">>>>");
        
//     //     insertionSort.sort(array);
//     //     // console.log('insertion sort asc---->');
//     //     // Printer.print(array);
//     //     // insertionSort.sortByOrderType(array, OrderType.DESC);
//     //     // console.log('insertion sort desc---->');
//     //     // Printer.print(array);
//     // });

//     test('merge sort', () => {
//         shuffle(array);
//         console.log("primary array>>");
//         Printer.print(array);
//         let mergeSort = new MergeSort();
//         mergeSort.sort(array);
//         console.log('merge sort>>>');
//         Printer.print(array);
//     });

// });