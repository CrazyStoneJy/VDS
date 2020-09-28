import { BinarySearch } from '../alogrithm/traverse/binarysearch';
describe('traverse', () => {
    test('binary search', () => {
        let array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let value = 9;
        let binarySearch: BinarySearch = new BinarySearch();
        
        let index = binarySearch.search(array, value);
        console.log(`binary search ${value} index is: ${index}`);
    });
});
