class SkipListNode{
    constructor(k, v) {
        this.key = k;
        this.val = v;
        this.nextNodes = [];
    }
    // 遍历的时候，如果是往右遍历到的null(next == null), 遍历结束
    // 头(null), 头节点的null，认为最小
    // node  -> 头，node(null, "")  node.isKeyLess(!null)  true
    // node里面的key是否比otherKey小，true，不是false
    isKeyLess(otherKey) {
        //  otherKey == null -> false
        return otherKey != null && (this.key == null || this.key < otherKey);
    }
    isKeyEqual(otherKey) {
        return (this.key == null && otherKey == null)
            || (this.key != null && otherKey != null && this.key === otherKey);
    }
}
class SkipListMap{
    constructor() {
        this.PROBABILITY = 0.5;
        this.head = new SkipListNode(null, null);
        this.head.nextNodes.push(null); // 0
        this.size = 0;
        this.maxLevel = 0;
    }
    // 从最高层开始，一路找下去，
    // 最终，找到第0层的<key的最右的节点
    mostRightLessNodeInTree(key) {
        if (key == null) {
            return null;
        }
        let level = this.maxLevel;
        let cur = this.head;
        while (level >= 0) { // 从上层跳下层
            //  cur  level  -> level-1
            cur = this.mostRightLessNodeInLevel(key, cur, level--);
        }
        return cur;
    }
    // 在level层里，如何往右移动
    // 现在来到的节点是cur，来到了cur的level层，在level层上，找到<key最后一个节点并返回
    mostRightLessNodeInLevel(key,cur,level) {
        let next = cur.nextNodes[level];
        while (next != null && next.isKeyLess(key)) {
            cur = next;
            next = cur.nextNodes[level];
        }
        return cur;
    }
    containsKey(key) {
        if (key == null) {
            return false;
        }
        let less = this.mostRightLessNodeInTree(key);
        let next = less.nextNodes[0];
        return next != null && next.isKeyEqual(key);
    }
    // 新增、改value
    put(key, value) {
        if (key == null) {
            return;
        }
        // 0层上，最右一个，< key 的Node -> >key
        let less = this.mostRightLessNodeInTree(key);
        let find = less.nextNodes[0];
        if (find != null && find.isKeyEqual(key)) {
            find.val = value;
        } else { // find == null   8   7   9
            this.size++;
            let newNodeLevel = 0;
            while (Math.random() < this.PROBABILITY) {
                newNodeLevel++;
            }
            // newNodeLevel
            while (newNodeLevel > this.maxLevel) {
                this.head.nextNodes.push(null);
                this.maxLevel++;
            }
            let newNode = new SkipListNode(key, value);
            for (let i = 0; i <= newNodeLevel; i++) {
                newNode.nextNodes.push(null);
            }
            let level = this.maxLevel;
            let pre = this.head;
            while (level >= 0) {
                // level 层中，找到最右的 < key 的节点
                pre = this.mostRightLessNodeInLevel(key, pre, level);
                if (level <= newNodeLevel) {
                    newNode.nextNodes[level] = pre.nextNodes[level];
                    pre.nextNodes[level] = newNode;
                }
                level--;
            }
        }
    }
    get(key) {
        if (key == null) {
            return null;
        }
        let less = this.mostRightLessNodeInTree(key);
        let next = less.nextNodes[0];
        return next != null && next.isKeyEqual(key) ? next.val : null;
    }
    remove(key) {
        if (this.containsKey(key)) {
            this.size--;
            let level = this.maxLevel;
            let pre = this.head;
            while (level >= 0) {
                pre = this.mostRightLessNodeInLevel(key, pre, level);
                let next = pre.nextNodes[level];
                // 1）在这一层中，pre下一个就是key
                // 2）在这一层中，pre的下一个key是>要删除key
                if (next != null && next.isKeyEqual(key)) {
                    // free delete node memory -> C++
                    // level : pre -> next(key) -> ...
                    pre.nextNodes[level] = next.nextNodes[level];
                }
                // 在level层只有一个节点了，就是默认节点head
                if (level !== 0 && pre === this.head && pre.nextNodes[level] == null) {
                    this.head.nextNodes = this.head.nextNodes.splice(level, 1);
                    this.maxLevel--;
                }
                level--;
            }
        }
    }
    firstKey() {
        return this.head.nextNodes[0] != null ? this.head.nextNodes[0].key : null;
    }
    lastKey() {
        let level = this.maxLevel;
        let cur = this.head;
        while (level >= 0) {
            let next = cur.nextNodes[level];
            while (next != null) {
                cur = next;
                next = cur.nextNodes[level];
            }
            level--;
        }
        return cur.key;
    }
    ceilingKey(key) {
        if (key == null) {
            return null;
        }
        let less = this.mostRightLessNodeInTree(key);
        let next = less.nextNodes[0];
        return next != null ? next.key : null;
    }
    floorKey(key) {
        if (key == null) {
            return null;
        }
        let less = this.mostRightLessNodeInTree(key);
        let next = less.nextNodes[0];
        return next != null && next.isKeyEqual(key) ? next.key : less.key;
    }
    Size() {
        return this.size;
    }
}

// test
function printAll(obj) {
    for (let i = obj.maxLevel; i >= 0; i--) {
        console.log("Level " + i + " : ");
        let cur = obj.head;
        while (cur.nextNodes[i] != null) {
            let next = cur.nextNodes[i];
            console.log("(" + next.key + " , " + next.val + ") ");
            cur = next;
        }
    }
}

let test = new SkipListMap();
printAll(test);
console.log("======================");
test.put("A", "10");
printAll(test);
console.log("======================");
test.remove("A");
printAll(test);
console.log("======================");
test.put("E", "E");
test.put("B", "B");
test.put("A", "A");
test.put("F", "F");
test.put("C", "C");
test.put("D", "D");
printAll(test);
console.log("======================");
console.log(test.containsKey("B"));
console.log(test.containsKey("Z"));
console.log(test.firstKey());
console.log(test.lastKey());
console.log(test.floorKey("D"));
console.log(test.ceilingKey("D"));
console.log("======================");
test.remove("D");
printAll(test);
console.log("======================");
console.log(test.floorKey("D"));
console.log(test.ceilingKey("D"));
console.log(test.Size());
