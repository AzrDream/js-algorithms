// 设置二叉树的结构
class Node {
    constructor(data) {
        this.value = data;
        this.left = null;
        this.right = null;
    }
}
// 先序递归
function preOrderRecur(head) {
    if(head === null) {
        return;
    }
    console.log(head.value + " ");
    preOrderRecur(head.left);
    preOrderRecur(head.right);
}
// 中序递归
function inOrderRecur(head) {
    if(head === null) {
        return;
    }
    inOrderRecur(head.left);
    console.log(head.value + " ");
    inOrderRecur(head.right);
}
// 后序递归
function posOrderRecur(head) {
    if(head === null) {
        return;
    }
    posOrderRecur(head.left);
    posOrderRecur(head.right);
    console.log(head.value + " ");
}

let head = new Node(5);
head.left = new Node(3);
head.right = new Node(8);
head.left.left = new Node(2);
head.left.right = new Node(4);
head.left.left.left = new Node(1);
head.right.left = new Node(7);
head.right.left.left = new Node(6);
head.right.right = new Node(10);
head.right.right.left = new Node(9);
head.right.right.right = new Node(11);

// 递归输出
console.log("==============recursive==============");
console.log("pre-order: ");
preOrderRecur(head);
console.log("======================");
console.log("in-order: ");
inOrderRecur(head);
console.log("======================");
console.log("pos-order: ");
posOrderRecur(head);
console.log("======================");
