import { BaseSort } from './base';

/** 冒泡算法的原理：
* 1.比较相邻的元素。如果第一个比第二个大，就交换他们两个。
* 2.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
* 3.针对所有的元素重复以上的步骤，除了最后一个。
* 4.持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较
* [wiki](https://zh.wikipedia.org/wiki/%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F)
* 时间复杂度: O(n2)
*/
class BubbleSort extends BaseSort {

    /**
     * sort this elements by orderType {@link OrderType}.
     * @param elements the elements is that will reorder. 
     * @param orderType order type, includes asc & desc.
     */
    sort(elements: number[]): void {
        let isSwap: boolean;
        for (let i = 0; i < elements.length; i++) {
            isSwap = false;
            for (let j = 0; j < elements.length - 1 - i; j++) {
                let cur = elements[j];
                let ele = elements[j + 1];
                if (cur - ele > 0) {
                    this.swap(elements, j, j + 1);
                    isSwap = true;
                }
            }
            if (!isSwap) {
                return;
            }
        }
    }
}


export {
    BubbleSort
}