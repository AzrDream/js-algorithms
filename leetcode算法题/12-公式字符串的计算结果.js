// 链表节点
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

// 链表
class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0; // length 同数组 length 与下标关系
    }

    // 追加元素
    append(element) {
        let node = new Node(element);
        let current = null;  // 指针？

        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    }

    // 任意位置插入元素
    insert(position, element) {
        if (position >= 0 && position <= this.length) {
            let node = new Node(element);
            let current = this.head;
            let previous = null;
            let index = 0;
            if (position === 0) {
                this.head = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            this.length++;
            return true
        }
        return false
    }

    // 移除指定位置元素
    removeAt(position) {
        if (position > -1 && position < length) {
            let current = this.head;
            let previous = null;
            let index = 0;
            if (position === 0) {
                this.head = current.next;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.length--;
            return current.element;
        }
        return null
    }

    // 寻找元素下标
    findIndex(element) {
        let current = this.head;
        let index = -1;
        while (current) {
            if (element === current.element) {
                return index + 1;
            }
            index++;
            current = current.next;
        }

        return -1;
    }

    // 删除指定文档
    remove(element) {
        let index = this.findIndex(element);
        return removeAt(index);
    }

    isEmpty() {
        return !this.length;
    }

    size() {
        return this.length;
    }

    // 输出字符串
    toString() {
        let current = this.head;
        let string = '';
        while (current) {
            string += ` ${current.element}`;
            current = current.next;
        }
        return string;
    }
}


function getValue(str) {
    return value(str, 0)[0];
}

// 从str[i...]往下算，遇到字符串终止位置或者右括号就停止
// 返回两个值，长度为2的数组
// 负责这一段的结果是多少
// 负责这一段计算到了哪个位置
function value(str, i) {
    let que = new LinkedList();
    let cur = 0;
    let bra = [];
    // 从i出发开始遍历
    while (i < str.length && str[i] !== ')') {
        if (str[i] >= '0' && str[i] <= '9') {
            cur = cur * 10 + parseInt(str[i++]);
        } else if (str[i] !== '(') {  // 遇到的是运算符号
            // addNum(que, cur);
            que.append(str[i++]);
            console.log(que);
            cur = 0;
        } else {  // 遇到左括号了
            bra = value(str, i + 1);
            cur = bra[0];
            i = bra[1] + 1;
        }
    }
    addNum(que, cur);
    return [getNum(que), i];
}

function addNum(que, num) {
    if (!que.isEmpty()) {
        let cur = 0;
        let top = que.removeAt(que.size()-1);
        if (top === '+' || top === '-') {
            que.append(top);
        } else {
            cur = parseInt(que.removeAt(que.size()-1));
            num = top === '*' ? (cur * num) : (cur / num);
        }
    }
    que.append(num);
}

function getNum(que) {
    let res = 0;
    let add = true;
    let cur = null;
    let num = 0;
    while (!que.isEmpty()) {
        cur = que.isEmpty(0);
        if (cur === '+') {
            add = true;
        } else if (cur === '-') {
            add = false;
        } else {
            num = parseInt(cur);
            res += add ? num : (-num);
        }
    }
    return res;
}

let str = '5+6+7-2';
console.log(getValue(str));
