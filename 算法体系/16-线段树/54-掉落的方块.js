// 线段树类
class SegmentTree{
    constructor(origin) {
        this.max = [];
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
        let N = origin + 1;
        this.conArr(this.max,N << 2);
        this.conArr(this.change,N << 2);
        this.conArr(this.update,N << 2);
    }

    pushUp(rt) {
        this.max[rt] = Math.max(this.max[rt << 1], this.max[rt << 1 | 1]);
    }

    pushDown(rt, ln, rn) {
        if (this.update[rt]) {
            this.update[rt << 1] = true;
            this.update[rt << 1 | 1] = true;
            this.change[rt << 1] = this.change[rt];
            this.change[rt << 1 | 1] = this.change[rt];
            this.max[rt << 1] = this.change[rt];
            this.max[rt << 1 | 1] = this.change[rt];
            this.update[rt] = false;
        }
    }

    Update(L, R, C, l, r, rt) {
        if (L <= l && r <= R) {
            this.update[rt] = true;
            this.change[rt] = C;
            this.max[rt] = C;
            return;
        }
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

    query(L, R, l, r, rt) {
        if (L <= l && r <= R) {
            return this.max[rt];
        }
        let mid = (l + r) >> 1;
        this.pushDown(rt, mid - l + 1, r - mid);
        let left = 0;
        let right = 0;
        if (L <= mid) {
            left = this.query(L, R, l, mid, rt << 1);
        }
        if (R > mid) {
            right = this.query(L, R, mid + 1, r, rt << 1 | 1);
        }
        return Math.max(left, right);
    }
}

function index(positions) {
    let pos = new Set();
    for(let arr of positions) {
        pos.add(arr[0]);
        pos.add(arr[0] + arr[1] - 1);
    }
    return Array.from(pos);
}

function fallingSquares(positions) {
    let map = index(positions);
    let N = map.length;
    let segmentTree = new SegmentTree(N);
    let max = 0;
    let res = [];
    console.log(map);
    // 每落一个正方形，收集一下，所有东西组成的图像，最高高度是什么
    for(let arr of positions) {
        let L = map.findIndex(i=>i===arr[0]);
        let R = map.findIndex(i=>i===arr[0] + arr[1] - 1);
        let height = segmentTree.query(L, R, 1, N, 1) + arr[1];
        max = Math.max(max, height);
        res.push(max);
        segmentTree.Update(L, R, height, 1, N, 1);
    }
    return res;
}

let arr = [[1,2],[2,3],[6,1]];
console.log(fallingSquares(arr));
