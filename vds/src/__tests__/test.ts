
import BinaryTree from '../alogrithm/tree/binary/binary_tree';
import Stack from '../alogrithm/stack/stack_impl';
import OperatorTree from '../alogrithm/tree/binary/operator_tree';

describe("test", () => {

    test('tree', () => {

        let binaryTree = new BinaryTree();
        binaryTree.insert(15);
        binaryTree.insert(6);
        binaryTree.insert(3);
        binaryTree.insert(7);
        binaryTree.insert(2);
        binaryTree.insert(4);
        binaryTree.insert(13);
        binaryTree.insert(9);
        binaryTree.insert(18);
        binaryTree.insert(17);
        binaryTree.insert(20);
        
        binaryTree.print();
    });
});