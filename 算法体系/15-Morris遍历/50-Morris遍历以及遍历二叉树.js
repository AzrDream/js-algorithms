class Node {
    constructor(data) {
        this.left = null;
        this.right = null;
        this.value = data;
    }
}
function morris(head) {
    if(head === null) {
        return;
    }
    let cur = head;
    let mostRight = null;
    while(cur !== null) {
        mostRight = cur.left;
        if(mostRight !== null) {
            while (mostRight.right != null && mostRight.right !== cur) {    // mostRight  cur左树上最右节点
                mostRight = mostRight.right;
            }
            if (mostRight.right === null) {
                mostRight.right = cur;
                cur = cur.left;
                continue;
            } else {    // mostRight.right === cur
                mostRight.right = null;
            }
        }
        cur = cur.right;
    }
}

// 改先序
function morrisPre(head) {
    if(head === null) {
        return;
    }
    let cur = head;
    let mostRight = null;
    while(cur !== null) {
        mostRight = cur.left;
        if(mostRight !== null) {
            while (mostRight.right != null && mostRight.right !== cur) {    // mostRight  cur左树上最右节点
                mostRight = mostRight.right;
            }
            if (mostRight.right === null) {
                console.log(cur.value);
                mostRight.right = cur;
                cur = cur.left;
                continue;
            } else {    // mostRight.right === cur
                mostRight.right = null;
            }
        }else{
            console.log(cur.value);
        }
        cur = cur.right;
    }
}

// 改中序
function morrisIn(head) {
    if(head === null) {
        return;
    }
    let cur = head;
    let mostRight = null;
    while(cur !== null) {
        mostRight = cur.left;
        if(mostRight !== null) {
            while (mostRight.right != null && mostRight.right !== cur) {    // mostRight  cur左树上最右节点
                mostRight = mostRight.right;
            }
            if (mostRight.right === null) {
                mostRight.right = cur;
                cur = cur.left;
                continue;
            } else {    // mostRight.right === cur
                mostRight.right = null;
            }
        }
        console.log(cur.value);
        cur = cur.right;
    }
}

// 用morris实现后序遍历
function morrisPos(head) {
    if(head === null) {
        return;
    }
    let cur = head;
    let mostRight = null;
    while(cur !== null) {
        mostRight = cur.left;
        if(mostRight !== null) {
            while (mostRight.right != null && mostRight.right !== cur) {    // mostRight  cur左树上最右节点
                mostRight = mostRight.right;
            }
            if (mostRight.right === null) {
                mostRight.right = cur;
                cur = cur.left;
                continue;
            } else {    // mostRight.right === cur
                mostRight.right = null;
                printEdge(cur.left);
            }
        }
        cur = cur.right;
    }
    printEdge(head);
}
function printEdge(head) {
    let tail = reverseEdge(head);
    let cur = tail;
    while(cur !== null) {
        console.log(cur.value);
        cur = cur.right;
    }
    reverseEdge(tail);
}
function reverseEdge(from) {
    let pre = null;
    let next = null;
    while(from !== null) {
        next = from.right;
        from.right = pre;
        pre = from;
        from = next;
    }
    return pre;
}

let head = new Node(4);
head.left = new Node(2);
head.right = new Node(6);
head.left.left = new Node(1);
head.left.right = new Node(3);
head.right.left = new Node(5);
head.right.right = new Node(7);
morrisPre(head);
console.log("======");
morrisIn(head);
console.log("======");
morrisPos(head);
