import BinaryTreeNode from '../entity/tree_node';
import Tree from '../tree';
import BinaryTreeIterator from '../interface/intreface_iterator';
import TreePrint from '../interface/interface_print';

export default abstract class AbstractBinaryTree<T> implements Tree<T>, BinaryTreeIterator, TreePrint {

    root: BinaryTreeNode<T> = null;
    size: number = 0;
    /**
     * (target: T, source: T) => {
     *    return {number};
     * }
     * 
     * 通过compareFunc比较binary tree中两个节点的大小, 期望返回: 0, -1, 1
     * 如果返回0,表示`target`===`source`;
     * 返回-1，表示`target`<`source`;
     * 返回1，表示`target`>`source`;
     * 
     */
    compareFunc: Function = null;
    /**
     * 
     * 打印元素的方法回调
     * 
     */
    printFunc: Function = null;

    /**
     * 
     * @param initValue 初始化树的根元素
     * @param compareFunc 树元素之间比较的方法
     * @param printFunc 打印元素的方法回调
     */
    public constructor(initValue?: T, compareFunc: Function = null, printFunc: Function = null) {
        this.root = null;
        if (initValue) {
            this.root = this.createTreeNode(initValue);
            this.root.parent = null;
            this.size++;
        }
        this.compareFunc = compareFunc;
        this.printFunc = printFunc;
    }

    print(): void {
        this.show(this.root);
    }

    isEmpty(): boolean {
        return this.root === null && this.size === 0;
    }

    public createTreeNode(value: T): BinaryTreeNode<T> {
        return new BinaryTreeNode(value);
    }

    private show<T>(root: BinaryTreeNode<T>): void {
        if (root == null) console.log("EMPTY!");
        // 得到树的深度
        const treeDepth: number = this.getHeight();

        // 最后一行的宽度为2的（n - 1）次方乘3，再加1
        // 作为整个二维数组的宽度
        const arrayHeight: number = treeDepth * 2 - 1;
        const arrayWidth: number = (2 << (treeDepth - 2)) * 3 + 1;
        // 用一个字符串数组来存储每个位置应显示的元素

        let res: string[][] = [];
        // 对数组进行初始化，默认为一个空格

        for (let i: number = 0; i < arrayHeight; i++) {
            let temp: string[] = [];
            for (let j = 0; j < arrayWidth; j++) {
                temp.push(" ");
            }
            res.push(temp);
        }

        // 从根节点开始，递归处理整个树
        this.writeArray(root, 0, Math.floor(arrayWidth / 2), res, treeDepth);

        // 此时，已经将所有需要显示的元素储存到了二维数组中，将其拼接并打印即可
        for (let j = 0; j < res.length; j++) {
            let line: string[] = res[j];
            let sb = '';
            for (let i = 0; i < line.length; i++) {
                sb += line[i];
                let str = line[i];
                if (str && str.length > 1 && i <= str.length - 1) {
                    i += line[i].length > 4 ? 2 : line[i].length - 1;
                }
            }
            console.log(sb);
        }
    }

    private writeArray<T>(currNode: BinaryTreeNode<T>, rowIndex: number, columnIndex: number, res: string[][], treeDepth: number): void {
        // 保证输入的树不为空
        if (currNode == null) return;
        // 先将当前节点保存到二维数组中
        res[rowIndex][columnIndex] = this.printFunc ? this.printFunc(currNode) : currNode.value.toString();

        // 计算当前位于树的第几层
        const currLevel: number = Math.floor((rowIndex + 1) / 2);
        // 若到了最后一层，则返回
        if (currLevel == treeDepth) return;
        // 计算当前行到下一行，每个元素之间的间隔（下一行的列索引与当前元素的列索引之间的间隔）
        const gap: number = treeDepth - currLevel - 1;

        // 对左儿子进行判断，若有左儿子，则记录相应的"/"与左儿子的值
        if (currNode.left) {
            res[rowIndex + 1][columnIndex - gap] = "/";
            this.writeArray(currNode.left, rowIndex + 2, columnIndex - gap * 2, res, treeDepth);
        }

        // 对右儿子进行判断，若有右儿子，则记录相应的"\"与右儿子的值
        if (currNode.right) {
            res[rowIndex + 1][columnIndex + gap] = "\\";
            this.writeArray(currNode.right, rowIndex + 2, columnIndex + gap * 2, res, treeDepth);
        }
    }

    /**
     * compare `target` to `source`.
     * if there are equals, return 0,
     * if `target` great than `source`, return 1,
     * otherwise, return -1.
     * @param target 
     * @param source 
     */
    protected compare(target: T, source: T): number {
        if (this.compareFunc) {
            return this.compareFunc(target, source);
        }
        return target > source ? 1 : (target < source ? -1 : 0);
    }

    public preOrder() {
        this._preOrder(this.root);
    }

    public inOrder() {
        this._inOrder(this.root);
    }

    public postOrder() {
        this._postOrder(this.root);
    }

    private _preOrder(treeNode: BinaryTreeNode<T>): void {
        if (!treeNode) {
            return;
        }
        console.log(treeNode.value);
        this._preOrder(treeNode.left);
        this._preOrder(treeNode.right);
    }

    private _inOrder(treeNode: BinaryTreeNode<T>): void {
        if (!treeNode) {
            return;
        }
        this._inOrder(treeNode.left);
        console.log(treeNode.value);
        this._inOrder(treeNode.right);
    }

    private _postOrder(treeNode: BinaryTreeNode<T>): void {
        if (!treeNode) {
            return;
        }
        this._postOrder(treeNode.left);
        this._postOrder(treeNode.right);
        console.log(treeNode.value);
    }

    public contains(value: T): boolean {
        let current = this.root;
        while (current) {
            let _value = current.value;
            if (this.compare(value, _value) === 0) {
                return true;
            } else if (this.compare(value, _value) < 0) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }

    public getHeight(): number {
        return this.getMaxDeep(this.root);
    }

    private getMaxDeep(treeNode: BinaryTreeNode<T>): number {
        if (!treeNode) {
            return 0;
        }
        return Math.max(this.getMaxDeep(treeNode.left), this.getMaxDeep(treeNode.right)) + 1;
    }

    public traverse(): void {

        // 按广度优先遍历
        let treeNodeList: Array<BinaryTreeNode<T>> = [];
        treeNodeList.push(this.root);

        while (treeNodeList.length > 0) {
            let tempList = new Array<BinaryTreeNode<T>>();
            let sb = '';
            for (let i = 0; i < treeNodeList.length; i++) {

                const treeNode: BinaryTreeNode<T> = treeNodeList[i];
                sb += treeNode.value + " ";
                if (treeNode.left) {
                    tempList.push(treeNode.left);
                }
                if (treeNode.right) {
                    tempList.push(treeNode.right);
                }
            }
            console.log(sb);
            treeNodeList = [...tempList];
        }
    }

    abstract insert(value: T): boolean;

    abstract remove(value: T): boolean;

}