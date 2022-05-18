function nQueens(n) {
    if(n<1){
        return 0;
    }
    let record = [];
    return process(0,record,n);
}
// 当前来到i行，一共是0~N-1行
// 在i行上放皇后，所有列都尝试
// 必须要保证跟之前所有的皇后不打架
// int[] record record[x] = y 之前的第x行的皇后，放在了y列上
// 返回：不关心i以上发生了什么，i.... 后续有多少合法的方法数
function process(i, record, n) {
    if(i===n) {
        return 1;
    }
    let res = 0;
    // i行的皇后，放哪一列呢？j列，
    for (let j = 0; j < n; j++) {
        if (isValid(record, i, j)) {
            record[i] = j;
            res += process(i + 1, record, n);
        }
    }
    return res;
}
function isValid(record,i,j) {
    // 0..i-1
    for (let k = 0; k < i; k++) {
        if (j === record[k] || Math.abs(record[k] - j) === Math.abs(i - k)) {
            return false;
        }
    }
    return true;
}

console.log(nQueens(4));
console.log(nQueens2(4));

function nQueens2(n) {
    if (n < 1 || n > 32) {
        return 0;
    }
    // 如果你是13皇后问题，limit 最右13个1，其他都是0
    let limit = n === 32 ? -1 : (1 << n) - 1;
    return process2(limit, 0, 0, 0);
}
// 7皇后问题
// limit : 0....0 1 1 1 1 1 1 1
// 之前皇后的列影响：colLim
// 之前皇后的左下对角线影响：leftDiaLim
// 之前皇后的右下对角线影响：rightDiaLim
function process2(limit,colLim,leftDiaLim,rightDiaLim) {
    if (colLim === limit) {
        return 1;
    }
    // pos中所有是1的位置，是你可以去尝试皇后的位置
    let pos = limit & (~(colLim | leftDiaLim | rightDiaLim));
    let mostRightOne = 0;
    let res = 0;
    while (pos !== 0) {
        mostRightOne = pos & (~pos + 1);
        pos = pos - mostRightOne;
        res += process2(limit, colLim | mostRightOne, (leftDiaLim | mostRightOne) << 1,
            (rightDiaLim | mostRightOne) >>> 1);
    }
    return res;
}
