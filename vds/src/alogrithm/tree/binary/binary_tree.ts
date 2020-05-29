import Tree from "../tree";
import BinaryTreeNode from "./tree_node";

export default class BinaryTree<T> implements Tree<T> {

    root: BinaryTreeNode<T>;
    size: number = 0;

    public constructor(initValue?: T) {
        this.root = null;
        if (initValue) {
            this.root = this.createTreeNode(initValue);
            this.root.parent = null;
        }
    }

    public traverse(): void {

        // 按广度优先遍历
        let treeNodeList: Array<BinaryTreeNode<T>> = [];
        treeNodeList.push(this.root);

        while (treeNodeList.length > 0) {
            let tempList = new Array<BinaryTreeNode<T>>();

            for (let i = 0; i < treeNodeList.length; i++) {

                const treeNode: BinaryTreeNode<T> = treeNodeList[i];
                console.log(treeNode.value);
                if (treeNode.left) {
                    tempList.push(treeNode.left);
                }
                if (treeNode.right) {
                    tempList.push(treeNode.right);
                }
            }

            treeNodeList = [...tempList];
        }
    }

    public createTreeNode(value: T): BinaryTreeNode<T> {
        return new BinaryTreeNode(value);
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


    public print(): void {
        this.show(this.root);
    }

    private writeArray <T> (currNode: BinaryTreeNode<T>, rowIndex: number, columnIndex: number, res: string[][], treeDepth: number):void {
        // 保证输入的树不为空
        if (currNode == null) return;
        // 先将当前节点保存到二维数组中
        res[rowIndex][columnIndex] = currNode.value.toString();

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


    public show<T> (root: BinaryTreeNode<T>): void {
        if (root == null) console.log("EMPTY!");
        // 得到树的深度
        const treeDepth: number = this.getHeight();

        // 最后一行的宽度为2的（n - 1）次方乘3，再加1
        // 作为整个二维数组的宽度
        const arrayHeight: number = treeDepth * 2 - 1;
        const arrayWidth: number = (2 << (treeDepth - 2)) * 3 + 1;
        // 用一个字符串数组来存储每个位置应显示的元素

        // fixme
        let res: string[][] = [];
        // 对数组进行初始化，默认为一个空格
       
        for (let i: number = 0; i < arrayHeight; i ++) {
            let temp:string[] = [];
            for (let j = 0; j < arrayWidth; j ++) {
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
            for (let i = 0; i < line.length; i ++) {
                // sb.append(line[i]);
                sb += line[i];
                let str = line[i];
                if (str.length > 1 && i <= str.length - 1) {
                    i += line[i].length > 4 ? 2: line[i].length - 1;
                }
            }
            console.log(sb);
        }
    }


    private appendBlank(num: number): string {
        let str = '';
        for (let i = 0; i < num; i++) {
            str += '*';
        }
        return str;
    }


    public isEmpty(): boolean {
        return this.root === null && this.size === 0;
    }

    public insert(value: T): boolean {
        if (this.root === null) {
            this.root = this.createTreeNode(value);
            this.root.parent = null;
            this.size++;
            return true;
        } else {
            let current = this.root;
            let parent = current.parent;

            while (current) {
                if (value < current.value) {
                    parent = current;
                    current = current.left;
                } else if (value > current.value) {
                    parent = current;
                    current = current.right;
                } else {
                    // do nothing.
                    throw Error('you can not insert a tree node has been exists in binary tree.')
                }
            }

            if (value > parent.value) {
                let treeNode = this.createTreeNode(value);
                parent.right = treeNode;
                treeNode.parent = parent;
            } else if (value < parent.value) {
                let treeNode = this.createTreeNode(value);
                parent.left = treeNode;
                treeNode.parent = parent;
            }

            this.size++;
            return true;
        }
    }

    /**
     *  一共有四种情况。
     *  1. 删除的节点为叶子节点，直接删除
     *  2. 删除的节点只有左孩子
     *  3. 删除的节点只有右孩子
     *  4. 删除的节点左右孩子都有
     *  情况1是情况2，3的特例，可以一起处理，因此需要处理三种情况。
     *  @param value 
     */
    public remove(value: T): boolean {
        // 先查找是否有`value`这个节点
        const treeNode: BinaryTreeNode<T> = this.get(this.root, value);
        if (treeNode) {
            if (!treeNode.left) {
                // 只有右孩子
                this.transplant(treeNode, treeNode.right);
            } else if (!treeNode.right) {
                // 只有左孩子
                this.transplant(treeNode, treeNode.left);
            } else {
                // 左右孩子都有
                // 找到右子树中最大的节点,因为该节点是有右子树的，因此，该子树下的最大的节点肯定在右子树中，所以用@link{#findMax()}方法就可以
                const maxTreeNode = this.findMix(treeNode.right);
                // 如果该子树下的最大节点的`parent`不是该节点
                if (maxTreeNode.parent !== treeNode) {
                    this.transplant(maxTreeNode, maxTreeNode.right);
                    maxTreeNode.right = treeNode.right;
                    maxTreeNode.right.parent = maxTreeNode;
                }
                // 将`maxTreeNode`替换`treeNode`
                this.transplant(treeNode, maxTreeNode);
                maxTreeNode.left = treeNode.left;
                maxTreeNode.left.parent = maxTreeNode;
            }
            this.size--;
            return true;
        }
        return false;
    }

    public get(treeNode: BinaryTreeNode<T>, value: T): BinaryTreeNode<T> {
        if (!treeNode) {
            return null;
        }
        if (value < treeNode.value) {
            return this.get(treeNode.left, value);
        } else if (value > treeNode.value) {
            return this.get(treeNode.right, value);
        } else {
            return treeNode;
        }
    }

    public contains(value: T): boolean {
        let current = this.root;
        while (current) {
            let _value = current.value;
            if (value === _value) {
                return true;
            } else if (value < _value) {
                current = current.left;
            } else if (value > _value) {
                current = current.right;
            } else {
                // do nothing.
            }
        }
        return false;
    }

    /**
     * merge two binary tree into a new one binary tree
     * @param first 
     * @param second 
     */
    public merge(first: BinaryTree<T>, second: BinaryTree<T>): BinaryTree<T> {
        if (first.isEmpty() && first.isEmpty()) {
            return new BinaryTree();
        }
        if (first.isEmpty()) {
            return second;
        }
        if (second.isEmpty()) {
            return first;
        }
        if (!first.isEmpty() && !second.isEmpty()) {
            // todo
        }
        return null;

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

    /**
     * find the min tree node in this subtree.
     * @param treeNode 
     */
    private findMix(treeNode: BinaryTreeNode<T>): BinaryTreeNode<T> {
        while (treeNode.left) {
            treeNode = treeNode.left;
        }
        return treeNode;
    }

    /**
     * find the max tree node in this subtree.
     * @param treeNode 
     */
    private findMax(treeNode: BinaryTreeNode<T>): BinaryTreeNode<T> {
        if (treeNode.right) {
            return this.findMax(treeNode.right);
        }
        return treeNode;
    }

    /**
     * 后继节点表示一棵树按中序遍历，树节点的顺序中找到下一个节点。
     * 查找一个节点的后继节点
     * @param treeNode 
     */
    public successor(treeNode: BinaryTreeNode<T>): BinaryTreeNode<T> {
        // 如果该节点有右节点，则找到该右节点下的最小节点
        if (treeNode.right) {
            return this.findMix(treeNode.right);
        }
        // 逐步向上找到父节点，直到这个节点是双亲的左孩子。这样做是符合二叉树中序遍历的特性，left->parent->right
        // 遍历找到父节点是这个节点的左孩子，则表明原先节点已经是该父节点的最大的节点了。
        let current: BinaryTreeNode<T> = treeNode.parent;
        while (current && treeNode === current.right) {
            treeNode = current;
            current = current.parent;
        }
        return current;
    }

    /**
     * 查找节点的前继节点
     * @param treeNode 
     */
    public predecessor(treeNode: BinaryTreeNode<T>): BinaryTreeNode<T> {
        // 如果该节点有左子树，则找到该节点下面最大的左节点
        if (treeNode.left) {
            return this.findMax(treeNode.left);
        }
        // 如果该节点没有左节点
        let current: BinaryTreeNode<T> = treeNode.parent;
        while (current && treeNode === current.left) {
            treeNode = current;
            current = current.parent;
        }
        return current;
    }

    /**
     * 将`target`子树替换为`replace`
     * @param target 
     * @param replace 
     */
    private transplant(target: BinaryTreeNode<T>, replacer: BinaryTreeNode<T>): void {
        // 如果`target`的`parent`为空，则将`replace`替换为`root`
        if (!target.parent) {
            this.root = replacer;
        } else if (target === target.parent.left) {
            // 如果`target`是`parent`的左孩子，则将`replace`赋给`parent`的左孩子
            target.parent.left = replacer;
        } else {
            // 如果`target`是`parent`的右孩子，则将`replace`赋给`parent`的右孩子
            target.parent.right = replacer;
        }
        // 如果`replacer`不为空，将`replacer`的`parent`连接到`target.parent`上
        if (replacer) {
            replacer.parent = target.parent;
        }
    }



}