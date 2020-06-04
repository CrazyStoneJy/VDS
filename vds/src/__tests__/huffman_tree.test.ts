import { HuffmanTree, TreeModel } from '../alogrithm/tree/binary/huffman_tree';
import fs from 'fs';
import path from 'path';
import BinaryTree from '../alogrithm/tree/binary/binary_tree';

describe('huffman tree test' , () => {
    test('huffman tree', () => {
        
        let buffer: Buffer = fs.readFileSync(path.join(__dirname, 'ted.txt'));
        // console.log('buffer length:', buffer.length);
        let huffmanTree: HuffmanTree = new HuffmanTree(buffer.toString());

        const huffmanCodeMap: Map<string, string> = huffmanTree.create();
        
        console.log('get huffman code:', huffmanCodeMap);

        console.log('输出原先ascii的二进制文件：')
        let array = [];
        for (let i = 0; i < buffer.length; i++) {
            const char = buffer[i];
            let str = char.toString(2);
            let finalStr = appendZero(str);
            array.push(finalStr);
        }
        const outputBuffer = Buffer.from(array);
        fs.writeFileSync(path.join(__dirname, './ted_ascii.txt'), outputBuffer);

        console.log('输出哈夫曼编码后的二进制文件:');
        let huffmanArray = [];
        for (let i = 0; i < buffer.length; i++) {
            const char = buffer[i];
            const code = String.fromCharCode(char);
            const huffmanCode = huffmanCodeMap.get(code);
            huffmanArray.push(huffmanCode);
            // console.log('code:', code, 'huffmanCode:', huffmanCode);
        }

        let arrayLength = getArrayLength(array);
        let huffmanLength = getArrayLength(huffmanArray);

        console.log('array length:', arrayLength , ', huffman array length:', huffmanLength , 'compress ratio:', (1 -  (huffmanLength / arrayLength)) * 100 + "%");


    });
});

function getArrayLength(array: string[]): number {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i]) {
            count += array[i].length;
        } 
    }
    return count;
}

function appendZero(str: string) {
    let apeendZeroCount = 8 - str.length;
    for (let i = 0; i < apeendZeroCount; i++) {
        str = '0' + str;
    }
    return str;
}