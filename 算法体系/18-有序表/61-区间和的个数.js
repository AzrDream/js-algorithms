class SBTNode{
    constructor(k) {
        this.key = k;
        this.size = 1;
        this.all = 1;
        this.l = null;
        this.r = null;
    }
}
class SizeBalancedTreeSet{
    constructor() {
        this.root = null;
        this.set = new Set();
    }
    rightRotate(cur) {
        let same = cur.all - (cur.l != null ? cur.l.all : 0) - (cur.r != null ? cur.r.all : 0);
        let leftNode = cur.l;
        cur.l = leftNode.r;
        leftNode.r = cur;
        leftNode.size = cur.size;
        cur.size = (cur.l != null ? cur.l.size : 0) + (cur.r != null ? cur.r.size : 0) + 1;
        // all modify
        leftNode.all = cur.all;
        cur.all = (cur.l != null ? cur.l.all : 0) + (cur.r != null ? cur.r.all : 0) + same;
        return leftNode;
    }
    leftRotate(cur) {
        let same = cur.all - (cur.l != null ? cur.l.all : 0) - (cur.r != null ? cur.r.all : 0);
        let rightNode = cur.r;
        cur.r = rightNode.l;
        rightNode.l = cur;
        rightNode.size = cur.size;
        cur.size = (cur.l != null ? cur.l.size : 0) + (cur.r != null ? cur.r.size : 0) + 1;
        // all modify
        rightNode.all = cur.all;
        cur.all = (cur.l != null ? cur.l.all : 0) + (cur.r != null ? cur.r.all : 0) + same;
        return rightNode;
    }
    maintain(cur) {
        if (cur == null) {
            return null;
        }
        let leftSize = cur.l != null ? cur.l.size : 0;
        let leftLeftSize = cur.l != null && cur.l.l != null ? cur.l.l.size : 0;
        let leftRightSize = cur.l != null && cur.l.r != null ? cur.l.r.size : 0;
        let rightSize = cur.r != null ? cur.r.size : 0;
        let rightLeftSize = cur.r != null && cur.r.l != null ? cur.r.l.size : 0;
        let rightRightSize = cur.r != null && cur.r.r != null ? cur.r.r.size : 0;
        if (leftLeftSize > rightSize) {
            cur = this.rightRotate(cur);
            cur.r = this.maintain(cur.r);
            cur = this.maintain(cur);
        } else if (leftRightSize > rightSize) {
            cur.l = this.leftRotate(cur.l);
            cur = this.rightRotate(cur);
            cur.l = this.maintain(cur.l);
            cur.r = this.maintain(cur.r);
            cur = this.maintain(cur);
        } else if (rightRightSize > leftSize) {
            cur = this.leftRotate(cur);
            cur.l = this.maintain(cur.l);
            cur = this.maintain(cur);
        } else if (rightLeftSize > leftSize) {
            cur.r = this.rightRotate(cur.r);
            cur = this.leftRotate(cur);
            cur.l = this.maintain(cur.l);
            cur.r = this.maintain(cur.r);
            cur = this.maintain(cur);
        }
        return cur;
    }
    add(cur, key, contains) {
        if (cur == null) {
            return new SBTNode(key);
        } else {
            cur.all++;
            if (key === cur.key) {
                return cur;
            } else { // 还在左滑或者右滑
                if (!contains) {
                    cur.size++;
                }
                if (key < cur.key) {
                    cur.l = this.add(cur.l, key, contains);
                } else {
                    cur.r = this.add(cur.r, key, contains);
                }
                return this.maintain(cur);
            }
        }
    }
    put(sum) {
        let contains = this.set.has(sum);
        this.root = this.add(this.root, sum, contains);
        this.set.add(sum);
    }
    lessKeySize(key) {
        let cur = this.root;
        let ans = 0;
        while (cur != null) {
            if (key === cur.key) {
                return ans + (cur.l != null ? cur.l.all : 0);
            } else if (key < cur.key) {
                cur = cur.l;
            } else {
                ans += cur.all - (cur.r != null ? cur.r.all : 0);
                cur = cur.r;
            }
        }
        return ans;
    }
    moreKeySize(key) {
        return this.root != null ? (this.root.all - this.lessKeySize(key + 1)) : 0;
    }
}
function countRangeSum(nums, lower, upper) {
    let treeSet = new SizeBalancedTreeSet();
    let sum = 0;
    let ans = 0;
    treeSet.put(0); // 一个数都没有的时候，就已经有一个前缀和累加和为0，
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        // sum    i结尾的时候[lower, upper]
        // 之前所有前缀累加和中，有多少累加和落在[sum - upper, sum - lower]
        // 查 ？ < sum - lower + 1   a
        // 查 ?  < sum - upper    b
        // a - b

        let a = treeSet.lessKeySize(sum - lower + 1);
        let b = treeSet.lessKeySize(sum - upper);
        ans += a - b;
        treeSet.put(sum);
    }
    return ans;
}

let nums = [-2,5,-1];
console.log(countRangeSum(nums, -2, 2));
