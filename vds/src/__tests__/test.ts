
import BinaryTree from '../alogrithm/tree/binary/binary_tree';
import Stack from '../alogrithm/stack/stack_impl';
import OperatorTree from '../alogrithm/tree/binary/operator_tree';

function sum(a: number, b: number) {
    return a + b;
}


describe("test", () => {

    // test('sum',() => {
    //     expect(sum(1,2)).toBe(3);
    // });

    test('tree', () => {

        let binaryTree = new BinaryTree();

        binaryTree.insert(5);
        binaryTree.insert(3);
        binaryTree.insert(6);
        binaryTree.insert(2);
        binaryTree.insert(4);
        binaryTree.insert(7);
        binaryTree.insert(8);
        binaryTree.traversal();

        console.log(binaryTree.contains(5));
        console.log(binaryTree.contains(9));

        console.log('this tree max height:');
        console.log(binaryTree.getHeight());

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

    // test('compare two strings', () => {
    //     let str1 = "a";
    //     let str2 = "b";
    //     console.log("compare str1 to str2:", (str1 > str2));
    // });

    // test('operator tree', () => {
    //     let expressions = ['a', 'b', '+', 'c', 'd', 'e', '+', '*', '*'];
    //     let operatorTree = new OperatorTree(expressions);
    //     operatorTree.generate();
    // });

    // test('array',() => {
    //     let array = ["a", "b", "c"];
    //     let removed = array.splice(array.length - 1, 1);
    //     console.log('removed:', removed[0]);
    // });



});