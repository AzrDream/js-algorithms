class Node {
    constructor(data) {
        this.value = data;
        this.left = null;
        this.right = null;
    }
}
function isBST(head) {
    if (head == null) {
        return true;
    }
    let res = true;
    let pre = null;
    let cur1 = head;
    let cur2 = null;
    while (cur1 != null) {
        cur2 = cur1.left;
        if (cur2 != null) {
            while (cur2.right != null && cur2.right !== cur1) {
                cur2 = cur2.right;
            }
            if (cur2.right == null) {
                cur2.right = cur1;
                cur1 = cur1.left;
                continue;
            } else {
                cur2.right = null;
            }
        }
        if (pre != null && pre.value > cur1.value) {
            res = false;
        }
        pre = cur1;
        cur1 = cur1.right;
    }
    return res;
}

let head = new Node(4);
head.left = new Node(2);
head.right = new Node(6);
head.left.left = new Node(1);
head.left.right = new Node(3);
head.right.left = new Node(5);

console.log(isBST(head));
