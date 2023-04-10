import { DepthFirstSearch, IDFS } from './dfs';
import { BreadthFirstPath, IBFS } from './bfs';
/**
 * 使用邻接链表的方式进行存储
 */
class Graph<T> implements IDFS, IBFS, IGraph<T>{

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

    constructor(vers?: Array<T>, edges?: Array<Edge<T>>, bidirectional: boolean = true) {
        if (vers && vers.length > 0) {
            this.addVertexs(vers);
        }
        if (edges && edges.length > 0) {
            this.addEdges(edges);
        }
        this.bidirectional = bidirectional;
    }

    removeEdge(edge: Edge<T>): void {
        throw new Error('Method not implemented.');
    }

    hasEdge(edge: Edge<T>): boolean {
        return this.edges.includes(edge);
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
            if (this.bidirectional === true) {
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
        let delegete = new DepthFirstSearch(this, this.vers[0]);
        delegete.dfs();
    }

    /**
     * 广度优先遍历 -> 类似于二叉树的按层次遍历
     */
    bfs() {
       let delegete = new BreadthFirstPath(this, this.vers[0]);
       delegete.bfs();
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

/**
 * 图的抽象接口
 */
interface IGraph<T> {

    // 增加一组顶点
    addVertexs(vers: T[]): void;

    // 增加顶点
    addVertex(ver: T): void;

    // 增加一组边
    addEdges(edges?: Array<Edge<T>>): void;

    // 增加边
    addEdge(edge: Edge<T>): void;

    // 删除一个边
    removeEdge(edge: Edge<T>): void;

    // 检查是否有`edge`这个边
    hasEdge(edge: Edge<T>): void;

}

export {
    Graph,
    Edge
}