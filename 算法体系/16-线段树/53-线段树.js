// 线段树类
class SegmentTree{
    constructor(origin) {
        // arr[]为原序列的信息从0开始，但在arr里是从1开始的
        // sum[]模拟线段树维护区间和
        // lazy[]为累加和懒惰标记
        // change[]为更新的值
        // update[]为更新慵懒标记
        this.MAXN = null;
        this.arr = [];
        this.sum = [];
        this.lazy = [];
        this.change = [];
        this.update = [];
        this.segmentTree(origin);
    }

    conArr(arr, len) {
        for(let i = 0; i < len; i++) {
            arr[i] = 0;
        }
    }

    segmentTree(origin) {
        this.MAXN = origin.length + 1;
        for(let i = 0; i < this.MAXN; i++) {
            this.arr[i] = origin[i - 1];
        }
        this.conArr(this.sum,this.MAXN << 2);   // 用来支持脑补概念中，某一个范围的累加和信息，右移两位就是乘4
        this.conArr(this.lazy,this.MAXN << 2);  // 用来支持脑补概念中，某一个范围沒有往下传递的累加任务
        this.conArr(this.change,this.MAXN << 2);    // 用来支持脑补概念中，某一个范围有没有更新操作的任务
        this.conArr(this.update,this.MAXN << 2);    // 用来支持脑补概念中，某一个范围更新任务，更新成了什么
    }

    pushUp(rt) {    // 任何一个根节点的值等于左孩子的值+右孩子的值
        this.sum[rt] = this.sum[rt << 1] + this.sum[rt << 1 | 1];
    }

    // 之前的，所有懒增加，和懒更新，从父范围，发给左右两个子范围
    // 分发策略是什么
    // ln表示左子树元素结点个数，rn表示右子树结点个数
    pushDown(rt, ln, rn) {
        if (this.update[rt]) {
            this.update[rt << 1] = true;
            this.update[rt << 1 | 1] = true;
            this.change[rt << 1] = this.change[rt];
            this.change[rt << 1 | 1] = this.change[rt];
            this.lazy[rt << 1] = 0;
            this.lazy[rt << 1 | 1] = 0;
            this.sum[rt << 1] = this.change[rt] * ln;
            this.sum[rt << 1 | 1] = this.change[rt] * rn;
            this.update[rt] = false;
        }
        if (this.lazy[rt] !== 0) {
            this.lazy[rt << 1] += this.lazy[rt];
            this.sum[rt << 1] += this.lazy[rt] * ln;
            this.lazy[rt << 1 | 1] += this.lazy[rt];
            this.sum[rt << 1 | 1] += this.lazy[rt] * rn;
            this.lazy[rt] = 0;
        }
    }

    // 在初始化阶段，先把sum数组，填好
    // 在arr[l~r]范围上，去build，1~N，
    // rt : 这个范围在sum中的下标
    build(l, r, rt) {
        if(l === r) {   // 叶节点，不需要往下分任务，将老数组中的值直接填入
            this.sum[rt] = this.arr[l];
            return;
        }
        let mid = (l + r) >> 1; // 分左右
        this.build(l, mid, rt << 1);
        this.build(mid + 1, r, rt << 1 | 1);
        this.pushUp(rt);    // 左右孩子的值算好之后算根节点的值
    }

    // L~R  所有的值变成C
    // l~r  rt
    Update(L, R, C, l, r, rt) {
        if (L <= l && r <= R) {
            this.update[rt] = true;
            this.change[rt] = C;
            this.sum[rt] = C * (r - l + 1);
            this.lazy[rt] = 0;
            return;
        }
        // 当前任务躲不掉，无法懒更新，要往下发
        let mid = (l + r) >> 1;
        this.pushDown(rt, mid - l + 1, r - mid);
        if (L <= mid) {
            this.Update(L, R, C, l, mid, rt << 1);
        }
        if (R > mid) {
            this.Update(L, R, C, mid + 1, r, rt << 1 | 1);
        }
        this.pushUp(rt);
    }

    // L~R, C 任务！
    // rt，l~r
    add(L, R, C, l, r, rt) {
        // 任务如果把此时的范围全包了！
        if (L <= l && r <= R) {
            this.sum[rt] += C * (r - l + 1);    // 把下面的所有数要加的值累加起来
            this.lazy[rt] += C; // 原先懒下的数加上当前要懒的数
            return;
        }
        // 任务没有把你全包！把之前懒下的数往下发一层
        // l  r  mid = (l+r)/2
        let mid = (l + r) >> 1;
        this.pushDown(rt, mid - l + 1, r - mid);
        // L~R，任务发到左边
        if (L <= mid) {
            this.add(L, R, C, l, mid, rt << 1);
        }
        if (R > mid) {  // 任务发到右边
            this.add(L, R, C, mid + 1, r, rt << 1 | 1);
        }
        this.pushUp(rt);
    }

    // 1~6 累加和是多少？ 1~8 rt
    query(L, R, l, r, rt) {
        if (L <= l && r <= R) {
            return this.sum[rt];
        }
        let mid = (l + r) >> 1;
        this.pushDown(rt, mid - l + 1, r - mid);
        let ans = 0;
        if (L <= mid) {
            ans += this.query(L, R, l, mid, rt << 1);
        }
        if (R > mid) {
            ans += this.query(L, R, mid + 1, r, rt << 1 | 1);
        }
        return ans;
    }
}

// 纯暴力方法
class Right {
    constructor(origin) {
        this.arr = [];
        this.Right(origin);
    }

    Right(origin) {
        for (let i = 0; i < origin.length; i++) {
            this.arr[i + 1] = origin[i];
        }
    }

    update(L, R, C) {
        for(let i = L; i <= R; i++) {
            this.arr[i] = C;
        }
    }

    add(L, R, C) {
        for(let i = L; i <= R; i++) {
            this.arr[i] += C;
        }
    }

    query(L, R) {
        let ans = 0;
        for(let i = L; i <= R; i++) {
            ans += arr[i];
        }
        return ans;
    }
}

let origin = [2,1,1,2,3,4,5];
let seg = new SegmentTree(origin);
let S = 1;  // 整个区间的开始位置，规定从1开始，不从0开始 -> 固定
let N = origin.length;  // 整个区间的结束位置，规定能到N，不是N-1 -> 固定
let root = 1; // 整棵树的头节点位置，规定是1，不是0 -> 固定
let L = 2; // 操作区间的开始位置 -> 可变
let R = 5; // 操作区间的结束位置 -> 可变
let C = 4; // 要加的数字或者要更新的数字 -> 可变
// 区间生成，必须在[S,N]整个范围上build
seg.build(S, N, root);
// 区间修改，可以改变L、R和C的值，其他值不可改变
seg.add(L, R, C, S, N, root);
// 区间更新，可以改变L、R和C的值，其他值不可改变
seg.Update(L, R, C, S, N, root);
// 区间查询，可以改变L和R的值，其他值不可改变
let sum = seg.query(L, R, S, N, root);
console.log(sum);
