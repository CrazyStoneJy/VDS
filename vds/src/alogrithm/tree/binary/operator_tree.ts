import Stack from '../../stack/stack';
import BinaryTree from './binary_tree';
export default class OperatorTree {

    expressions: Array<string>;
    stack: Stack<BinaryTree<string>> = null;

    constructor(experssions: Array<string>) {
        this.expressions = experssions;
        this.stack = new Stack();
    }

    /**
     * 将后缀表达式转为表达式树
     * 
     * 具体过程如下：
     * a b + c d e + * *
     * 所用数据结构: `stack`和`binaryTree`
     * 1. 遍历后缀表达式数组，
     * 2. 遇到操作数将操作数生成一个二叉树，`push`到`stack`中
     * 3. 遇到操作符，将`stack`中最上面的两个操作数`pop`出来，生成一颗新的二叉树，并将新的二叉树`push`到`stack`中
     * 4. 到最后在`stack`中保留最后的生成的二叉操作树.
     * 
     * 具体过程如下图所示:
     * 
     * [a]
     * 
     * [a, b]
     * 
     * [+]
     * / \
     * a b
     * 
     * [+, c]
     * / \
     * a b
     *
     * [+, c]
     * / \
     * a b
     * 
     * [+, c, d]
     * / \
     * a b
     * 
     * [+, c, d, e]
     * / \
     * a b
     * 
     * [+, c, *]
     * / \   / \
     * a b  d   e
     * 
     * [+,    *]
     * / \   / \
     * a b  c   +
     *         / \
     *        d   e   
     * 
     *    [ * ]
     *    /   \
     *   +     *
     *  / \   / \
     * a   b c   +
     *          / \
     *         d   e
     * 
     */
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