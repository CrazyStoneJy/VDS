import Strings from '../../../utils/strings';
import BinaryTree from './binary_tree';
import BinaryTreeNode from './tree_node';

/**
 * 哈夫曼树是用来压缩字符比特的一个数据结构。
 * 在ASCII码中，每个字符都为8比特，哈夫曼编码将每个字符按照出现的频率来进行编码，字符出现的频率越高，权重越大，越应该排在前面。
 *                 *
 *                / \
 *               *   i
 *              / \
 *             *   s
 *            / \
 *           M   p
 */

export default class HuffmanTree {
    text: string;

    constructor(text: string) {
        this.text = text;
    }

    public getFrequentForChar() {
        if (Strings.isEmpty(this.text)) {
            throw new Error('text is empty');
        }
        let index = 0;
        const map = new Map<string, number>();
        while (index < this.text.length) {
            index++;
            const char = this.text[index];
            if (char) {
                let charCount = map.get(char);
                if (charCount) {
                    charCount += 1;
                    map.set(char, charCount);
                } else {
                    map.set(char, 1);
                }
            }
        }
        return map;
    }

    create() {
        const map: Map<string, number> = this.getFrequentForChar();
        if (map && map.size > 0) {
            let binaryTrees: HuffmanModel[] = [];
            map.forEach((value: number, key: string) => {
                console.log('key:', key, ',value:', value);
                const tree = new BinaryTree<string>(key);
                let model = new HuffmanModel(tree, value);
                binaryTrees.push(model);
            });
            console.log('binary tree:', binaryTrees);
        }
    }  

    merge(array: HuffmanModel[]): BinaryTree<string> {
        
        return null;
    }


    private isChar(char: string) {
        const pattern = /^[a-zA-Z]?$/;
        return pattern.test(char);
    }

}

class HuffmanModel {
    
    tree: BinaryTree<string>; 
    priority: number; 

    constructor(tree: BinaryTree<string>, priority: number) {
        this.tree = tree;
        this.priority = priority;
    }

}