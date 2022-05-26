class Node {
    constructor(data) {
        this.value = data;
        this.left = null;
        this.right = null;
    }
}
function MinHeight(head) {
    if(head === null) {
        return 0;
    }
    return p(head);
}
function p(x) {
    if (x.left === null && x.right === null) {
        return 1;
    }
    // 左右子树起码有一个不为空
    let leftH = Number.MAX_VALUE;
    if (x.left != null) {
        leftH = p(x.left);
    }
    let rightH = Number.MAX_VALUE;
    if (x.right != null) {
        rightH = p(x.right);
    }
    return 1 + Math.min(leftH, rightH);
}

// morris遍历
function minHeight2(head) {
    if (head == null) {
        return 0;
    }
    let cur = head;
    let mostRight = null;
    let curLevel = 0;
    let minHeight = Number.MAX_VALUE;
    while (cur != null) {
        mostRight = cur.left;
        if (mostRight != null) {
            let rightBoardSize = 1;
            while (mostRight.right != null && mostRight.right !== cur) {
                rightBoardSize++;
                mostRight = mostRight.right;
            }
            if (mostRight.right == null) { // 第一次到达
                curLevel++;
                mostRight.right = cur;
                cur = cur.left;
                continue;
            } else { // 第二次到达
                if (mostRight.left == null) {
                    minHeight = Math.min(minHeight, curLevel);
                }
                curLevel -= rightBoardSize;
                mostRight.right = null;
            }
        } else { // 只有一次到达
            curLevel++;
        }
        cur = cur.right;
    }
    let finalRight = 1;
    cur = head;
    while (cur.right != null) {
        finalRight++;
        cur = cur.right;
    }
    if (cur.left == null && cur.right == null) {
        minHeight = Math.min(minHeight, finalRight);
    }
    return minHeight;
}

let head = new Node(4);
head.left = new Node(2);
head.right = new Node(6);
head.left.left = new Node(1);
head.left.right = new Node(3);
head.right.left = new Node(5);
head.right.right = new Node(7);
console.log(MinHeight(head));
console.log(minHeight2(head));
