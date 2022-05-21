function conArr(arr, x, y) {
    for(let i = 0; i < x; i++) {
        arr[i] = [];
        for(let j = 0; j < y; j++) {
            arr[i][j] = 0;
        }
    }
}
function getNum(n) {
    if (n < 1) {
        return 0;
    }
    if (n === 1 || n === 2) {
        return n;
    }
    let base = [[1,1],[1,0]];
    let res = matrixPower(base, n - 2);
    return 2 * res[0][0] + res[1][0];
}
function matrixPower(m, p) {
    let res = [];
    conArr(res, m.length, m[0].length);
    for (let i = 0; i < res.length; i++) {
        res[i][i] = 1;
    }
    let tmp = m;
    for (; p !== 0; p >>= 1) {
        if ((p & 1) !== 0) {
            res = muliMatrix(res, tmp);
        }
        tmp = muliMatrix(tmp, tmp);
    }
    return res;
}
function muliMatrix(m1,m2) {
    let res = [];
    conArr(res,m1.length,m2[0].length);
    for (let i = 0; i < m1.length; i++) {
        for (let j = 0; j < m2[0].length; j++) {
            for (let k = 0; k < m2.length; k++) {
                res[i][j] += m1[i][k] * m2[k][j];
            }
        }
    }
    return res;
}

console.log(getNum(5));
