import { Graph, Edge } from './graph';

/**
 * this class is used to find cycle int undirction graph.
 * this is a apporach to implement find cycle using disjoint set(并查集).
 * u can also use dfs to implement it. 
 * 
 * the detail analysis, u can see: https://algorithms.tutorialhorizon.com/graph-find-cycle-in-undirected-graph-using-disjoint-set-union-find/
 * 
 */

class VertexRecord <T>{
    vertex:T;
    index: number;

    public constructor(vertex: T, index: number) {
        this.vertex = vertex;
        this.index = index;
    }
}

class UnionFind<T>{

    find(parent: VertexRecord<T>[], vertex: T): T {
        let vertexRecord: VertexRecord<T> = this.findVertex(parent, vertex);
        let index: number = vertexRecord.index;
        if (index === -1) {
            console.log('can not find this value');
            return vertex;
        }
        if (parent[index].vertex !== vertex) {
            return this.find(parent, parent[index].vertex);
        }
        return vertex;
    }

    findVertex(records: VertexRecord<T>[], vertex: T): VertexRecord<T> {
        for (let i = 0; i < records.length; i++) {
            let record = records[i];
            if (record.vertex === vertex) {
                return record;
            }
        }
        return null;
    }

    union(parent: VertexRecord<T>[], x: T, y: T): void {
        let yVertexRecord: VertexRecord<T> = this.findVertex(parent, y);
        let xVertexRecord: VertexRecord<T> = this.findVertex(parent, x);
        parent[yVertexRecord.index] = new VertexRecord(yVertexRecord.vertex, xVertexRecord.index);
    }

    hasCycle(graph: Graph<T>): boolean {
        
        if (!graph) {
            return false;
        }

        let parent: VertexRecord<T>[] = new Array(graph.vertexCount);
        
        // init parent array, every element his parent is itself.
        for (let i = 0; i < graph.vertexCount; i++) {
            parent[i] = new VertexRecord(graph.vers[i], i);
        }

        let edges: Array<Edge<T>> = graph.edges;
        for (let i = 0; i < edges.length; i++) {
            let edge = edges[i];
            let x = this.find(parent, edge.start);
            let y = this.find(parent, edge.end);

            // print vertext record
            this.printVertexRecord(parent);

            //check if source vertex and destination vertex belongs to the same set
            // if in same set then cycle has been detected else combine them into one set
            if (x === y) {
                return true;
            } else {
                this.union(parent, edge.start, edge.end);
            }
        }

        return false;
    }

    printVertexRecord(records: VertexRecord<T>[]) {
        let string = '';
        for (let record of records) {
            string += "vertex:" + record.vertex + ",index:" + record.index + ";";
        }
        console.log(string);
    }

}

export {
    UnionFind
}