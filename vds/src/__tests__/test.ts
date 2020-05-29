
import BinaryTree from '../alogrithm/tree/binary/binary_tree';
import Stack from '../alogrithm/stack/stack_impl';
import OperatorTree from '../alogrithm/tree/binary/operator_tree';
import BinaryTreeNode from '../alogrithm/tree/binary/tree_node';

describe("test", () => {

    test('tree', () => {

       

    });

    test('remove element of binary tree', () => {

        let binaryTree = new BinaryTree<number>();
        binaryTree.insert(15);
        binaryTree.insert(6);
        binaryTree.insert(3);
        binaryTree.insert(7);
        binaryTree.insert(2);
        binaryTree.insert(4);
        binaryTree.insert(13);
        binaryTree.insert(9);
        binaryTree.insert(8);
        binaryTree.insert(18);
        binaryTree.insert(20);
        binaryTree.insert(14);

        binaryTree.show(binaryTree.root);

        // remove the tree node that have left node and right node.
        printRemovedTree(13, binaryTree);

        // remove the tree node that only have left node.
        printRemovedTree(14, binaryTree);

        // remove the tree node that only have right node.
        printRemovedTree(18, binaryTree);

        // remove leave tree node.
        printRemovedTree(2, binaryTree);

    });


});

function printRemovedTree(removeBinaryTreeNode: number, binaryTree: BinaryTree<number>) {
    let removedElement = removeBinaryTreeNode;
    binaryTree.remove(removedElement);
    console.log(`remove element of ${removedElement}:`);
    binaryTree.show(binaryTree.root);
}