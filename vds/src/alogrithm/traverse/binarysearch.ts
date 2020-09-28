/**
 * 二叉搜索
 * 
 */
class BinarySearch {
    
    constructor() {

    }

    search(array: number[], value: number): number{
        if (array && array.length > 0) {
            let low: number = 0;
            let high: number = array.length - 1;

            while (low <= high) {
                let mid = (high + low) >>> 1;
                if (value > array[mid]) {
                    low = mid + 1;
                } else if (value < array[mid]) {
                    high = mid - 1;
                } else {
                    return mid;
                }
            }
        }
        return -1;
    }


}


export {
    BinarySearch
}