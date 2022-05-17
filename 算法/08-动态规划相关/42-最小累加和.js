function conArr(arr, x, y) {
    for(let i = 0; i < x; i++) {
        arr[i] = [];
        for (let j = 0; j < y; j++) {
            arr[i][j] = 0;
        }
    }
}
function minPathSum(m) {
    if (m == null || m.length === 0 || m[0] == null || m[0].length === 0) {
        return 0;
    }
    let row = m.length;
    let col = m[0].length;
    let dp = [];
    conArr(dp, row, col);
    dp[0][0] = m[0][0];
    for (let i = 1; i < row; i++) {
        dp[i][0] = dp[i - 1][0] + m[i][0];
    }
    for (let j = 1; j < col; j++) {
        dp[0][j] = dp[0][j - 1] + m[0][j];
    }
    for (let i = 1; i < row; i++) {
        for (let j = 1; j < col; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + m[i][j];
        }
    }
    return dp[row - 1][col - 1];
}
let arr = [[3,7,8,7],[1,2,6,4],[10,3,8,9],[8,1,2,0]];
console.log(minPathSum(arr));

function minPathSum2(m) {
    if (m == null || m.length === 0 || m[0] == null || m[0].length === 0) {
        return 0;
    }
    let row = m.length;
    let col = m[0].length;
    let dp = [];
    dp[0] = m[0][0];
    for(let j = 1; j < col; j++) {
        dp[j] = dp[j-1] + m[0][j];
    }
    for(let i = 1; i < row; i++) {
        dp[0] = dp[0] + m[i][0];
        for(let j = 1; j < col; j++) {
            dp[j] = m[i][j] + Math.min(dp[j-1],dp[j]);
        }
    }
    return dp[col-1];
}
console.log(minPathSum2(arr));
