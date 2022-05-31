class AVLNode{
    constructor(key, value) {
        this.k = key;
        this.v = value;
        this.l = null;
        this.r = null;
        this.h = 1;
    }
}

class AVLTreeMap{
    constructor(){
        this.root = null;
        this.size = 0;
    }
    // 右旋
    rightRotate(cur) {
        let left = cur.l;
        cur.l = left.r;
        left.r = cur;
        cur.h = Math.max((cur.l != null ? cur.l.h : 0), (cur.r != null ? cur.r.h : 0)) + 1;
        left.h = Math.max((left.l != null ? left.l.h : 0), (left.r != null ? left.r.h : 0)) + 1;
        return left;
    }
    // 左旋
    leftRotate(cur) {
        let right = cur.r;
        cur.r = right.l;
        right.l = cur;
        cur.h = Math.max((cur.l != null ? cur.l.h : 0), (cur.r != null ? cur.r.h : 0)) + 1;
        right.h = Math.max((right.l != null ? right.l.h : 0), (right.r != null ? right.r.h : 0)) + 1;
        return right;
    }
    // 调整平衡的逻辑
    maintain(cur) {
        if (cur === null) {
            return null;
        }
        let leftHeight = cur.l != null ? cur.l.h : 0;
        let rightHeight = cur.r != null ? cur.r.h : 0;
        if (Math.abs(leftHeight - rightHeight) > 1) {
            if (leftHeight > rightHeight) {
                let leftLeftHeight = cur.l != null && cur.l.l != null ? cur.l.l.h : 0;
                let leftRightHeight = cur.l != null && cur.l.r != null ? cur.l.r.h : 0;
                if (leftLeftHeight >= leftRightHeight) {
                    cur = this.rightRotate(cur);
                } else {
                    cur.l = this.leftRotate(cur.l);
                    cur = this.rightRotate(cur);
                }
            } else {
                let rightLeftHeight = cur.r != null && cur.r.l != null ? cur.r.l.h : 0;
                let rightRightHeight = cur.r != null && cur.r.r != null ? cur.r.r.h : 0;
                if (rightRightHeight >= rightLeftHeight) {
                    cur = this.leftRotate(cur);
                } else {
                    cur.r = this.rightRotate(cur.r);
                    cur = this.leftRotate(cur);
                }
            }
        }
        return cur;
    }
    findLastIndex(key) {
        let pre = this.root;
        let cur = this.root;
        while (cur != null) {
            pre = cur;
            if (key === cur.k) {
                break;
            } else if (key < cur.k) {
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
            if (key === cur.k) {
                ans = cur;
                break;
            } else if (key < cur.k) {
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
        while(cur !== null) {
            if (key === cur.k) {
                ans = cur;
                break;
            } else if (key < cur.k) {
                cur = cur.l;
            } else {
                ans = cur;
                cur = cur.r;
            }
        }
        return ans;
    }
    add(cur, key, value) {
        if (cur == null) {
            return new AVLNode(key, value);
        } else {
            if (key < cur.k) {
                cur.l = this.add(cur.l, key, value);
            } else {
                cur.r = this.add(cur.r, key, value);
            }
            cur.h = Math.max(cur.l != null ? cur.l.h : 0, cur.r != null ? cur.r.h : 0) + 1;
            return this.maintain(cur);
        }
    }
    // 在cur这棵树上，删掉key所代表的节点
    // 返回cur这棵树的新头部
    delete(cur, key) {
        if (key > cur.k) {
            cur.r = this.delete(cur.r, key);
        } else if (key < cur.k) {
            cur.l = this.delete(cur.l, key);
        } else {
            if (cur.l == null && cur.r == null) {
                cur = null;
            } else if (cur.l == null && cur.r != null) {
                cur = cur.r;
            } else if (cur.l != null && cur.r == null) {
                cur = cur.l;
            } else {
                let des = cur.r;
                while (des.l != null) {
                    des = des.l;
                }
                cur.r = this.delete(cur.r, des.k);
                des.l = cur.l;
                des.r = cur.r;
                cur = des;
            }
        }
        if (cur != null) {
            cur.h = Math.max(cur.l != null ? cur.l.h : 0, cur.r != null ? cur.r.h : 0) + 1;
        }
        return this.maintain(cur);
    }
    Size() {
        return this.size;
    }
    containKey(key) {
        if (key == null) {
            return false;
        }
        let lastNode = this.findLastIndex(key);
        return lastNode !== null && key === lastNode.k;
    }
    put(key, value) {
        if (key === null) {
            return;
        }
        let lastNode = this.findLastIndex(key);
        if (lastNode != null && key === lastNode.k) {
            lastNode.v = value;
        } else {
            this.size++;
            this.root = this.add(this.root, key, value);
        }
    }
    remove(key) {
        if(key === null) {
            return;
        }
        if(this.containKey(key)) {
            this.size--;
            this.root = this.delete(this.root, key);
        }
    }
    get(key) {
        if(key === null) {
            return null;
        }
        let lastNode = this.findLastIndex(key);
        if (lastNode != null && key === lastNode.k) {
            return lastNode.v;
        }
        return null;
    }
    firstKey() {
        if (this.root == null) {
            return null;
        }
        let cur = this.root;
        while (cur.l != null) {
            cur = cur.l;
        }
        return cur.k;
    }
    lastKey() {
        if(this.root === null) {
            return null;
        }
        let cur = this.root;
        while (cur.r != null) {
            cur = cur.r;
        }
        return cur.k;
    }
    floorKey(key) {
        if(key === null) {
            return null;
        }
        let lastNoBigNode = this.findLastNoBigIndex(key);
        return lastNoBigNode == null ? null : lastNoBigNode.k;
    }
    ceilingKey(key) {
        if (key == null) {
            return null;
        }
        let lastNoSmallNode = this.findLastNoSmallIndex(key);
        return lastNoSmallNode == null ? null : lastNoSmallNode.k;
    }
}

// test
let AVLTree = new AVLTreeMap();
AVLTree.put("d", 4);
AVLTree.put("c", 3);
AVLTree.put("a", 1);
AVLTree.put("b", 2);
// sbt.put("e", 5);
AVLTree.put("g", 7);
AVLTree.put("f", 6);
AVLTree.put("h", 8);
AVLTree.put("i", 9);
AVLTree.put("a", 111);
console.log(AVLTree.get("a"));
AVLTree.put("a", 1);
console.log(AVLTree.get("a"));
// for (let i = 0; i < AVLTree.size(); i++) {
//     console.log(AVLTree.getIndexKey(i) + " , " + AVLTree.getIndexValue(i));
// }
// printAll(AVLTree.root);
console.log(AVLTree.firstKey());
console.log(AVLTree.lastKey());
console.log(AVLTree.floorKey("g"));
console.log(AVLTree.ceilingKey("g"));
console.log(AVLTree.floorKey("e"));
console.log(AVLTree.ceilingKey("e"));
console.log(AVLTree.floorKey(""));
console.log(AVLTree.ceilingKey(""));
console.log(AVLTree.floorKey("j"));
console.log(AVLTree.ceilingKey("j"));
AVLTree.remove("d");
// printAll(AVLTree.root);
AVLTree.remove("f");
// printAll(AVLTree.root);
