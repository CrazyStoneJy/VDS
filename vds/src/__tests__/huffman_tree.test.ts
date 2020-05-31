import HuffmanTree from '../alogrithm/tree/binary/huffman_tree';
import fs from 'fs';
import path from 'path';

describe('huffman tree test' , () => {
    test('huffman tree', () => {
        let buffer: Buffer = fs.readFileSync(path.join(__dirname, 'ted.txt'));
        let huffmanTree: HuffmanTree = new HuffmanTree(buffer.toString());
        // console.log('huffman tree');
        
        // // console.log('buffer:', buffer);
        // console.log('string:', buffer.toString());
        const map = huffmanTree.create();
        // console.log('map:', map);
    });
});