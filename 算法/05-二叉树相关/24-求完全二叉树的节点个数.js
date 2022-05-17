class Node {
    constructor(data) {
        this.value = data;
        this.left = null;
        this.right = null;
    }
}
function nodeNum(head) {
    if(head === null) {
        return 0;
    }
    return bs(head, 1, mostLeftLevel(head, 1));
}
function bs(node, level, h) {
    if (level === h) {
        return 1;
    }
    if (mostLeftLevel(node.right, level + 1) === h) {
        return (1 << (h - level)) + bs(node.right, level + 1, h);
    } else {
        return (1 << (h - level - 1)) + bs(node.left, level + 1, h);
    }
}
function mostLeftLevel(node, level) {
    while (node != null) {
        level++;
        node = node.left;
    }
    return level - 1;
}
let head = new Node(1);
head.left = new Node(2);
head.right = new Node(3);
head.left.left = new Node(4);
head.left.right = new Node(5);
head.right.left = new Node(6);
console.log(nodeNum(head));
