import { Graph, Edge } from './Graph';

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
        let index: number = this.findIndex(parent, vertex);
        if (index === -1) {
            console.log('can not find this value');
            return vertex;
        }
        if (parent[index].vertex !== vertex) {
            return this.find(parent, parent[index].vertex);
        }
        return vertex;
    }

    findIndex(records: VertexRecord<T>[], vertex: T): number {
        for (let record of records) {
            if (record.vertex === vertex) {
                return record.index;
            }
        }
        return -1;
    }

    union(parent: VertexRecord<T>[], x: T, y: T): void {
        let yIndex: number = this.findIndex(parent, y);
        let xIndex: number = this.findIndex(parent, x);
        parent[yIndex] = new VertexRecord(x, xIndex);
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
            //check if source vertex and destination vertex belongs to the same set
            // if in same set then cycle has been detected else combine them into one set
            if (x === y) {
                return true;
            } else {
                this.union(parent, x, y);
            }
        }
        return false;
    }
}

export {
    UnionFind
}