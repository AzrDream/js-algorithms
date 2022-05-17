class Node {
    constructor(data){
        this.value = data;
        this.left = null;
        this.right = null;
    }
}
function isBalance(head) {
    let res = [true];
    getHeight(head, 1, res);
    return res[0];
}
function getHeight(head, level, res) {
    if(head === null) {
        return level;
    }
    let lH = getHeight(head.left, level + 1, res);
    if(!res[0]) {
        return level;
    }
    let rH = getHeight(head.right, level + 1, res);
    if(!res[0]) {
        return level;
    }
    if(Math.abs(lH - rH) > 1) {
        res[0] = false;
    }
    return Math.max(lH, rH);
}

let head = new Node(1);
head.left = new Node(2);
head.right = new Node(3);
head.left.left = new Node(4);
head.left.right = new Node(5);
head.right.left = new Node(6);
head.right.right = new Node(7);

console.log(isBalance(head));
