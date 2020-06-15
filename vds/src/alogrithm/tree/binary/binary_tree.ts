import Tree from "../tree";
import BinaryTreeNode from "../entity/tree_node";
import AbstractBinaryTree from './abstract_binary_tree';

export default class BinaryTree<T> extends AbstractBinaryTree<T> {

    /**
     * 插入元素
     * @param value 
     */
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
                if (this.compare(value, current.value) < 0) {
                    parent = current;
                    current = current.left;
                } else if (this.compare(value, current.value) > 0) {
                    parent = current;
                    current = current.right;
                } else {
                    // do nothing.
                    throw Error('you can not insert a tree node has been exists in binary tree.')
                }
            }

            if (this.compare(value, parent.value) > 0) {
                let treeNode = this.createTreeNode(value);
                parent.right = treeNode;
                treeNode.parent = parent;
            } else if (this.compare(value, parent.value) < 0) {
                let treeNode = this.createTreeNode(value);
                parent.left = treeNode;
                treeNode.parent = parent;
            }

            this.size++;
            return true;
        }
    }



    /**
     *  删除元素
     * 
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
                // 删除的节点只有右孩子
                this.transplant(treeNode, treeNode.right);
            } else if (!treeNode.right) {
                // 删除的节点只有左孩子
                this.transplant(treeNode, treeNode.left);
            } else {
                // 删除的即诶单左右孩子都有
                // 找到右子树中最小的节点
                const minTreeNode = this.findMix(treeNode.right);
                // 如果要删除得节点不是`minTreeNode`的`parent`
                if (minTreeNode.parent !== treeNode) {
                    this.transplant(minTreeNode, minTreeNode.right);
                    minTreeNode.right = treeNode.right;
                    minTreeNode.right.parent = minTreeNode;
                }
                // 将`minTreeNode`替换`treeNode`
                this.transplant(treeNode, minTreeNode);
                minTreeNode.left = treeNode.left;
                minTreeNode.left.parent = minTreeNode;
            }
            this.size--;
            return true;
        }
        return false;
    }

    /**
     * 通过`value`获取二叉树的节点
     * @param treeNode 
     * @param value 
     */
    public get(treeNode: BinaryTreeNode<T>, value: T): BinaryTreeNode<T> {
        if (!treeNode) {
            return null;
        }
        if (this.compare(value, treeNode.value) < 0) {
            return this.get(treeNode.left, value);
        } else if (this.compare(value, treeNode.value) > 0) {
            return this.get(treeNode.right, value);
        } else {
            return treeNode;
        }
    }

    /**
     * todo
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

    /**
     * find the min tree node in this subtree.
     * @param treeNode 
     */
    public findMix(treeNode: BinaryTreeNode<T>): BinaryTreeNode<T> {
        if (!treeNode) return null;
        while (treeNode.left) {
            treeNode = treeNode.left;
        }
        return treeNode;
    }

    /**
     * find the max tree node in this subtree.
     * @param treeNode 
     */
    public findMax(treeNode: BinaryTreeNode<T>): BinaryTreeNode<T> {
        if (!treeNode) return null;
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