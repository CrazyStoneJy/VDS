import Stack from '../../stack/stack_impl';
import BinaryTree from './binary_tree';
export default class OperatorTree {

    expressions: Array<string>;
    stack: Stack<BinaryTree<string>> = null;

    constructor(experssions: Array<string>) {
        this.expressions = experssions;
        this.stack = new Stack();
    }

    generate() {
        let index = 0;
        debugger;
        while (index < this.expressions.length) {

            let expression = this.expressions[index];
            let binaryTree = new BinaryTree<string>(expression);

            if (this.isOperator(expression)) {
                let lastOperand = this.stack.pop();
                let nextToLastOperand = this.stack.pop();
                let newTree = this.mergeTree(expression, lastOperand, nextToLastOperand);
                this.stack.push(newTree);
            } else {
                this.stack.push(binaryTree);
            }
            // console.log('current stack size:', this.stack.size());
            // console.log('stack:', this.stack);
            this.stack.print();
            index++;
        }
        console.log('this stack size is:', this.stack.size());
        if (this.stack.size() === 1) {
            let finalTree = this.stack.pop();
            finalTree.traverse();
            // finalTree.inOrder(finalTree.root);
        }
    }

    mergeTree(operator: string, first: BinaryTree<string>, second: BinaryTree<string>): BinaryTree<string> {
        // console.log('first tree:', first);
        // console.log('second tree:', second);
        let newTree = new BinaryTree<string>(operator);
        newTree.root.left = first.root;
        newTree.root.right = second.root;
        newTree.root.parent = null;
        // newTree.traversal();
        return newTree;
    }

    /**
     * determine whether expression is an operator. 
     * @param expression 
     */
    isOperator(expression: string) {
        return expression === '+' || expression === '-' || expression === '*' || expression === '/';
    }

}