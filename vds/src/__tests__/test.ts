
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

        // binaryTree.traverse();

        // console.log(binaryTree.contains(5));
        // console.log(binaryTree.contains(9));

        // console.log('this tree max height:');
        // console.log(binaryTree.getHeight());

    });

    // test('stack', () => {
    //     let stack = new Stack();
    //     stack.push(3);
    //     stack.push(5);
    //     stack.push(6);
    //     stack.push(7);
    //     stack.print();
    //     stack.pop();
    //     stack.print();
    //     stack.peek();
    //     stack.print();
    // });

    // test('operator tree', () => {
    //     let expressions = ['a', 'b', '+', 'c', 'd', 'e', '+', '*', '*'];
    //     let operatorTree = new OperatorTree(expressions);
    //     operatorTree.generate();
    // });

    

});