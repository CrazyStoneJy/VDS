import { HuffmanTree, TreeModel } from '../alogrithm/tree/binary/huffman_tree';
import fs from 'fs';
import path from 'path';
import BinaryTree from '../alogrithm/tree/binary/binary_tree';

describe('huffman tree test' , () => {
    test('huffman tree', () => {
        
        let buffer: Buffer = fs.readFileSync(path.join(__dirname, 'ted.txt'));
        let huffmanTree: HuffmanTree = new HuffmanTree(buffer.toString());

        const tree: BinaryTree<TreeModel> = huffmanTree.create();
        console.log('huffman tree:');
        
        tree.print();

        

    });
});