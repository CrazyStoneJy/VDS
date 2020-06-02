import IHeap from "./interface_heap";

/**
 * 数据结构堆
 * 是由数组实现的一种完全二叉树的数据结构。
 * 大根堆的特性，父节点永远大于其子节点
 * 
 * 大根堆事例：
 *                      16
 *                    /    \
 *                   14     10
 *                  /  \    / \
 *                 8    7  9    3
 *                / \  /
 *               2   4 1
 * 
 * 实际数组数据结构的存储：
 * 
 * [ 16, 14, 10, 8, 7, 9, 3, 2, 4, 1 ]
 * 
 * 插入操作：
 * 每次将新增的节点插入到数组的末尾，然后通过`Math.floor(currentIndex >> 1)`向上找到父级节点，与父级节点比较，如果该
 * 节点大于父级节点，则与父节点交换位置，一直重复直到遍历到数组`index=0`的位置.
 * 
 * 删除操作：
 * 移除数组`index=0`的元素，并且将末尾的元素移动到数组`index=0`的位置，然后通过`currentIndex * 2 + 1`,`currentIndex * 2 + 2`查找数组的左右孩子
 * 
 *              
 */
export default class Heap<T> implements IHeap<T>{

    private _size: number = 0;
    private list: T[] = [];
    /**
     * 是不是大根堆的标识
     */
    private isBig: boolean = true;

    private compareFunc: Function = null;

    constructor(big: boolean = true, compareFunc: Function = null) {
        this.isBig = big;
        this.compareFunc = compareFunc;
    }
    
    clear(): void {
        this._size = 0;
        this.list = [];
    }

    public add(element: T): boolean {

        this.list.push(element);
        let currentIndex = this.list.length - 1;
    
        while (currentIndex > 0) {
            let parentIndex = Math.floor(currentIndex >> 1);
            if (this.condition(this.list[currentIndex], this.list[parentIndex])) {
                this.exchange(this.list, currentIndex, parentIndex);
            }
            currentIndex = parentIndex;
        }
        this._size++;
        return true;
    }

    private condition(target: T, source: T): boolean {
        if (this.compareFunc) {
            return this.compareFunc(target, source);
        }
        return this.isBig ? target >= source : target <= source;
    }

    /**
     * 交换数组array中`index`为`target`与`source`元素的位置。
     * @param array 
     * @param target 
     * @param source 
     */
    private exchange(array: T[], target: number, source: number) {
        let targetElement = array[target];
        let sourceElement = array[source];
        array[target] = sourceElement;
        array[source] = targetElement;
    }

    public remove(): T {

        let removedElement = this.list[0];
        this.list[0] = this.list[this.list.length - 1];
        // 删除末尾的元素
        this.list.splice(this.list.length - 1, 1);

        let currentIndex = 0;

        while (currentIndex < this.list.length) {
            const leftIndex = currentIndex * 2 + 1;
            const rightIndex = currentIndex * 2 + 2;

            if (leftIndex > this.list.length) {
                break;
            }

            let childIndex = leftIndex;
            if (this.condition(this.list[rightIndex], this.list[leftIndex])) {
                childIndex = rightIndex;
            }

            if (this.condition(this.list[childIndex], this.list[currentIndex])) {
                this.exchange(this.list, currentIndex, childIndex);
                currentIndex = childIndex;
            } else {
                break;
            }
        }

        this._size--;

        return removedElement;
    }

    public size(): number {
        return this._size;
    }

    public isEmpty(): boolean {
        return this.size() == 0;
    }

    public print(): void {
        if (this.size() > 0) {
            let currentIndex = 0; 
            let array: number[] = [];
            array.push(0);
            while (array.length > 0) {
                let tempList: number[] = [];
                let levelString = '';
                for (let i = 0; i < array.length; i++) {
                    const currentIndex:number = array[i];
                    levelString += (typeof this.list[currentIndex] !== 'string') ? (JSON.stringify(this.list[currentIndex]) + " ") : (this.list[currentIndex] + " ");
                    const leftIndex = currentIndex * 2 + 1;
                    const rightIndex = currentIndex * 2 + 2;
                    if (leftIndex < this.size()) {
                        tempList.push(leftIndex);
                    }
                    if (rightIndex < this.size()) {
                        tempList.push(rightIndex);
                    }
                }
                console.log(levelString);
                array = [...tempList];
            }
        }
    }

    public printUseTree() {
        // todo 使用树形打印heap结构
        console.log('printUseTree 待实现');
    }

}