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
        console.log('>>>>>>>>>>>>>>>>>>>');
        tree.insert(5);
        tree.print();
        console.log('>>>>>>>>>>>>>>>>>>>');
        tree.insert(4);
        tree.print();
        console.log('>>>>>>>>>>>>>>>>>>>');
        tree.insert(3);
        tree.print();
        console.log('>>>>>>>>>>>>>>>>>>>');
        tree.insert(2);
        tree.print();
        console.log('>>>>>>>>>>>>>>>>>>>');
        tree.insert(1);
        tree.print();
        console.log('>>>>>>>>>>>>>>>>>>>');
        tree.remove(2);
        tree.print();
        console.log('>>>>>>>>>>>>>>>>>>>');
        tree.remove(3);
        tree.print();
        console.log('>>>>>>>>>>>>>>>>>>>');
    });

});
