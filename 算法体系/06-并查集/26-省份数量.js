function findCircleNum(M) {
    let N = M.length;
    let unionFind = new UnionFind(N);
    for(let i = 0; i < N; i++) {
        for(let j = i+1; j < N; j++) {
            if(M[i][j] === 1) { // i与j互相认识
                unionFind.union(i, j);
            }
        }
    }
    return unionFind.sets1();
}
class UnionFind {
    constructor(N) {
        // parent[i]=k : i的父亲是k
        this.parent = [];
        // i所在的集合大小是多少
        this.size = [];
        // 辅助结构
        this.help = [];
        // 一共有多少个集合
        this.sets = N;
        this.UnionFind(N);
    }
    UnionFind(N) {
        for(let i = 0; i < N; i++){
            this.parent[i] = i;
            this.size[i] = 1;
        }
    }
    // 从i开始一直往上，往上到不能再往上，代表节点，返回
    // 这个过程要做路径压缩
    find(i) {
        let hi = 0;
        while(i !== this.parent[i]) {
            this.help[hi++] = i;
            i = this.parent[i];
        }
        for(hi--; hi>=0; hi--) {
            this.parent[this.help[hi]] = i;
        }
        return i;
    }
    union(i, j) {
        let f1 = this.find(i);
        let f2 = this.find(j);
        if(f1!==f2) {
            if(this.size[f1] >= this.size[f2]) {
                this.size[f1] += this.size[f2];
                this.parent[f2] = f1;
            }else{
                this.size[f2] += this.size[f1];
                this.parent[f1] = f2;
            }
            this.sets--;
        }
    }
    sets1(){
        return this.sets;
    }
}

let arr = [[1,1,0],[1,1,0],[0,0,1]];
let num = findCircleNum(arr);
console.log(num);
