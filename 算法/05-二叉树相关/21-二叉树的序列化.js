class Node {
    constructor(data) {
        this.value = data;
        this.left = null;
        this.right = null;
    }
}
// 先序序列化
function serialByPre(head) {
    if(head === null) {
        return "#_";
    }
    let res = head.value + "_";
    res += serialByPre(head.left);
    res += serialByPre(head.right);
    return res;
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

console.log(serialByPre(head));
