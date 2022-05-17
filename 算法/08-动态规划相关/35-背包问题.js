// 所有的货，重量和价值，都在w和v数组里
// 为了方便，其中没有负数
// bag背包容量，不能超过这个载重
// 返回：不超重的情况下，能够得到的最大价值
function maxValue(w, v, bag) {
    // 尝试函数
    return process(w, v, 0, bag);
}

// index 0~N 当前考虑到index号货物，index后面的所有货物可以自由选择
// rest 负~bag
function process(w, v, index, bag) {
    if (bag < 0) {
        return -1;
    }
    if (index === w.length) {
        return 0;
    }
    // 有货并且有空间
    // 不要当前货
    let p1 = process(w, v, index + 1, bag);
    // 要当前货
    let p2 = 0;
    let next = process(w, v, index + 1, bag - w[index]);
    if (next !== -1) {
        p2 = v[index] + next;
    }
    return Math.max(p1, p2);
}

let w = [1, 2, 3, 4];
let v = [2, 4, 4, 5];

// console.log(maxValue(w, v,5));

function ConArr(arr, col, row) {
    for (let i = 0; i <= col; i++) {
        arr[i] = [];
        for (let j = 0; j <= row; j++) {
            arr[i][j] = 0;
        }
    }
}
function dp(w, v, bag) {
    let N = w.length;
    let dp = [];
    ConArr(dp, N, bag);
    for (let index = N - 1; index >= 0; index--) {
        for (let rest = 0; rest <= bag; rest++) {
            let p1 = dp[index+1][rest];
            let p2 = 0;
            let next = rest-w[index] < 0 ? -1 : dp[index+1][rest-w[index]];
            if (next !== -1) {
                p2 = v[index] + next;
            }
            dp[index][rest] = Math.max(p1, p2);
        }
    }
    return dp[0][bag];
}
console.log(dp(w, v, 5));
