import Tree from '../tree';
import AbstractBinaryTree from './abstract_binary_tree';
import BinaryTreeNode from './tree_node';
/**
 * AVL Tree 
 * 
 * 性质：AVL树是每个节点的左子树和右子树的高度最多相差1的二叉查找树。
 * 
 * 
 * 
 */
export default class AVLTree<T> extends AbstractBinaryTree<T> {

    MAX_HEIGHT_OFFSET:number = 1;

    public insert(value: T): boolean {
        this.root = this.insertTreeNode(this.root, value);
        this.size++;
        return true;
    }


    public remove(value: T): boolean {
        this.root = this.removeTreeNode(this.root, value);
        this.size--;
        return true;
    }


    private insertTreeNode(treeNode: BinaryTreeNode<T>, value: T): BinaryTreeNode<T> {
        if (!treeNode) {
            return this.createTreeNode(value);
        }
        const compareResult = this.compare(value, treeNode.value);
        if (compareResult > 0) {
            treeNode.right = this.insertTreeNode(treeNode.right, value);
        } else if (compareResult < 0) {
            treeNode.left = this.insertTreeNode(treeNode.left, value);
        } else {
            // duplicate do nothing.
        }
        return this.balance(treeNode);
    }

    private getHeightOffset(treeNode: BinaryTreeNode<T>) {
        return this.getTreeNodeHeight(treeNode.left) - this.getTreeNodeHeight(treeNode.right);
    }

    private balance(treeNode: BinaryTreeNode<T>): BinaryTreeNode<T> {
        if (!treeNode) {
            return treeNode;
        }
        if (this.getHeightOffset(treeNode) > this.MAX_HEIGHT_OFFSET) {
            if (this.getTreeNodeHeight(treeNode.left.left) >= this.getTreeNodeHeight(treeNode.left.right)) {
                // Left-Left case, should rotate right.
                /**
                 *           k2                                   k1
                 *          / \                                  /  \
                 *         k1  T4                              k3    k2
                 *        /  \      rotate right (k2)         /  \   / \  
                 *       k3  T3     ----------------->       T1  T2 T3  T4
                 *      / \
                 *     T1  T2       
                 */
                treeNode = this.rightRotate(treeNode);
            } else {
                // Left-Right case, should rotate twice, first should rotate left, and next should rotate right.
                /**
                 *
                 *           k3                                       k3                                       k2
                 *          /  \                                     /  \                                    /    \
                 *        k1   T4                                   k2  T4                                  k1     k3
                 *       / \            rotate left (k1)           /  \         rotate right (k3)          /  \   /  \
                 *      T1  k2         ------------------>        k1  T3       ------------------->       T1  T2 T3  T4
                 *         /  \                                  / \   
                 *        T2  T3                                T1  T2  
                 * 
                 */
                treeNode.left = this.leftRotate(treeNode.left);
                treeNode = this.rightRotate(treeNode);
            }
        } else if (this.getHeightOffset(treeNode) < this.MAX_HEIGHT_OFFSET * (-1)) {
            if (this.getTreeNodeHeight(treeNode.right.right) >= this.getTreeNodeHeight(treeNode.right.left)) {
                // Right-Right case, shoult rotate left.
                /**
                 * 
                 * 
                 *         k1                                       k2
                 *        /  \                                    /    \
                 *       T1  k2                                  k1     k3
                 *          /  \        left rotate (k1)        /  \   /  \
                 *         T2  k3       ----------------->     T1  T2 T3  T4
                 *            /  \ 
                 *           T3   T4
                 */ 
                treeNode = this.leftRotate(treeNode);
            } else {
                // Right-Left case, should rotate twice, first should rotate right, and next should rotate left.
                /**
                 *        k1                                k1                                    k2
                 *       / \                               /  \                                 /    \
                 *      T1  k3                            T1  k2                               k1     k3     
                 *         /  \    right rotate (k3)         /  \      left rotate (k1)       /  \   /  \
                 *        k2  T4   ----------------->       T2  k3     ---------------->     T1  T2 T3   T4
                 *       /  \                                  /  \
                 *      T2  T3                                T3  T4 
                 * 
                 */
                treeNode.right = this.rightRotate(treeNode.right);
                treeNode = this.leftRotate(treeNode);
            }
        }
        treeNode.height = Math.max(this.getTreeNodeHeight(treeNode.left), this.getTreeNodeHeight(treeNode.right)) + 1;
        return treeNode;
    }

    /**
     * 右旋
     * @param k2 
     */
    private rightRotate(k2: BinaryTreeNode<T>): BinaryTreeNode<T> {
        const k1: BinaryTreeNode<T> = k2.left;
        k2.left = k1.right;
        k1.right = k2;
        k2.height = Math.max(this.getTreeNodeHeight(k2.left), this.getTreeNodeHeight(k2.right)) + 1;
        k1.height = Math.max(this.getTreeNodeHeight(k1.left), k2.height) + 1;
        return k1;
    }

    /**
     * 左旋
     */
    private leftRotate(k1: BinaryTreeNode<T>): BinaryTreeNode<T> {
        const k2: BinaryTreeNode<T> = k1.right;
        k1.right = k2.left;
        k2.left = k1;
        k1.height = Math.max(this.getTreeNodeHeight(k1.left), this.getTreeNodeHeight(k2.right));
        k2.height = Math.max(k1.height, this.getTreeNodeHeight(k2.right)) + 1;
        return k2;
    }

    private getTreeNodeHeight(treeNode: BinaryTreeNode<T>): number {
        if (!treeNode) return 0;
        return Math.max(this.getTreeNodeHeight(treeNode.left), this.getTreeNodeHeight(treeNode.right)) + 1;
    }

    private removeTreeNode(treeNode: BinaryTreeNode<T>, value: T): BinaryTreeNode<T> {
        if (!treeNode) {
            return treeNode;
        }
        const compareResult = this.compare(value, treeNode.value);
        if (compareResult < 0) {
            treeNode.left = this.removeTreeNode(treeNode.left, value);
        } else if (compareResult > 0) {
            treeNode.right = this.removeTreeNode(treeNode.right, value);
        } else if (treeNode.left && treeNode.right) {
            treeNode.value = this.findMix(treeNode.right).value;
            treeNode.right = this.removeTreeNode(treeNode.right, treeNode.value);
        } else {
            treeNode = treeNode.left ? treeNode.left : treeNode.right;
        }
        return this.balance(treeNode);
    }

      /**
     * find the min tree node in this subtree.
     * @param treeNode 
     */
    private findMix(treeNode: BinaryTreeNode<T>): BinaryTreeNode<T> {
        if (!treeNode) return null;
        while (treeNode.left) {
            treeNode = treeNode.left;
        }
        return treeNode;
    }


  
}