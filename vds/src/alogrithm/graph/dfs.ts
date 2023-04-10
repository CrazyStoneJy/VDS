import { Graph } from './graph';

class DepthFirstSearch<T> implements IDFS {

    graph: Graph<T>;
    startVertex: T;
    markedMap: Map<T, boolean>;

    constructor(graph: Graph<T>, startVertex: T) {
        this.graph = graph;
        this.startVertex = startVertex;
        this.markedMap = new Map<T, boolean>();
        let vers: Array<T> = this.graph.vers;
        for (let i = 0; i < vers.length; i++) {
            let ver = vers[i];
            this.markedMap.set(ver, false);
        }
    }

    
    dfs(): void {
        let vertexList = new Array<T>();
        this._dfs(this.startVertex, vertexList);
        this.traversePrint(vertexList);
    }

    /**
     * 
     * @param ver  the start vertext.
     * @param vertexList  record the vertex list of iterate, use to print.
     */
    _dfs(ver: T, vertexList: Array<T>): void {
        this.markedMap.set(ver, true);
        vertexList.push(ver);
        // get the adjacency of this vertex.
        let adj: Array<T> = this.graph.adjs.get(ver);
        for (let vertex of adj) {
            if (this.markedMap.get(vertex) === true) {
                continue;
            }
            this._dfs(vertex, vertexList);
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

    marked(vertex: T): boolean {
        return this.markedMap.get(vertex);
    }

}

export interface IDFS {
    dfs(): void;
}

export {
    DepthFirstSearch
};