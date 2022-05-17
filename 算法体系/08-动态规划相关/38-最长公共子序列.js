function longestCommonSubsequence1(s1, s2) {
    if (s1 == null || s2 == null || s1.length === 0 || s2.length === 0) {
        return 0;
    }
    // 尝试
    return process1(s1, s2, s1.length - 1, s2.length - 1);
}
function process1(str1, str2, i, j) {
    if (i === 0 && j === 0) {   // 边界
        return str1[i] === str2[j] ? 1 : 0;
    }else if (i === 0) {  // 特殊位置
        if (str1[i] === str2[j]) {
            return 1
        } else {
            return process1(str1, str2, i, j - 1);
        }
    } else if (j === 0) {   // 特殊位置
        if (str1[i] === str2[j]) {
            return 1
        } else {
            return process1(str1, str2, i - 1, j);
        }
    } else {    // 都不为0
        let p1 = process1(str1,str2,i-1,j);
        let p2 = process1(str1,str2,i,j-1);
        let p3 = str1[i] === str2[j] ? (1 + process1(str1,str2,i-1,j-1)) : 0;
        return Math.max(p1,p2,p3);
    }
}
let str1 = 'abcde';
let str2 = 'ace';
console.log(longestCommonSubsequence1(str1, str2));

function conArr(arr, row, col) {
    for(let i = 0; i < row; i++) {
        arr[i] = [];
        for(let j = 0; j < col; j++){
            arr[i][j] = 0;
        }
    }
}
function longestCommonSubsequence2(s1, s2) {
    if (s1 == null || s2 == null || s1.length === 0 || s2.length === 0) {
        return 0;
    }
    // 尝试
    let N = s1.length;
    let M = s2.length;
    let dp = [];
    conArr(dp,N,M);
    dp[0][0] = s1[0] === s2[0] ? 1 : 0;
    for (let j = 1; j < M; j++) {
        dp[0][j] = s1[0] === s2[j] ? 1 : dp[0][j - 1];
    }
    for (let i = 1; i < N; i++) {
        dp[i][0] = s1[i] === s2[0] ? 1 : dp[i - 1][0];
    }
    for (let i = 1; i < N; i++) {
        for (let j = 1; j < M; j++) {
            let p1 = dp[i - 1][j];
            let p2 = dp[i][j - 1];
            let p3 = s1[i] === s2[j] ? (1 + dp[i - 1][j - 1]) : 0;
            dp[i][j] = Math.max(p1, p2, p3);
        }
    }
    return dp[N-1][M-1];
}
console.log(longestCommonSubsequence2(str1, str2));
