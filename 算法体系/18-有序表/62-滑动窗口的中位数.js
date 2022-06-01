class SBTNode{
    constructor(k) {
        this.key = k;
        this.size = 1;
        this.l = null;
        this.r = null;
    }
}
class SizeBalancedTreeMap{
    constructor() {
        this.root = null;
    }
    rightRotate(cur) {
        let leftNode = cur.l;
        cur.l = leftNode.r;
        leftNode.r = cur;
        leftNode.size = cur.size;
        cur.size = (cur.l != null ? cur.l.size : 0) + (cur.r != null ? cur.r.size : 0) + 1;
        return leftNode;
    }
    leftRotate(cur) {
        let rightNode = cur.r;
        cur.r = rightNode.l;
        rightNode.l = cur;
        rightNode.size = cur.size;
        cur.size = (cur.l != null ? cur.l.size : 0) + (cur.r != null ? cur.r.size : 0) + 1;
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
    findLastIndex(key) {
        let pre = this.root;
        let cur = this.root;
        while (cur != null) {
            pre = cur;
            if (key === cur.key) {
                break;
            } else if (key < cur.key) {
                cur = cur.l;
            } else {
                cur = cur.r;
            }
        }
        return pre;
    }
    add(cur, key) {
        if (cur == null) {
            return new SBTNode(key);
        } else {
            cur.size++;
            if (key < cur.key) {
                cur.l = this.add(cur.l, key);
            } else {
                cur.r = this.add(cur.r, key);
            }
            return this.maintain(cur);
        }
    }
    delete(cur, key) {
        cur.size--;
        if (key > cur.key) {
            cur.r = this.delete(cur.r, key);
        } else if (key < cur.key) {
            cur.l = this.delete(cur.l, key);
        } else {
            if (cur.l == null && cur.r == null) {
                // free cur memory -> C++
                cur = null;
            } else if (cur.l == null && cur.r != null) {
                // free cur memory -> C++
                cur = cur.r;
            } else if (cur.l != null && cur.r == null) {
                // free cur memory -> C++
                cur = cur.l;
            } else {
                let pre = null;
                let des = cur.r;
                des.size--;
                while (des.l != null) {
                    pre = des;
                    des = des.l;
                    des.size--;
                }
                if (pre != null) {
                    pre.l = des.r;
                    des.r = cur.r;
                }
                des.l = cur.l;
                des.size = des.l.size + (des.r == null ? 0 : des.r.size) + 1;
                // free cur memory -> C++
                cur = des;
            }
        }
        return cur;
    }
    getIndex(cur, kth) {
        if (kth === (cur.l != null ? cur.l.size : 0) + 1) {
            return cur;
        } else if (kth <= (cur.l != null ? cur.l.size : 0)) {
            return this.getIndex(cur.l, kth);
        } else {
            return this.getIndex(cur.r, kth - (cur.l != null ? cur.l.size : 0) - 1);
        }
    }
    size() {
        return this.root == null ? 0 : this.root.size;
    }
    containsKey(key) {
        if(key == null) {
            throw new Error("无效参数")
        }
        let lastNode = this.findLastIndex(key);
        return lastNode !== null && key === lastNode.key;
    }
    put(key) {
        if(key == null) {
            throw new Error("无效参数")
        }
        let lastNode = this.findLastIndex(key);
        if (lastNode == null || key !== lastNode.key) {
            this.root = this.add(this.root, key);
        }
    }
    remove(key) {
        if(key == null) {
            throw new Error("无效参数")
        }
        if(this.containsKey(key)) {
            this.root = this.delete(root, key);
        }
    }
    getIndexKey(index) {
        if (index < 0 || index >= this.size()) {
            throw new Error("无效参数")
        }
        return this.getIndex(this.root, index + 1).key;
    }
}
class Node{
    constructor(i, v) {
        this.index = i;
        this.value = v;
    }

}
function mediaSlidingWindow(nums, k) {
    let map = new SizeBalancedTreeMap();
    for(let i = 0; i < k - 1; i++) {
        map.put(new Node(i, nums[i]));
    }
    let ans = [];
    let index = 0;
    for (let i = k - 1; i < nums.length; i++) {
        map.put(new Node(i, nums[i]));
        if (map.size() % 2 === 0) {
            let upmid = map.getIndexKey(map.size() / 2 - 1);
            let downmid = map.getIndexKey(map.size() / 2);
            ans[index++] = (upmid.value + downmid.value) / 2;
        } else {
            let mid = map.getIndexKey(map.size() / 2);
            ans[index++] = mid.value;
        }
        map.remove(new Node(i - k + 1, nums[i - k + 1]));
    }
    return ans;
}
let arr = [1,3,-1,-3,5,3,6,7];
console.log(mediaSlidingWindow(arr, 3));
