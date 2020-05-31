
import BinaryTree from '../alogrithm/tree/binary/binary_tree';
import Stack from '../alogrithm/stack/stack_impl';
import OperatorTree from '../alogrithm/tree/binary/operator_tree';
import BinaryTreeNode from '../alogrithm/tree/binary/tree_node';

describe("tree", () => {

    test('foo', () => {
        console.log('test foo');
    });

    // test('tree basic operate', () => {
        
    //     let  binaryTree = new BinaryTree<number>();
    //     binaryTree.insert(10);
    //     binaryTree.insert(3);
    //     binaryTree.insert(7);
    //     binaryTree.insert(15);
    //     binaryTree.insert(4);
        
    //     binaryTree.print();

    //     console.log('binary tree is contains 5 ?', binaryTree.contains(5));

    //     console.log('binary tree is contains 15 ?', binaryTree.contains(15));

    //     const minTreeNode = binaryTree.findMix(binaryTree.root);
    //     console.log('min tree node of binary tree :', minTreeNode ? minTreeNode.value : '');

    //     const maxTreeNode = binaryTree.findMax(binaryTree.root);
    //     console.log('max tree node of binary tree:', maxTreeNode ?maxTreeNode.value : '');

    //     console.log('height of the binary tree:', binaryTree.getHeight());

    //     console.log('the binary tree is empty?', binaryTree.isEmpty());

    //     console.log('binary tree pre order');

    //     binaryTree.preOrder();

    //     console.log('binary tree in order');

    //     binaryTree.inOrder();

    //     console.log('binary tree post order');

    //     binaryTree.postOrder();

    //     console.log('binary tree breadth-first traverse');

    //     binaryTree.traverse(); 


       

    // });

    // test('remove element of binary tree', () => {

    //     let binaryTree = new BinaryTree<number>();
    //     binaryTree.insert(15);
    //     binaryTree.insert(6);
    //     binaryTree.insert(3);
    //     binaryTree.insert(7);
    //     binaryTree.insert(2);
    //     binaryTree.insert(4);
    //     binaryTree.insert(13);
    //     binaryTree.insert(9);
    //     binaryTree.insert(8);
    //     binaryTree.insert(18);
    //     binaryTree.insert(20);
    //     binaryTree.insert(14);

    //     binaryTree.show(binaryTree.root);

    //     // remove the tree node that have left node and right node.
    //     printRemovedTree(13, binaryTree);

    //     // remove the tree node that only have left node.
    //     printRemovedTree(14, binaryTree);

    //     // remove the tree node that only have right node.
    //     printRemovedTree(18, binaryTree);

    //     // remove leave tree node.
    //     printRemovedTree(2, binaryTree);

    // });

});

function printRemovedTree(removeBinaryTreeNode: number, binaryTree: BinaryTree<number>) {
    let removedElement = removeBinaryTreeNode;
    binaryTree.remove(removedElement);
    console.log(`remove element of ${removedElement}:`);
    binaryTree.show(binaryTree.root);
}