export default class BinaryTreeNode<T> {
    public left: BinaryTreeNode<T> = null;
    public value: T;
    public right: BinaryTreeNode<T> = null;
    public parent: BinaryTreeNode<T> = null;

    constructor(value: T, parent?: BinaryTreeNode<T>, left?: BinaryTreeNode<T>, right?: BinaryTreeNode<T>) {
        this.left = left;
        this.parent = parent;
        this.value = value;
        this.right = right;
    }
}