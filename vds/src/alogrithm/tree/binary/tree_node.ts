export default class BinaryTreeNode<T> {

    public left: BinaryTreeNode<T> = null;
    public value: T;
    public right: BinaryTreeNode<T> = null;
    public parent: BinaryTreeNode<T> = null;
    /**
     * 以该节点为根，subtree的高度
     */
    public height: number = 0;

    constructor(value: T, parent?: BinaryTreeNode<T>, left?: BinaryTreeNode<T>, right?: BinaryTreeNode<T>, height?: number) {
        this.left = left;
        this.parent = parent;
        this.value = value;
        this.right = right;
        this.height = height;
    }
}