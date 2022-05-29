// IndexTree类实现代码，下标从1开始
class IndexTree{
    constructor(size) {
        this.tree = [];
        this.N = null;
        this.indexTree(size);
    }
    // 0位置不用
    indexTree(size) {
        this.N = size;
        for(let i = 0; i < size+1; i++) {
            this.tree[i] = 0;
        }
    }
    // 1-index 累加和是多少？
    sum(index) {
        let ret = 0;
        while(index > 0) {
            ret += this.tree[index];
            index -= index & -index;
        }
        return ret;
    }
    // 开始认为1-N上的结构放的都是0
    // 然后arr中的某个值发生改变，就需要修改这个结构中的某些值
    // index & -index：提取出index最右侧的1出来
    // 比如index：         0011001000
    // 经过index & -index：0000001000
    add(index, d) {
        while(index <= this.N) {
            this.tree[index] += d;
            index += index & -index;
        }
    }
}

let tree = new IndexTree(6);
tree.add(1,1);
tree.add(2,2);
tree.add(3,3);
tree.add(4,4);
tree.add(5,5);
console.log(tree.sum(6));
