class SBTNode{
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.l = null;
        this.r = null;
        this.size = 1;
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
    findLastNoSmallIndex(key) {
        let ans = null;
        let cur = this.root;
        while (cur != null) {
            if (key === cur.key) {
                ans = cur;
                break;
            } else if (key < cur.key) {
                ans = cur;
                cur = cur.l;
            } else {
                cur = cur.r;
            }
        }
        return ans;
    }
    findLastNoBigIndex(key) {
        let ans = null;
        let cur = this.root;
        while (cur != null) {
            if (key === cur.key) {
                ans = cur;
                break;
            } else if (key < cur.key) {
                cur = cur.l;
            } else {
                ans = cur;
                cur = cur.r;
            }
        }
        return ans;
    }
    // 现在，以cur为头的树上，新增，加(key, value)这样的记录
    // 加完之后，会对cur做检查，该调整调整
    // 返回，调整完之后，整棵树的新头部
    add(cur, key, value) {
        if (cur == null) {
            return new SBTNode(key, value);
        } else {
            cur.size++;
            if (key < cur.key) {
                cur.l = this.add(cur.l, key, value);
            } else {
                cur.r = this.add(cur.r, key, value);
            }
            return this.maintain(cur);
        }
    }
    // 在cur这棵树上，删掉key所代表的节点
    // 返回cur这棵树的新头部
    delete(cur, key) {
        cur.size--;
        if (key > cur.key) {
            cur.r = this.delete(cur.r, key);
        } else if (key < cur.key) {
            cur.l = this.delete(cur.l, key);
        } else { // 当前要删掉cur
            if (cur.l == null && cur.r == null) {
                // free cur memory -> C++
                cur = null;
            } else if (cur.l == null && cur.r != null) {
                // free cur memory -> C++
                cur = cur.r;
            } else if (cur.l != null && cur.r == null) {
                // free cur memory -> C++
                cur = cur.l;
            } else { // 有左有右
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
        // cur = maintain(cur);
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
        if(key === null) {
            throw new Error("无效参数");
        }
        let lastNode = this.findLastIndex(key);
        return lastNode !== null && key === lastNode.key;
    }
    put(key, value) {
        if(key === null) {
            throw new Error("无效参数");
        }
        let lastNode = this.findLastIndex(key);
        if (lastNode != null && key === lastNode.key) {
            lastNode.value = value;
        } else {
            this.root = this.add(this.root, key, value);
        }
    }
    remove(key) {
        if(key === null) {
            throw new Error("无效参数");
        }
        if (this.containsKey(key)) {
            this.root = this.delete(this.root, key);
        }
    }
    getIndexKey(index) {
        if (index < 0 || index >= this.size()) {
            throw new Error("无效参数");
        }
        return this.getIndex(this.root, index + 1).key;
    }
    getIndexValue(index) {
        if (index < 0 || index >= this.size()) {
            throw new Error("无效参数");
        }
        return this.getIndex(this.root, index + 1).value;
    }
    get(key) {
        if(key === null) {
            throw new Error("无效参数");
        }
        let lastNode = this.findLastIndex(key);
        if (lastNode != null && key === lastNode.key) {
            return lastNode.value;
        } else {
            return null;
        }
    }
    firstKey() {
        if (this.root === null) {
            return null;
        }
        let cur = this.root;
        while (cur.l != null) {
            cur = cur.l;
        }
        return cur.key;
    }
    lastKey() {
        if (this.root === null) {
            return null;
        }
        let cur = this.root;
        while (cur.r != null) {
            cur = cur.r;
        }
        return cur.key;
    }
    floorKey(key) {
        if(key === null) {
            throw new Error("无效参数");
        }
        let lastNoBigNode = this.findLastNoBigIndex(key);
        return lastNoBigNode == null ? null : lastNoBigNode.key;
    }
    ceilingKey(key) {
        if(key === null) {
            throw new Error("无效参数");
        }
        let lastNoSmallNode = this.findLastNoSmallIndex(key);
        return lastNoSmallNode == null ? null : lastNoSmallNode.key;
    }
}

// 测试打印
function printAll(head) {
    console.log("Binary Tree:");
    printInOrder(head, 0, "H", 17);
}
function printInOrder(head, height, to, len) {
    if (head == null) {
        return;
    }
    printInOrder(head.r, height + 1, "v", len);
    let val = to + "(" + head.key + "," + head.value + ")" + to;
    let lenM = val.length;
    let lenL = (len - lenM) / 2;
    let lenR = len - lenM - lenL;
    val = getSpace(lenL) + val + getSpace(lenR);
    console.log(getSpace(height * len) + val);
    printInOrder(head.l, height + 1, "^", len);
}
function getSpace(num) {
    let space = " ";
    let buf = '';
    for(let i = 0; i < num; i++) {
        buf+=space;
    }
    return buf;
}

// test
let sbt = new SizeBalancedTreeMap();
sbt.put("d", 4);
sbt.put("c", 3);
sbt.put("a", 1);
sbt.put("b", 2);
// sbt.put("e", 5);
sbt.put("g", 7);
sbt.put("f", 6);
sbt.put("h", 8);
sbt.put("i", 9);
sbt.put("a", 111);
console.log(sbt.get("a"));
sbt.put("a", 1);
console.log(sbt.get("a"));
for (let i = 0; i < sbt.size(); i++) {
    console.log(sbt.getIndexKey(i) + " , " + sbt.getIndexValue(i));
}
printAll(sbt.root);
console.log(sbt.firstKey());
console.log(sbt.lastKey());
console.log(sbt.floorKey("g"));
console.log(sbt.ceilingKey("g"));
console.log(sbt.floorKey("e"));
console.log(sbt.ceilingKey("e"));
console.log(sbt.floorKey(""));
console.log(sbt.ceilingKey(""));
console.log(sbt.floorKey("j"));
console.log(sbt.ceilingKey("j"));
sbt.remove("d");
printAll(sbt.root);
sbt.remove("f");
printAll(sbt.root);
