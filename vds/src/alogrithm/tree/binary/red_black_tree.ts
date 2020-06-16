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
        newTreeNode.color = Color.Red;

        this.insertFix(newTreeNode);
        this.size++;

        return true;
    }

    private getParent(treeNode: BinaryTreeNode<T>): BinaryTreeNode<T> {
        if (treeNode) {
            return treeNode.parent;
        }
        return null;
    }

    /**
     * 对树的修正
     * @param treeNode 
     */
    private insertFix(treeNode: BinaryTreeNode<T>): void {
        // 父节点
        let parentNode = null;
        while ((parentNode = (this.getParent(treeNode))).color === Color.Red) {
            // 先祖节点
            let grandNode = this.getParent(parentNode);
            if (!grandNode) {
                return;
            }
            if (parentNode === grandNode.left) {
                // 叔父节点
                let uncleNode = grandNode.right;
                // case1 parentNode & uncleNode color both red
                // 将`parentNode`的`color`置为黑色
                // 将`uncleNode`的`color`置为黑色
                // 将`grandNode`的`color`置为红色
                // 将指针移到`grandNode`节点处
                if (uncleNode.color === Color.Red) {
                    parentNode.color = Color.Black;
                    uncleNode.color = Color.Black;
                    grandNode.color = Color.Red;
                    treeNode = grandNode;
                    continue;
                }
                // case2 该节点是父节点的右孩子
                // 将指针移到`parentNode`节点处，然后左旋
                if (treeNode === parentNode.right) {
                    treeNode = parentNode;
                    this.leftRotate(treeNode);
                }
                // case3 
                // `parentNode`颜色置为黑色
                // `grandNode`颜色置为红色
                // 右旋`grandNode`
                parentNode.color = Color.Black;
                grandNode.color = Color.Red;
                this.rightRotate(grandNode);
            } else {
                if (parentNode === grandNode.right) {
                    const uncleNode = grandNode.left;
                    if (uncleNode.color === Color.Red) {
                        parentNode.color = Color.Black;
                        uncleNode.color = Color.Black;
                        grandNode.color = Color.Red;
                        treeNode = grandNode;
                        continue;
                    }
                    if (treeNode === parentNode.left) {
                        treeNode = parentNode;
                        this.rightRotate(treeNode);
                    }
                    parentNode.color = Color.Black;
                    grandNode.color = Color.Red;
                    this.leftRotate(grandNode);
                }
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
        if (currentColor === Color.Black) {
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
        if (treeNode === this.nil) return null;
        while (treeNode.left !== this.nil) {
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
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        // 将x连接到y
        y.left = x;
        x.parent = y;

        return y;
    }

    transplant(u: BinaryTreeNode<T>, v: BinaryTreeNode<T>):void {
        if (u.parent === this.nil) {
            this.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        v.parent = u.parent;
    }
}