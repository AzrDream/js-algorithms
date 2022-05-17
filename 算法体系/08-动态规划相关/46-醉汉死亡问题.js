function livePosibility1(row,col,k,N,M) {
    return process(row, col, k, N, M) / Math.pow(4, k);
}
function process(row,col,rest,N,M) {
    if (row < 0 || row === N || col < 0 || col === M) {
        return 0;
    }
    // 还在棋盘中！
    if (rest === 0) {
        return 1;
    }
    // 还在棋盘中！还有步数要走
    let up = process(row - 1, col, rest - 1, N, M);
    let down = process(row + 1, col, rest - 1, N, M);
    let left = process(row, col - 1, rest - 1, N, M);
    let right = process(row, col + 1, rest - 1, N, M);
    return up + down + left + right;
}

function conArr(arr, x, y,z) {
    for(let i = 0; i < x; i++) {
        arr[i] = [];
        for (let j = 0; j < y; j++) {
            arr[i][j] = [];
            for(let k = 0; k < z; k++) {
                arr[i][j][k] = 0;
            }
        }
    }
}
function livePosibility2(row,col,k,N,M) {
    let dp = [];
    conArr(dp,N,M,k+1);
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            dp[i][j][0] = 1;
        }
    }
    for (let rest = 1; rest <= k; rest++) {
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < M; c++) {
                dp[r][c][rest] = pick(dp, N, M, r - 1, c, rest - 1);
                dp[r][c][rest] += pick(dp, N, M, r + 1, c, rest - 1);
                dp[r][c][rest] += pick(dp, N, M, r, c - 1, rest - 1);
                dp[r][c][rest] += pick(dp, N, M, r, c + 1, rest - 1);
            }
        }
    }
    return dp[row][col][k] / Math.pow(4, k);
}
