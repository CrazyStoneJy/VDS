import { Graph, Edge } from '../alogrithm/graph/Graph'; 
import { MiniSpanningTree } from '../alogrithm/graph/mini_spanning_tree';
import { UnionFind } from '../alogrithm/graph/UnionFind';

describe('graph', () => {

    test('create graph', () => {
        
        let graph = new Graph<number>();
        graph.setBidirectional(true);
        graph.addEdge(new Edge(0, 1));
        graph.addEdge(new Edge(0, 4)); 
        graph.addEdge(new Edge(1, 2)); 
        graph.addEdge(new Edge(1, 3)); 
        graph.addEdge(new Edge(1, 4)); 
        graph.addEdge(new Edge(2, 3)); 
        graph.addEdge(new Edge(3, 4));

        graph.print();
        console.log('the graph has ', graph.getVertexCount(), 'vertex');
        console.log('the graph has ', graph.getEdgetCount(), 'edges');

        console.log('graph bfs');
        graph.bfs();

        console.log('graph dfs');
        graph.dfs();

    });

    test('min spanning tree', async () => {
        let spanningTree = new MiniSpanningTree();
        await spanningTree.generateTree();
        spanningTree.kruskal();
    });

    test('has cycle', () => {
        let graph: Graph<number> = new Graph();
        graph.addEdge(new Edge(0, 1));
        graph.addEdge(new Edge(0, 2));
        graph.addEdge(new Edge(1, 3));
        graph.addEdge(new Edge(3, 4));
        graph.addEdge(new Edge(2, 3));
        graph.addEdge(new Edge(4, 5));
        let unionFind = new UnionFind();
        let hasCycle: boolean =  unionFind.hasCycle(graph);
        console.log("Graph contains cycle: " + hasCycle);
    });

});