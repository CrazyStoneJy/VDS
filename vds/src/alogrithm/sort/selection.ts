import { ISort, OrderType }  from "./sort";
import { BaseSort } from './base';
/**
 * 选择排序原理：
 * 在长度为N的无序数组中，第一次遍历n-1个数，找到最小的数值与第一个元素交换；
 * 第二次遍历n-2个数，找到最小的数值与第二个元素交换；
 * 第n-1次遍历，找到最小的数值与第n-1个元素交换，排序完成。
 * 与冒泡排序不同的是选择排序不是每次发现数据小的时候就会交换位置，而是将位置的下标记录下来，比较完一轮后，再去交换位置
 * [wiki](https://zh.wikipedia.org/wiki/%E9%80%89%E6%8B%A9%E6%8E%92%E5%BA%8F)
 * 时间复杂度: O(n2)
 * 
 */
class SelectionSort extends BaseSort {

    sort(elements: number[]): void {
        for (let i = 0 ; i < elements.length - 1; i++) {
            for (let j = i + 1; j < elements.length; j++) {
                let swapIndex = i;
                if (elements[swapIndex] > elements[j]) {
                    swapIndex = j;
                }
                if (swapIndex != i) {
                    this.swap(elements, i, swapIndex);
                }
            }
        }
    }
}

export {
    SelectionSort
}