function conArr(arr, x, y) {
    for(let i = 0; i < x; i++) {
        arr[i] = [];
        for(let j = 0; j < y; j++) {
            arr[i][j] = 0;
        }
    }
}
function fibonacci(n) {
    if (n < 1) {
        return 0;
    }
    if (n === 1 || n === 2 || n === 3) {
        return n;
    }
    // [ 1 ,1 ]
    // [ 1, 0 ]
    let base = [[1,1,0],[0,0,1],[1,0,0]];
    let res = matrixPower(base, n - 3);
    return 3 * res[0][0] + 2 * res[1][0] + res[2][0];
}
function matrixPower(m,p) {
    let res = [];
    conArr(res, m.length, m[0].length);
    for(let i = 0; i < m.length; i++) {
        res[i][i] = 1;
    }
    // res = 矩阵中的1
    let t = m;// 矩阵1次方
    for(;p !== 0; p >>= 1) {
        if ((p & 1) !== 0) {
            res = muliMatrix(res, t);
        }
        t = muliMatrix(t, t);
    }
    return res;
}
function muliMatrix(m1, m2) {
    let res = [];
    conArr(res, m1.length, m2[0].length);
    for (let i = 0; i < m1.length; i++) {
        for (let j = 0; j < m2[0].length; j++) {
            for (let k = 0; k < m2.length; k++) {
                res[i][j] += m1[i][k] * m2[k][j];
            }
        }
    }
    return res;
}
console.log(fibonacci(5));
