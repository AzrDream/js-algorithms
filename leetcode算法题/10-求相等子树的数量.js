class Node {
    val;
    left;
    right;
    constructor(val) {
        this.val = val;
    }
}
// 方法一
function sameNumber1(head) {
    if(head === null) {
        return 0;
    }
    return sameNumber1(head.left) + sameNumber1(head.right) + (same(head.left, head.right) ? 1 : 0);
}
function same(h1,h2) {
    if(h1=== null ^ h2 === null) {
        return false;
    }
    if(h1=== null && h2 === null) {
        return true;
    }
    return h1.value === h2.value && same(h1.left,h2.left) && same(h1.right,h2.right);
}

// 对数器，生成随机树
function randomBinaryTree(restLevel, maxValue) {
    if(restLevel === 0) {
        return null;
    }
    let num = Math.floor(Math.random()*maxValue);
    let head = Math.random() < 0.2 ? null : new Node(num);
    if(head !== null) {
        head.left = randomBinaryTree(restLevel - 1, maxValue);
        head.right = randomBinaryTree(restLevel - 1,maxValue);
    }
    return head;
}

// 测试
let maxLevel = 8;
let maxValue = 4;
let testTime = 10000;
console.log("测试开始");
for(let i = 0; i < testTime; i++) {
    let head = randomBinaryTree(maxLevel, maxValue);
    let ans1 = sameNumber1(head);
    let ans2 = sameNumber1(head);
    if(ans1 !== ans2) {
        console.log("出错了");
        console.log(ans1);
        console.log(ans2);
    }
}
