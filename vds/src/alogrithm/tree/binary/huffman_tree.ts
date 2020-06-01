import Strings from '../../../utils/strings';
import BinaryTree from './binary_tree';
import BinaryTreeNode from './tree_node';
import Heap from '../../heap/binary_heap';
import Tree from '../tree';

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

class HuffmanTree {

    text: string;
    tree: BinaryTree<TreeModel>;

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
            if (char && this.isChar(char)) {
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

    create(): BinaryTree<TreeModel> {
        const map: Map<string, number> = this.getFrequentForChar();
        if (map && map.size > 0) {
            let heap = new Heap<HuffmanModel>(false, (target: HuffmanModel, source: HuffmanModel) => {
                if (!target) {
                    return false;
                }
                return target.priority <= source.priority;
            });
            map.forEach((value: number, key: string) => {
                const tree = new BinaryTree<TreeModel>(new TreeModel(key, value), this.compareFunc, this.printFunc);
                let model = new HuffmanModel(tree, value);
                heap.add(model);
            });
            const model: HuffmanModel = this.merge(heap);
            this.tree = model.tree;
            return model.tree;
        }
        return null;
    }

    private merge(heap: Heap<HuffmanModel>): HuffmanModel {
        // 使用贪心算法合并森林为一个二叉树
        let index = 0;
        while (heap.size() > 1) {
            let first: HuffmanModel = heap.remove();
            let second: HuffmanModel = heap.remove();
            // console.log('index:',index,'first:', JSON.stringify(first));
            // console.log('index:',index,'second:', JSON.stringify(second));
            let sumPriority = first.priority + second.priority;
            let newTree: BinaryTree<TreeModel> = new BinaryTree<TreeModel>(new TreeModel('*', sumPriority), this.compareFunc, this.printFunc);
            newTree.root.left = first.tree.root;
            newTree.root.right = second.tree.root;
            newTree.root.parent = null;
            heap.add(new HuffmanModel(newTree, sumPriority));
            index++;
        }
        return heap.remove();
    }

    private compareFunc = (target: TreeModel, source: TreeModel) => {
        if (!target || !source) {
            return false;
        }
        return target.priority > source.priority ? 1 : (target.priority < source.priority ? 1 : 0 );
    }

    private printFunc = (target: TreeModel) => {
        return target.name;
    }

    private isChar(char: string) {
        const pattern = /^[a-zA-Z]?$/;
        return pattern.test(char);
    }

    /**
     * 获取一个char对应的编码
     * @param char 
     */
    public getCharCode(char: string) {
        if (!this.tree) {
            return -1;
        }
        let current = this.tree.root;
        while (current) {
            
        }
    }

}

class HuffmanModel {

    tree: BinaryTree<TreeModel>;
    priority: number;

    constructor(tree: BinaryTree<TreeModel>, priority: number) {
        this.tree = tree;
        this.priority = priority;
    }

}

class TreeModel {

    name: string;
    priority: number;
    code: string;

    constructor(name: string, priority: number,code: string = '') {
        this.name = name;
        this.priority = priority;
        this.code = code;
    }

}

export {
    TreeModel,
    HuffmanTree
};