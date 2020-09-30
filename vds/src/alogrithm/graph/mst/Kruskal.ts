import { Graph, Edge } from '../Graph';
import Heap from '../../heap/binary_heap';

class VertexRecord <T>{
    vertex:T;
    index: number;

    public constructor(vertex: T, index: number) {
        this.vertex = vertex;
        this.index = index;
    }
}

class KruskalMST<T> {

    find(parent: VertexRecord<T>[], vertex: T): T {
        let vertexRecord: VertexRecord<T> = this.findVertex(parent, vertex);
        let index = vertexRecord ? vertexRecord.index : -1;
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
        let yIndex = yVertexRecord.index;
        let xIndex = xVertexRecord.index;
        parent[yIndex] = new VertexRecord(yVertexRecord.vertex, xIndex);
    }

    printVertexRecord(records: VertexRecord<T>[]) {
        let string = '';
        for (let record of records) {
            string += "vertex:" + record.vertex + ",index:" + record.index + ";";
        }
        console.log(string);
    }

    mst(graph: Graph<T>) {
        const edges:Array<Edge<T>> = graph.edges;
        let minSpanningTreeEdges = new Array();
        if (edges && edges.length > 0) {
            let heap = new Heap<Edge<T>>(false, (target:Edge<T>, dest: Edge<T>) => {
                // console.log('>>>target:', target, ',dest:', dest);
                if (!target || !dest) {
                    return false;
                }
                return target.weight < dest.weight;
            });
            for (let edge of edges) {
                heap.add(edge);
            }
            console.log('>>>>> heap start >>>>');
            heap.print();
            console.log('>>>>> heap end >>>>>>');
            let parent: VertexRecord<T>[] = new Array(graph.vertexCount);
        
            // init parent array, every element his parent is itself.
            for (let i = 0; i < graph.vertexCount; i++) {
                parent[i] = new VertexRecord(graph.vers[i], i);
            }

            while (heap.size()!== 0) {
                let edge: Edge<T> = heap.remove();
                console.log('>>> heap value:' + JSON.stringify(edge));
                let x = this.find(parent, edge.start);
                let y = this.find(parent, edge.end);

                // console.log('>>>>>>start>>>>>>>>');
                // this.printVertexRecord(parent);
                // console.log('>>>>>>end>>>>>>>>');
                if (x === y) {
                    console.log('>>>>cycle>>>>');
                } else {
                    minSpanningTreeEdges.push(edge);
                    this.union(parent, x, y);
                }
            }
            this.printEdges(minSpanningTreeEdges);
            this.printDisJointSet(parent);
        }
    }

    printDisJointSet(parent: VertexRecord<T>[]) {
        for (let record of parent) {
            console.log('>>>record:' + JSON.stringify(record));
        }
    }

    printEdges(edges: Edge<T>[]) {
        if (edges != null && edges.length > 0) {
            for (let edge of edges) {
                console.log('start:' + edge.start + ",end:" + edge.end + ",weight:" + edge.weight);
            }
        }
    }

}

export {
    KruskalMST
}