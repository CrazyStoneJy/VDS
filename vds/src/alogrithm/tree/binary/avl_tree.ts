import Tree from '../tree';
import AbstractBinaryTree from './abstract_binary_tree';
/**
 * AVL Tree 
 * 
 * 性质：AVL树是每个节点的左子树和右子树的高度最多相差1的二叉查找树。
 * 
 * 
 * 
 */
class AVLTree<T> extends AbstractBinaryTree<T> {

    insert(value: T): boolean {
        throw new Error("Method not implemented.");
    }

    remove(value: T): boolean {
        throw new Error("Method not implemented.");
    }

  
}