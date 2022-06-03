function longestIncreasingPath(matrix) {
    let ans = 0;
    let N = matrix.length;
    let M = matrix[0].length;
    for(let i = 0; i < N; i++) {
        for(let j = 0; j < M; j++) {
            ans = Math.max(ans, process(matrix, i, j));
        }
    }
    return ans;
}
// 从m[i][j]开始走，走出来的最长递增链，返回！
function process(m, i, j) {
    // (i,j)不越界，在调用的时候已经判断越不越界了
    let up = i > 0 && m[i][j] < m[i-1][j] ? process(m, i-1,j) : 0;
    let down = i < (m.length-1) && m[i][j] < m[i+1][j] ? process(m, i+1,j) : 0;
    let left = j > 0 && m[i][j] < m[i][j-1] ? process(m, i,j-1) : 0;
    let right = j < (m[0].length-1) && m[i][j] < m[i][j+1] ? process(m, i,j+1) : 0;
    return Math.max(up,down,left,right)+1;
}

function conArr(arr, N, M) {
    for(let i = 0; i < N; i++) {
        arr[i] = [];
        for(let j = 0; j < M; j++) {
            arr[i][j] = 0;
        }
    }
}
function longestIncreasingPath2(matrix) {
    let ans = 0;
    let N = matrix.length;
    let M = matrix[0].length;
    let dp = [];
    conArr(dp,N,M);
    for(let i = 0; i < N; i++) {
        for(let j = 0; j < M; j++) {
            ans = Math.max(ans, process2(matrix, i, j, dp));
        }
    }
    return ans;
}
// 从m[i][j]开始走，走出来的最长递增链，返回！
function process2(m, i, j, dp) {
    if(dp[i][j] !== 0) {
        return dp[i][j];
    }
    // (i,j)不越界，在调用的时候已经判断越不越界了
    let up = i > 0 && m[i][j] < m[i-1][j] ? process2(m, i-1,j, dp) : 0;
    let down = i < (m.length-1) && m[i][j] < m[i+1][j] ? process2(m, i+1,j, dp) : 0;
    let left = j > 0 && m[i][j] < m[i][j-1] ? process2(m, i,j-1, dp) : 0;
    let right = j < (m[0].length-1) && m[i][j] < m[i][j+1] ? process2(m, i,j+1, dp) : 0;
    dp[i][j] = Math.max(up,down,left,right)+1;
    return dp[i][j];
}
let matrix = [[9,9,4],[6,6,8],[2,1,1]];
console.log(longestIncreasingPath(matrix));
console.log(longestIncreasingPath2(matrix));
