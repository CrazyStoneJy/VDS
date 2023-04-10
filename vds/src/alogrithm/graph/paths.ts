import { Graph } from './graph';
import Stack from '../stack/stack';

interface IPaths<T> {
    // 是否存在从s到v的路径
    hasPathTo(v: T): boolean;
    // s到v的路径，不存在返回null
    pathTo(v: T): Array<T>;
}

/**
 * 单点路径问题
 * 判断一个图，是否有从s到v的路径
 */
export default class Paths<T> implements IPaths<T>{

    graph: Graph<T>;
    startVertex: T;
    markedMap: Map<T, boolean>;
    edgesTo: Heritage<T>; // 记录当前节点与下一个节点的关系
    constructor(graph: Graph<T>, startVertex: T) {
        this.graph = graph;
        this.startVertex = startVertex;
        this.markedMap = new Map();
        this.edgesTo = new Heritage(this.startVertex);

        // init markedMap
        for (let vertex of this.graph.vers) {
            this.markedMap.set(vertex, false);
        }
        this.dfs(this.startVertex, this.edgesTo);
    }

    hasPathTo(v: T): boolean {
        return this.markedMap.get(v);
    }

    pathTo(v: T): T[] {
        let array = new Array();
        if (!this.hasPathTo(v)) {
            return array;
        }

        let heritage = this.edgesTo;
        while (heritage) {
            array.push(heritage.current);
            if (heritage.current === v) {
                break;
            }
            heritage = heritage.child;
        }

        return array;
    }

    dfs(ver: T, heritage: Heritage<T>): void{
        this.markedMap.set(ver, true);
        let adj = this.graph.adjs.get(ver);
        for (let vertex of adj) {
            if (this.markedMap.get(vertex) === false) {
                // 记录父子节点
                let currentHeritage = new Heritage(vertex);
                heritage.child = currentHeritage;
                this.dfs(vertex, currentHeritage);
            }
        }
    }

}

/**
 * 一个表示父子关系的类
 */
class Heritage<T> {

    current: T; // 当前节点
    child: Heritage<T>; // 父节点
    constructor(current: T) {
        this.current = current;
    }

}