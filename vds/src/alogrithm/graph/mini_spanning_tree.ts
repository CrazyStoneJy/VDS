import { Graph, Edge } from './graph';
import { KruskalMST } from './mst/Kruskal';
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
        const stream = fs.createReadStream('/Users/crazystone/study_code/VDS/vds/src/alogrithm/graph/graph1.txt');
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
        let kruskal = new KruskalMST();
        kruskal.mst(this.graph);
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