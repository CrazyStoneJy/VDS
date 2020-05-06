import Tree from "../tree";
import BinaryTreeNode from "./tree_node";

export default class BinaryTree<T> implements Tree<T> {

    root: BinaryTreeNode<T>;
    size: number = 0;

    constructor(initValue?: T) {
        this.root = null;
        if (initValue) {
            this.root = this.createTreeNode(initValue);
            this.root.parent = null;
        }
    }

    createTreeNode(value: T): BinaryTreeNode<T> {
        return new BinaryTreeNode(value);
    }

    /**
     * 深度优先遍历
     */
    traversal(): void {
         this.inOrder(this.root);
        // if (this.root) {
           
        //     let level = 1;
        //     let current = this.root;
        //     while (level < this.getHeight()) {
        //         let left = current.left;
        //         let right = current.right;
                
        //     }

        // }
    }

    deepTraversal(root: BinaryTreeNode<T>):void {
        if(!root.left) {
            return;
        }
        if(!root.right) {
            return;
        }
        
        while (root.left ) {

        }

    }


    preOrder(treeNode: BinaryTreeNode<T>): void {
        if (!treeNode) {
            return;
        }
        console.log(treeNode.value);
        this.preOrder(treeNode.left);
        this.preOrder(treeNode.right);
    }

    inOrder(treeNode: BinaryTreeNode<T>): void {
        if (!treeNode) {
            return;
        }
        this.inOrder(treeNode.left);
        console.log(treeNode.value);
        this.inOrder(treeNode.right);
    }

    postOrder(treeNode: BinaryTreeNode<T>): void {
        if (!treeNode) {
            return;
        }
        this.postOrder(treeNode.left);
        this.postOrder(treeNode.right);
        console.log(treeNode.value);
    }


    print(): void {
        throw new Error("Method not implemented.");
    }

    isEmpty(): boolean {
        return this.root === null && this.size === 0;
    }

    insert(value: T): boolean {
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
        return false;
    }

    remove(value: T): boolean {
        if (!this.root) {
            return false;
        }
        let current = this.root;
        let parent = this.root.parent;
        while (current) {
            if (current.value === value) {
                break;
            } else if (value > current.value) {
                parent = current;
                current = current.right;
            } else if (value < current.value) {
                parent = current;
                current = current.left;
            } else {
                // do nothing.
            }
        }

        if (!current) {
            return false;
        }

        // 要删除的节点没有左孩子和右孩子
        if (!current.left && !current.right) {
            if (current === this.root) {
                this.root = null;
                return true;
            } else {
                if (current === parent.left) {
                    parent.left = null;
                } else if (current === parent.right) {
                    parent.right =null;
                } else {
                    // do nothing.
                }
            }
        }
        // todo
        

        return false;
    }

    contains(value: T): boolean {
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
    merge(first: BinaryTree<T>, second: BinaryTree<T>): BinaryTree<T> {
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

    getHeight(): number {
        return this.getMaxDeep(this.root);
    }

    private getMaxDeep(treeNode: BinaryTreeNode<T>): number {
        if (!treeNode) {
            return 0;
        }
        return Math.max(this.getMaxDeep(treeNode.left), this.getMaxDeep(treeNode.right)) + 1;
    }

}