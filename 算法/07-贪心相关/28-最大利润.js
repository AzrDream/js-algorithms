class Node {
    constructor(p, c) {
        this.p = p;
        this.c = c;
    }
}
function compare1(o1, o2) {
    return o1.c - o2.c;
}
function compare2(o1, o2) {
    return o2.p - o1.p;
}
function findMaximizedCapital(k, W, Profits, Capital) {
    let nodes = [Profits.length];
    for(let i = 0; i < Profits.length; i++) {
        nodes[i] = new Node(Profits[i], Capital[i]);
    }
}
