function minAoe1(x, hp, range) {
    let allClear = true;
    for (let i = 0; i < hp.length; i++) {
        if (hp[i] > 0) {
            allClear = false;
            break;
        }
    }
    if (allClear) {
        return 0;
    } else {
        let ans = Number.MAX_VALUE;
        for (let left = 0; left < x.length; left++) {
            if (hasHp(x, hp, left, range)) {
                minusOneHp(x, hp, left, range);
                ans = Math.min(ans, 1 + minAoe1(x, hp, range));
                addOneHp(x, hp, left, range);
            }
        }
        return ans;
    }
}
function hasHp(x, hp, left, range) {
    for (let index = left; index < x.length && x[index] - x[left] <= range; index++) {
        if (hp[index] > 0) {
            return true;
        }
    }
    return false;
}
function minusOneHp(x, hp, left, range) {
    for (let index = left; index < x.length && x[index] - x[left] <= range; index++) {
        hp[index]--;
    }
}
function addOneHp(x, hp, left, range) {
    for (let index = left; index < x.length && x[index] - x[left] <= range; index++) {
        hp[index]++;
    }
}
// 为了验证
// 不用线段树，但是贪心的思路，和课上一样
// 1) 总是用技能的最左边缘刮死当前最左侧的没死的怪物
// 2) 然后向右找下一个没死的怪物，重复步骤1)
function minAoe2(x, hp, range) {
    let n = x.length;
    let cover = [];
    let r = 0;
    for (let i = 0; i < n; i++) {
        while (r < n && x[r] - x[i] <= range) {
            r++;
        }
        cover[i] = r;
    }
    let ans = 0;
    for (let i = 0; i < n; i++) {
        if (hp[i] > 0) {
            let minus = hp[i];
            for (let index = i; index < cover[i]; index++) {
                hp[index] -= minus;
            }
            ans += minus;
        }
    }
    return ans;
}
// 正式方法
// 关键点就是：
// 1) 线段树
// 2) 总是用技能的最左边缘刮死当前最左侧的没死的怪物
// 3) 然后向右找下一个没死的怪物，重复步骤2)
function minAoe3(x, hp, range) {
    let n = x.length;
    let cover = [];
    let r = 0;
    // cover[i] : 如果i位置是技能的最左侧，技能往右的range范围内，最右影响到哪
    for (let i = 0; i < n; i++) {
        while (r < n && x[r] - x[i] <= range) {
            r++;
        }
        cover[i] = r - 1;
    }
    let st = new SegmentTree(hp);
    st.build(1, n, 1);
    let ans = 0;
    for (let i = 1; i <= n; i++) {
        let leftHP = st.query(i, i, 1, n, 1);
        if (leftHP > 0) {
            ans += leftHP;
            st.add(i, cover[i - 1] + 1, -leftHP, 1, n, 1);
        }
    }
    return ans;
}

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
        this.segmentTree(origin);
    }

    conArr(arr, len) {
        for(let i = 0; i < len; i++) {
            arr[i] = 0;
        }
    }

    segmentTree(origin) {
        this.MAXN = origin.length + 1;
        for(let i = 1; i < this.MAXN; i++) {
            this.arr[i] = origin[i - 1];
        }
        this.conArr(this.sum,this.MAXN << 2);   // 用来支持脑补概念中，某一个范围的累加和信息，右移两位就是乘4
        this.conArr(this.lazy,this.MAXN << 2);  // 用来支持脑补概念中，某一个范围沒有往下传递的累加任务
    }

    pushUp(rt) {    // 任何一个根节点的值等于左孩子的值+右孩子的值
        this.sum[rt] = this.sum[rt << 1] + this.sum[rt << 1 | 1];
    }

    // 之前的，所有懒增加，和懒更新，从父范围，发给左右两个子范围
    // 分发策略是什么
    // ln表示左子树元素结点个数，rn表示右子树结点个数
    pushDown(rt, ln, rn) {
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

let x = [0,1,2,3,4];
let hp = [1,2,3,4,5];
console.log(minAoe1(x, hp, 2));
console.log(minAoe2(x, hp, 2));
console.log(minAoe3(x, hp, 2));
