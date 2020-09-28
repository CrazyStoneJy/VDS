#### 其他树得汇总

#### B树

磁盘存储的数据结构:B树，是一个平衡多路（即不止两个子树）查找树。B树的矮胖主要是为了减少IO的次数，从而提升查找速度。

一颗B树必须满足的一下条件：

1. 若根结点不是终端结点，则至少有2棵子树
2. 除根节点以外的所有非叶结点至少有 M/2 棵子树，至多有 M 个子树（关键字数为子树减一）
3. 所有的叶子结点都位于同一层






#### 参考资料

[理解 B 树、B+ 树特点及使用场景](https://juejin.im/entry/5b0cb64e518825157476b4a9)

[漫画：什么是B-树？](https://mp.weixin.qq.com/s?__biz=MzIxMjE5MTE1Nw==&mid=2653190965&idx=1&sn=53f78fa037386f85531832cd5322d2a0&chksm=8c9909efbbee80f90512f0c36356c31cc74c388c46388dc2317d43c8f8597298f233ca9c29e9&scene=21#wechat_redirect)

[漫画：什么是B+树？](https://mp.weixin.qq.com/s/jRZMMONW3QP43dsDKIV9VQ)