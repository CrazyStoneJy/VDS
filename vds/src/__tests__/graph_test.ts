import { Graph, Edge } from '../alogrithm/graph/graph'; 
import Paths from '../alogrithm/graph/paths';
import { Printer } from '../printer/printer';
import { MiniSpanningTree } from '../alogrithm/graph/mini_spanning_tree';
import { UnionFind } from '../alogrithm/graph/union_find';

describe('graph', () => {

    test('', ()=> {

    });
    test('create graph', () => {
        
        // let graph = new Graph<number>();
        // graph.addEdge(new Edge(0, 1));
        // graph.addEdge(new Edge(0, 4)); 
        // graph.addEdge(new Edge(1, 2)); 
        // graph.addEdge(new Edge(1, 3)); 
        // graph.addEdge(new Edge(1, 4)); 
        // graph.addEdge(new Edge(2, 3)); 
        // graph.addEdge(new Edge(3, 4));

        // graph.print();
        // console.log('the graph has ', graph.getVertexCount(), 'vertex');
        // console.log('the graph has ', graph.getEdgetCount(), 'edges');

        // console.log('graph bfs:');
        // graph.bfs();

        // console.log('graph dfs:');
        // graph.dfs();

        // let paths = new Paths(graph, graph.vers[0]);
        // let destVertex = graph.vers[3];
        // console.log("graph %s -> %s path:", graph.vers[0], destVertex);
        // let pathArray = paths.pathTo(destVertex);
        // Printer.print(pathArray);
        
    });

    // test('min spanning tree', async () => {
    //     let spanningTree = new MiniSpanningTree();
    //     await spanningTree.generateTree();
    //     console.log('>>>>>> kruskal mst start >>>>>>');
    //     spanningTree.kruskal();
    //     console.log('>>>>>> kruskal mst end >>>>>>');
    // });

    // test('has cycle', () => {
    //     let graph: Graph<number> = new Graph();
    //     graph.addEdge(new Edge(0, 1));
    //     graph.addEdge(new Edge(0, 2));
    //     graph.addEdge(new Edge(1, 3));
    //     graph.addEdge(new Edge(3, 4));
    //     graph.addEdge(new Edge(2, 3));
    //     graph.addEdge(new Edge(4, 5));
    //     let unionFind = new UnionFind();
    //     let hasCycle: boolean =  unionFind.hasCycle(graph);
    //     console.log("Graph contains cycle: " + hasCycle);
    // });

});