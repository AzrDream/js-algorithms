class Node2 {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
        this.proxyData();
    }
    proxyData() {
        for(let key in this.data) {
            Object.defineProperty(this, key, {
                get:() => {
                    return this.data[key];
                }
            })
        }
    }
}
class SingleList {
    constructor() {
        this.size = 0;  // 单链表的长度
        this.head = new Node2('head');  // 表头节点
        this.currNode = '';  // 当前节点的指向
    }
    // 判断单链表是否为空
    isEmpty() {
        return this.size === 0;
    }
    // poll：获取头节点并且删除头节点
    poll() {
        let currNode = this.head.next;
        if(this.head.next!==null){
            this.head.next = this.head.next.next;
        }
        return currNode;
    }
    // 获取单链表的最后一个节点
    findLast() {
        let currNode = this.head;
        while (currNode.next) {
            currNode = currNode.next;
        }
        return currNode;
    }
    // 在单链表的尾部添加元素
    add(element) {
        let currNode = this.findLast();
        let newNode = new Node2(element);
        currNode.next = newNode;
        this.size++;
    }
}

// 前缀树的节点
class Node {
    constructor() {
        // 如果一个node，end为空，不是结尾
        // 如果end不为空，表示这个点是某个字符串的结尾，end的值就是这个字符串
        this.end = 0;
        // 只有在上面的end变量不为空的时候，endUse才有意义
        // 表示，这个字符串之前有没有加入过答案
        this.endUse = false;
        this.fail = null;
        this.nexts = [];
        for(let i = 0; i < 26; i++) {
            this.nexts[i] = null;
        }
    }
}

class ACAutomation {
    constructor() {
        this.root = new Node();
    }
    // 你有多少个匹配串，就调用多少次insert
    insert(str) {
        let cur = this.root;
        let index = 0;
        for(let i = 0; i < str.length; i++) {
            index = str[i].charCodeAt(0) - 'a'.charCodeAt(0);
            if (cur.nexts[index] === null) {
                cur.nexts[index] = new Node();
            }
            cur = cur.nexts[index];
        }
        cur.end = str;
    }
    build(){
        let queue = new SingleList();
        queue.add(this.root);
        let cur = null;
        let cfail = null;
        while(!queue.isEmpty()){
            // 当前节点弹出，
            // 当前节点的所有后代加入到队列里去，
            // 当前节点给它的子去设置fail指针
            // cur -> 父亲
            cur = queue.poll();
            for (let i = 0; i < 26; i++) { // 下级所有的路
                if (cur.nexts[i] !== null) { // 该路下有子节点
                    cur.nexts[i].fail = this.root; // 初始时先设置一个值
                    cfail = cur.fail;
                    while (cfail !== null) { // cur不是头节点
                        if (cfail.nexts[i] !== null) {
                            cur.nexts[i].fail = cfail.nexts[i];
                            break;
                        }
                        cfail = cfail.fail;
                    }
                    queue.add(cur.nexts[i]);
                }
            }
        }
    }
    containWords(str) {
        let cur = this.root;
        let follow = null;
        let index = 0;
        let ans = new SingleList();
        for (let i = 0; i < str.length; i++) {
            index = str[i].charCodeAt(0) - 'a'.charCodeAt(0);   // 路
            // 如果当前字符在这条路上没配出来，就随着fail方向走向下条路径
            while (cur.nexts[index] === null && cur !== this.root) {
                cur = cur.fail;
            }
            // 1) 现在来到的路径，是可以继续匹配的
            // 2) 现在来到的节点，就是前缀树的根节点
            cur = cur.nexts[index] !== null ? cur.nexts[index] : this.root;
            follow = cur;
            while (follow !== this.root) {
                if (follow.endUse) {
                    break;
                }
                // 不同的需求，在这一段之间修改
                if(follow.end !== null) {
                    ans.add(follow.end);
                    follow.endUse = true;
                }
                // 不同的需求，在这一段之间修改
                follow = follow.fail;
            }
        }
        return ans;
    }
}

let ac = new ACAutomation();
ac.insert("ahe");
ac.insert("he");
ac.insert("c");
ac.build();
console.log(ac.containWords("cdhe"));
