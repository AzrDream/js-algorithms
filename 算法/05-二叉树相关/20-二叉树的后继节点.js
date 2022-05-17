class Node {
    constructor(data) {
        this.value = data;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}
function getSuccessorNode(node) {
    if(node === null) {
        return node;
    }
    if(node.right !== null) {
        return getLeftMost(node.right);
    } else {
        let parent = node.parent;
        while(parent !== null && parent.left !== node) {
            node = parent;
            parent = node.parent;
        }
        return parent;
    }
}
function getLeftMost(node) {
    if(node === null) {
        return node;
    }
    while(node.left !== null) {
        node = node.left;
    }
    return node;
}

// 构造二叉树
let head = new Node(6);
head.parent = null;
head.left = new Node(3);
head.left.parent = head;
head.left.left = new Node(1);
head.left.left.parent = head.left;
head.left.left.right = new Node(2);
head.left.left.right.parent = head.left.left;
head.left.right = new Node(4);
head.left.right.parent = head.left;
head.left.right.right = new Node(5);
head.left.right.right.parent = head.left.right;
head.right = new Node(9);
head.right.parent = head;
head.right.left = new Node(8);
head.right.left.parent = head.right;
head.right.left.left = new Node(7);
head.right.left.left.parent = head.right.left;
head.right.right = new Node(10);
head.right.right.parent = head.right;

let test = head.left.left;
console.log(test.value + " next: "+getSuccessorNode(test).value);
