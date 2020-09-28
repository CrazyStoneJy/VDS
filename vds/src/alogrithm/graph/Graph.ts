import { fstat } from "fs";

/**
 * 使用邻接链表的方式进行存储
 */
class Graph<T>{

    // 顶点的个数
    vertexCount = 0;
    // 边的个数
    edgeCount = 0;
    // 邻接链表
    adjs: Map<T, Array<T>> = new Map();
    // 是否是无向图 true为无向图,false为有向图
    bidirectional: boolean = true;
    // 顶点
    vers: Array<T> = new Array<T>();
    edges: Array<Edge<T>> = new Array();

    constructor(vers?: Array<T>, edges?: Array<Edge<T>>, bidirectional?: boolean) {
        if (vers && vers.length > 0) {
            this.addVertexs(vers);
        }
        if (edges && edges.length > 0) {
            this.addEdges(edges);
        }
        this.bidirectional = bidirectional;
    }

    addVertexs(vers: T[]) {
        if (vers && vers.length > 0) {
            this.vertexCount = vers.length;
            for (let ver of vers) {
                this.addVertex(ver);
            }
        }
    }

    addVertex(ver: T) {
        if (ver !== null || ver !== undefined) {
            this.vertexCount++;
            this.adjs.set(ver, new Array<T>());
            this.vers.push(ver);
        }
    }

    setBidirectional(bidirectional?: boolean) {
        this.bidirectional = bidirectional;
    }

    addEdges(edges?: Array<Edge<T>>) {
        if (edges && edges.length > 0) {
            this.edgeCount = edges.length;
            for (let edge of edges) {
                this.addEdge(edge);
            }
        }
    }

    addEdge(edge: Edge<T>) {
        if (edge) {
            this.edgeCount++;
            this.edges.push(edge);
            let start = edge.start;
            let end = edge.end;
            if (!this.adjs.get(start)) {
                this.addVertex(start);
            }
            if (!this.adjs.get(end)) {
                this.addVertex(end);
            }
            this.adjs.get(start).push(end);
            if (this.bidirectional) {
                this.adjs.get(end).push(start);
            }
        }
    }

    getVertexCount(): number {
        return this.vertexCount;
    }

    getEdgetCount(): number {
        return this.edgeCount;
    }

    print() {
        let sb = "";
        if (this.adjs && this.adjs.size > 0) {
            this.adjs.forEach((value: Array<T>, key: T) => {
                sb += key;
                sb += ":";
                if (value && value.length > 0) {
                    for (let val of value) {
                        sb += " " + val;
                    }
                }
                sb += "\n";
            });
        }
        console.log(sb);
    }

    /**
     * 深度优先遍历 -> 类似于二叉树的前，中，后序遍历
     * 
     * @param ver 遍历开始的根结点
     */
    dfs() {
        if (this.vers && this.vers.length > 0) {
            let visit: Map<T, boolean> = new Map<T, boolean>();
            for (let i = 0; i < this.vers.length; i++) {
                let ver = this.vers[i];
                visit.set(ver, false);
            }
            
            let vertexList = new Array<T>();
            this._dfs(this.vers[0], visit, vertexList);
            this.traversePrint(vertexList);
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

    _dfs(ver: T, visit: Map<T, boolean>, vertexList: Array<T>) {
        visit.set(ver, true);
        let edges: Array<T> = this.adjs.get(ver);
        // console.log('current vertex:', ver);
        vertexList.push(ver);
        for (let ver of edges) {
            if (visit.get(ver) === false) {
                this._dfs(ver, visit, vertexList);
            }
        }
    }

    /**
     * 广度优先遍历 -> 类似于二叉树的按层次遍历
     */
    bfs() {
        if (this.vers && this.vers.length > 0) {
            let visit: Map<T, boolean> = new Map<T, boolean>();
            for (let i = 0; i < this.vers.length; i++) {
                let ver = this.vers[i];
                visit.set(ver, false);
            }
            let vertexList = new Array<T>();
            this._bfs(this.vers[0], visit, vertexList);
            this.traversePrint(vertexList);
        }
    }

    _bfs(ver: T, visit: Map<T, boolean>, vertexList: Array<T>) {
        let queue = new Array<T>();
        visit.set(ver, true);
        queue.push(ver);
        vertexList.push(ver);
        while (queue.length > 0) {
            let _ver = queue.shift();
            let edges = this.adjs.get(_ver);
            for (let edge of edges) {
                if (visit.get(edge) === false) {
                    visit.set(edge, true);
                    queue.push(edge);
                    vertexList.push(edge);
                }
            }
        }
    }


}

class Edge<T>{
    start: T;
    end: T;
    weight?: number;
    constructor(start: T, end: T, weight?: number) {
        this.start = start;
        this.end = end;
        this.weight = weight;
    }
}

export {
    Graph,
    Edge
}