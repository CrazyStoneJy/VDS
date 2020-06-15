import AbstractBinaryTree from "./abstract_binary_tree";
import BinaryTreeNode from "../entity/tree_node";
import { Color } from "../entity/color";

/**
 * 
 * 这是红黑树的实现。
 * 
 *  红黑树的性质如下:
 *  1. 每个节点或是红色，或是黑色。
 *  2. 根节点是黑色的。
 *  3. 每个叶子节点(NIL)都是黑色的。 
 *  4. 如果有一个节点是红色，那么它的两个子节点都为黑色。
 *  5. 对于每个节点，从该节点到其所有后代的叶子节点的简单路径上，均包含相同数目的黑色节点。
 * 
 */
export default class RedBlackTree<T> extends AbstractBinaryTree<T> {

    /**
     * value为null的黑色叶子节点
     */
    nil: BinaryTreeNode<T> = null;

    constructor() {
        super();
        this.nil = this.createBlackLeaf();
    }

    setPrintFunc(printFunc: Function) {
        this.printFunc = printFunc;
    }

    setCompareFunc(compareFunc: Function) {
        this.compareFunc = compareFunc;
    }

    public insert(value: T): boolean {
        let current = this.root;
        let parent = this.nil;
        while (current !== this.nil && current) {
            parent = current;
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        const newTreeNode = this.createRBNode(value);
        newTreeNode.parent = parent;
        if (parent === this.nil) {
            this.root = newTreeNode;
        } else if (value < parent.value) {
            parent.left = newTreeNode;
        } else {
            parent.right = newTreeNode;
        }

        newTreeNode.left = this.nil;
        newTreeNode.right = this.nil;

        this.insertFix(newTreeNode);
        this.size++;

        return true;
    }

    private insertFix(treeNode: BinaryTreeNode<T>): void {
        while (treeNode.parent.color === Color.Red) {
            if (treeNode.parent === treeNode.parent.parent.left) {
                // todo 列一下case
                const uncleNode = treeNode.parent.parent.right;
                if (uncleNode.color === Color.Red) {
                     treeNode.parent.color = Color.Black;
                     uncleNode.color = Color.Black;
                     treeNode = treeNode.parent.parent;
                } else if (treeNode === treeNode.parent.right) {
                    treeNode = treeNode.parent;
                    this.leftRotate(treeNode);
                }
                treeNode.parent.color = Color.Black;
                treeNode.parent.parent.color = Color.Red;
                this.rightRotate(treeNode.parent.parent);
            } else {
                if (treeNode.parent === treeNode.parent.parent.right) {
                    const uncleNode = treeNode.parent.parent.left;
                    if (uncleNode.color === Color.Red) {
                        treeNode.parent.color = Color.Black;
                        uncleNode.color = Color.Black;
                        treeNode = treeNode.parent.parent;
                    } else if (treeNode === treeNode.parent.left) {
                        treeNode = treeNode.parent;
                        this.rightRotate(treeNode);
                    }
                    treeNode.parent.color = Color.Black;
                    treeNode.parent.parent.color = Color.Red;
                    this.leftRotate(treeNode.parent.parent);
                }
                // with 'right' and 'left' change.
            }
        }
        this.root.color = Color.Black;
    }

    public remove(value: T): boolean {
        const treeNode: BinaryTreeNode<T> = this.get(this.root, value);
        if (!treeNode) {
            return false;
        }

        let current = treeNode;
        let x = null;
        let currentColor = current.color;
        if (treeNode.left === this.nil) {
            x = treeNode.right;
            this.transplant(treeNode, treeNode.right);
        } else if (treeNode.right === this.nil) {
            x = treeNode.left;
            this.transplant(treeNode, treeNode.left);
        } else {
            current = this.findMix(treeNode.right);
            currentColor = current.color;
            x = current.right;
            if (current.parent === treeNode) {
                x.parent = current;
            } else {
                this.transplant(current, current.right);
                current.right = treeNode.right;
                current.right.parent = current;
            }
            this.transplant(treeNode, current);
            current.left = treeNode.left;
            current.left.parent = current;
            current.color = treeNode.color;
        }
        if (current.color === Color.Black) {
            this.deleteFix(x);
        }

        this.size--;
        return true;
    }


    private deleteFix(treeNode: BinaryTreeNode<T>): void {
        while (treeNode !== this.nil && treeNode.color === Color.Black) {
            let w: BinaryTreeNode<T> = null;
            if (treeNode === treeNode.parent.left) {
                w = treeNode.parent.right;
                if (w.color === Color.Red) {
                    w.color = Color.Black;
                    treeNode.parent.color = Color.Red;
                    this.leftRotate(treeNode.parent);
                    w = treeNode.parent.right;
                }
                if (w.left.color === Color.Black && w.right.color === Color.Black) {
                    w.color = Color.Red;
                    treeNode = treeNode.parent;
                } else if (w.right.color === Color.Black) {
                    w.left.color = Color.Black;
                    w.color = Color.Red;
                    this.rightRotate(w);
                    w = treeNode.parent.right;
                }
                w.color = treeNode.parent.color;
                treeNode.parent.color = Color.Black;
                w.right.color = Color.Black;
                this.leftRotate(treeNode.parent);
                treeNode = this.root;
            } else {
                w = treeNode.parent.left;
                if (w.color === Color.Red) {
                    w.color = Color.Black;
                    treeNode.parent.color = Color.Red;
                    this.rightRotate(treeNode.parent);
                    w = treeNode.parent.left;
                }
                if (w.left.color === Color.Black && w.right.color === Color.Black) {
                    w.color = Color.Red;
                    treeNode = treeNode.parent;
                } else if (w.left.color === Color.Black) {
                    w.right.color = Color.Black;
                    w.color = Color.Red;
                    this.leftRotate(w);
                    w = treeNode.parent.left;
                }
                w.color = treeNode.parent.color;
                treeNode.parent.color = Color.Black;
                w.left.color = Color.Black;
                this.rightRotate(treeNode.parent);
                treeNode = this.root;
            }
        }
        treeNode.color = Color.Black;
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

    private transplant(u: BinaryTreeNode<T>, v: BinaryTreeNode<T>): void {
        if (u.parent === this.nil) {
            this.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        v.parent = u.parent;
    }

    private createRBNode(value: T) {
        return new BinaryTreeNode(value, null, null, null, 0, Color.Red);
    }

    /**
     * 创建一个value为null的黑色叶子节点
     */
    private createBlackLeaf() {
        return new BinaryTreeNode(null, null, null, null, 0, Color.Black);
    }

    private isNil(treeNode: BinaryTreeNode<T>): boolean {
        if (treeNode) {
            const color = treeNode.color;
            const value = treeNode.value;
            return value === null && color === Color.Black;
        }
        return false;
    }

    /**
     * 
     *      y                               x
     *     / \                             / \
     *    x  T3   rotate right (y)        T1  y
     *   / \      ---------------->          / \
     *  T1 T2                               T2  T3
     * 
     * 二叉树的连接操作一般分为两步：
     * 1.将x节点赋值到y的右节点或者左节点上
     * 2.将x的parent设置为y
     *  
     */
    private rightRotate(y: BinaryTreeNode<T>): BinaryTreeNode<T> {
        const x: BinaryTreeNode<T> = y.left;

        y.left = x.right;
        if (x.right !== this.nil) {
            y.left.parent = y;
        }

        // 将y的父节点赋值给x
        x.parent = y.parent;
        // 将x与y的父节点连接起来
        if (y.parent === this.nil) {
            this.root = x;
        } else if (y === y.parent.left) {
            y.parent.left = x;
        } else {
            y.parent.right = x;
        }

        // 将y连接到x
        x.right = y;
        y.parent = x;

        return x;
    }


    /**
     * 
     *    x                              y                          
     *   / \                            / \
     *  T1  y     rotate left (x)      x  T3
     *     / \   ---------------->    / \
     *    T2  T3                     T1 T2  
     */
    private leftRotate(x: BinaryTreeNode<T>): BinaryTreeNode<T> {
        const y: BinaryTreeNode<T> = x.right;
        
        // 将y的左孩子赋值给x的右孩子
        x.right = y.left;
        if (y.left !== this.nil) {
            y.left.parent = x;
        }

        // 将y连接到x.parent
        y.parent = x.parent;
        if (x.parent === this.nil) {
            this.root = y;
        } else if (x === x.parent.left){
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        // 将x连接到y
        y.left = x;
        x.parent = y;

        return y;
    }



}