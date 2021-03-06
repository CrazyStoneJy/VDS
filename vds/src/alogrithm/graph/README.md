#### 图

##### 表示方式

图一般有两种表示方式：

1. 邻接矩阵

- 在 n 个顶点的图需要有一个 n × n 大小的矩阵
- 在一个无权图中，矩阵坐标中每个位置值为 1 代表两个点是相连的，0 表示两点是不相连的
- 在一个有权图中，矩阵坐标中每个位置值代表该两点之间的权重，0 表示该两点不相连
- 在无向图中，邻接矩阵关于对角线相等

2. 邻接链表

- 对于每个点，存储着一个链表，用来指向所有与该点直接相连的点
- 对于有权图来说，链表中元素值对应着权重

邻接矩阵和链表对比

- 邻接矩阵由于没有相连的边也占有空间，因此存在浪费空间的问题，而邻接链表则比较合理地利用空间。

- 邻接链表比较耗时，牺牲很大的时间来查找，因此比较耗时，而邻接矩阵法相比邻接链表法来说，时间复杂度低。

##### 图的遍历

1. 深度优先遍历：(Depth First Search, DFS)

基本思路：深度优先遍历图的方法是，从图中某顶点 v 出发

- 访问顶点 v
- 从 v 的未被访问的邻接点中选取一个顶点 w，从 w 出发进行深度优先遍历
- 重复上述两步，直至图中所有和v有路径相通的顶点都被访问到

伪代码实现：

```java
 //伪码实现，类似于树的先序遍历
public void DFS(Vertex v){
    visited[v] = true;
    // v.adj()表示v的每个邻接点
    for(w : v.adj()){
        if(!visited[W]){
            DFS(W);
        }
    }
}
```

2. 广度优先搜索：(Breadth First Search, BFS)

广度优先搜索，可以被形象地描述为 "浅尝辄止"，它也需要一个队列以保持遍历过的顶点顺序，以便按出队的顺序再去访问这些顶点的邻接顶点。

实现思路：

- 顶点 v 入队列
- 当队列非空时则继续执行，否则算法结束
- 出队列取得队头顶点 v；访问顶点 v 并标记顶点 v 已被访问
- 查找顶点 v 的第一个邻接顶点 col
- 若 v 的邻接顶点 col 未被访问过的，则 col 继续
- 查找顶点 v 的另一个新的邻接顶点 col，转到步骤 5 入队列，直到顶点 v 的所有未被访问过的邻接点处理完。转到步骤 2

#### 最小生成树 
无向加权图连通图（没有自环和平行边）,
##### kruskal算法

##### prim算法



#### 参考文章

[数据结构与算法 - 图论](https://zhuanlan.zhihu.com/p/25498681)