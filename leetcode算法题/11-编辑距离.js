function minDistance(word1, word2) {
    // return minDistance1(word1, word2, 1, 1, 1);
    return minDistance2(word1, word2, 1, 1, 1);
}
// 不用空间压缩
function minDistance2(str1,str2,ic,dc,rc) {
    if(str1 === null || str2 === null) {
        return 0;
    }
    let N = str1.length + 1;
    let M = str2.length + 1;
    let dp = [];
    for(let i = 0; i < N; i++) {
        dp[i] = [];
        for(let j = 0; j < M; j++) {
            dp[i][j] = 0;
        }
    }
    for(let i = 1; i < N; i++) {
        dp[i][0] = dc*i;
    }
    for(let j = 1; j < M; j++) {
        dp[0][j] = ic*j;
    }
    for(let i = 1; i < N; i++) {
        for(let j = 1; j < M; j++) {
            if(str1[i-1] === str2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            }else{
                dp[i][j] = dp[i-1][j-1]+rc;
            }
            dp[i][j] = Math.min(dp[i][j],dp[i][j-1]+ic);
            dp[i][j] = Math.min(dp[i][j],dp[i-1][j]+dc);
        }
    }
    return dp[N-1][M-1];
}
// 空间压缩
function minDistance1(str1, str2, ic, dc, rc) {
    if(str1 === null || str2 === null) {
        return 0;
    }
    let longs = str1.length>=str2.length?str1:str2;
    let shorts = str1.length<str2.length?str1:str2;
    if(str1.length < str2.length) {
        let tmp = ic;
        ic = dc;
        dc = tmp;
    }
    let dp = [0];
    for(let i = 1; i <= shorts.length; i++) {
        dp[i] = ic*i;
    }
    for(let i = 1; i <= longs.length; i++) {
        let pre = dp[0];
        dp[0] = dc*i;
        for(let j = 1; j <= shorts.length; j++) {
            let tmp = dp[j];
            if(longs[i-1] === shorts[j-1]) {
                dp[j] = pre;
            }else{
                dp[j] = pre+rc;
            }
            dp[j] = Math.min(dp[j],dp[j-1]+ic);
            dp[j] = Math.min(dp[j],tmp+dc);
            pre = tmp;
        }
    }
    return dp[shorts.length];
}

console.log(minDistance("intention", 'execution'));
