import { Queue } from '../queue/Queue';
import { Graph } from './graph';

export interface IBFS {
    bfs(): void;
}

class BreadthFirstPath<T> implements IBFS{ 
    
    graph: Graph<T>;
    startVertex: T;
    markedMap: Map<T, boolean>;

    constructor(graph: Graph<T>, startVertex: T) {
        this.graph = graph;
        this.startVertex = startVertex;
        this.markedMap = new Map();
        let vers: Array<T> = this.graph.vers;
        for (let i = 0; i < vers.length; i++) {
            let ver = vers[i];
            this.markedMap.set(ver, false);
        }
    }

    bfs() {
        let vertexList = new Array<T>();
        this._bfs(this.startVertex, vertexList);
        this.traversePrint(vertexList);
    }

    _bfs(startVertex: T, vertexList: Array<T>) {
        let queue = new Queue<T>();
        queue.enqueue(startVertex);
        this.markedMap.set(startVertex, true);
        vertexList.push(startVertex);

        while(!queue.isEmpty()) {
            let ver: T = queue.dequeue();
            let adj: T[] | Array<T> = this.graph.adjs.get(ver);

            // traverse all vertex of this adj.
            for (let vertex of adj) {
                // check whether vertex has been marked.
                if (this.markedMap.get(vertex) === false) {
                    queue.enqueue(vertex);
                    // set mark
                    this.markedMap.set(vertex, true);
                    vertexList.push(vertex);
                }
            }
        }
    }
                                                                                                                        
    traversePrint(vertexList: Array<T>) {
        var sb = '';
        if (vertexList && vertexList.length > 0) {
            vertexList.forEach((value: T, index: number) => {
                sb += value + "->";
            });
            console.log(sb.substring(0, sb.length - 2));
        }
    }  
     
                           
    
}

export {
    BreadthFirstPath
}