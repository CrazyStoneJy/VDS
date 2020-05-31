import Strings from '../../../utils/strings';
import BinaryTree from './binary_tree';
import BinaryTreeNode from './tree_node';
import Heap from '../../heap/binary_heap';

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
            if (char && this.filter(char)) {
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

    private filter(char: string): boolean {
        const pattern = /^[A-Za-z]?$/
        return pattern.test(char);
    }

    create() {
        const map: Map<string, number> = this.getFrequentForChar();
        if (map && map.size > 0) {
            let heap = new Heap<HuffmanModel>(false, (target: HuffmanModel, source: HuffmanModel) => {
                if (!target) {
                    return false;
                }
                return target.priority <= source.priority;
            });
            map.forEach((value: number, key: string) => {
                console.log('key:', key, ',value:', value);
                const tree = new BinaryTree<string>(key);
                let model = new HuffmanModel(tree, value);
                heap.add(model);
            });
            // console.log('print heap:');
            // heap.print();
            const model: HuffmanModel = this.merge(heap);
            // console.log('model:', model);
            // console.log('print tree:');
            // model.tree.traverse();
            model.tree.print();
            // console.log('tree height:', model.tree.getHeight());
        }
    }

    merge(heap: Heap<HuffmanModel>): HuffmanModel {
        // todo 使用贪心算法合并森林为一个二叉树
        let index = 0;
        while (heap.size() > 1) {
            let first: HuffmanModel = heap.remove();
            let second: HuffmanModel = heap.remove();
            console.log('index:',index,'first:', JSON.stringify(first));
            console.log('index:',index,'second:', JSON.stringify(second));
            let sumPriority = first.priority + second.priority;
            let newTree: BinaryTree<string> = new BinaryTree<string>('*');
            newTree.root.left = first.tree.root;
            newTree.root.right = second.tree.root;
            newTree.root.parent = null;
            heap.add(new HuffmanModel(newTree, sumPriority));
            // console.log('heap:', heap);
            index++;
        }
        return heap.remove();
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