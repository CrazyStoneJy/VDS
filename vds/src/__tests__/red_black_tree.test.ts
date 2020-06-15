import RedBlackTree from '../alogrithm/tree/binary/red_black_tree';
import BinaryTreeNode from '../alogrithm/tree/entity/tree_node';
import { Color } from '../alogrithm/tree/entity/color';

describe('red black tree', () => {

    test('red black test', () => {
        const tree = new RedBlackTree<number>();
        tree.setPrintFunc((treeNode: BinaryTreeNode<number>) => {
            return treeNode ? (treeNode.value ? treeNode.value : '') + Color[treeNode.color][0] : '';
        });
        tree.insert(6);
        tree.print();
        tree.insert(5);
        tree.print();
        tree.insert(4);
        tree.insert(3);
        // tree.print();
    });

});
