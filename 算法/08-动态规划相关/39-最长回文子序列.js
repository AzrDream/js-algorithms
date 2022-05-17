function longestPalindromeSubseq(s1) {
    return longestCommonSubsequence2(s1, s1.split('').reverse().join(''));
}

function conArr(arr, row, col) {
    for (let i = 0; i < row; i++) {
        arr[i] = [];
        for (let j = 0; j < col; j++) {
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
    conArr(dp, N, M);
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
    return dp[N - 1][M - 1];
}
let str = 'bbbab';
// console.log(longestPalindromeSubseq('bbbab'));

function lpsl(s) {
    if (s === null || s.length === 0) {
        return 0;
    }
    return f(s, 0, s.length - 1);
}
// str[L..R]最长回文子序列长度返回
function f(str, L, R) {
    if (L === R) {
        return 1;
    }
    if (L === R - 1) {
        return str[L] === str[R] ? 2 : 1;
    }
    // 最长回文子序列即不以L开头也不以R结尾
    let p1 = f(str, L+1, R-1);
    // 以L开头不以R结尾
    let p2 = f(str, L+1, R);
    // 不以L开头以R结尾
    let p3 = f(str, L, R-1);
    // 即以L开头又以R结尾
    let p4 = str[L] === str[R] ? (2 + f(str, L+1, R-1)):0;
    return Math.max(p1,p2,p3,p4);
}
// console.log(lpsl(str));

function lps2(s) {
    if (s === null || s.length === 0) {
        return 0;
    }
    let N = s.length;
    let dp = [];
    conArr(dp,N,N);
    dp[N - 1][N - 1] = 1;
    for(let i = 0; i < N; i++) {
        dp[i][i] = 1;
        dp[i][i + 1] = s[i] === s[i + 1] ? 2 : 1;
    }
    for (let L = N - 3; L >= 0; L--) {
        for (let R = L + 2; R < N; R++) {
            dp[L][R] = Math.max(dp[L][R - 1], dp[L + 1][R]);
            if (s[L] === s[R]) {
                dp[L][R] = Math.max(dp[L][R], 2 + dp[L + 1][R - 1]);
            }
        }
    }
    return dp[0][N-1];
}
console.log(lps2(str));
