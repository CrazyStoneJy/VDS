import { Graph, Edge } from './Graph';
import Heap from '../heap/binary_heap';
import fs from 'fs';
import readline from 'readline';

/**
 * https://algorithms.tutorialhorizon.com/kruskals-algorithm-minimum-spanning-tree-mst-complete-java-implementation/
 */
class MiniSpanningTree {

    graph: Graph<string>;
    edges: Array<Edge<string>>

    constructor() {
        this.edges = new Array();
    }

    async generateTree() {
        this.graph = new Graph();
        this.graph.setBidirectional(true);
        await this.generateEdge();
        if (this.edges && this.edges.length > 0) {
            for (let edge of this.edges) {
                this.graph.addEdge(edge);
            }
        }
        this.graph.print();
    }

    async generateEdge() {
        const stream = fs.createReadStream('/Users/crazystone/study_code/VDS/vds/src/alogrithm/graph/graph.txt');
        const lines = readline.createInterface({
            input: stream,
            crlfDelay: Infinity
        });
        for await (const line of lines) {
            // input.txt 中的每一行在这里将会被连续地用作 `line`。
            // console.log(`Line from file: ${line}`, ', typeof:', typeof line);
            const strArray = line.split(" ");
            if (strArray) {
                let start = strArray[0];
                let end = strArray[1];
                let weight = strArray[2];
                // console.log('start:', start, ',end:', end, ',weight:', weight);
                let edge: Edge<string> = new Edge<string>(start, end, parseFloat(weight));
                this.edges.push(edge);
            }
        }
    }


    /**
     * the min spanning tree of kruskal algorithem.
     */
    kruskal() {
        const edges:Array<Edge<string>> = this.graph.edges;
        let minSpanningTreeEdges = new Array();
        if (edges && edges.length > 0) {
            let heap = new Heap<Edge<string>>(false, (target:Edge<string>, dest: Edge<string>) => {
                // console.log('>>>target:', target, ',dest:', dest);
                if (!target || !dest) {
                    return false;
                }
                return target.weight < dest.weight;
            });
            for (let edge of edges) {
                console.log('>>>weight:', edge.weight);
                heap.add(edge);
            }
            heap.print();
            while (heap.size()!== 1) {
                let edge: Edge<string> = heap.remove();
                // 如何判断图是否有环
                // if (!hasCycle()) {
                //     minSpanningTreeEdges.push(edge);
                // } else {
                    
                // }
            }
        }
    }

    /**
    * the min spanning tree of prim algorithem.
    */
    prim() {

    }

}

export {
    MiniSpanningTree
}