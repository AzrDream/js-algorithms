function splitNumber(n) {
    if(n === 1) {
        return 1;
    }
    return process(1,n);
}
// 上一个拆出来的数是pre
// 还剩rest需要去拆
// 返回拆解的方法数
function process(pre,rest){
    if(rest === 0){
        return 1;
    }
    if(pre>rest){
        return 0;
    }
    let ways = 0;
    for(let first = pre; first <= rest; first++) {
        ways+=process(first,rest-first);
    }
    return ways;
}

function conArr(arr, x, y) {
    for (let i = 0; i < x; i++) {
        arr[i] = [];
        for (let j = 0; j < y; j++) {
            arr[i][j] = 0;
        }
    }
}
function dp(N) {
    if(N < 0){
        return 0;
    }
    if(N === 1) {
        return 1;
    }
    let dp = [];
    conArr(dp,N+1,N+1);
    for(let pre = 1; pre <= N; pre++) {
        dp[pre][0] = 1;
        dp[pre][pre] = 1;
    }
    for(let pre = N-1; pre >= 1; pre--){
        for(let rest = pre+1;rest <= N; rest++) {
            let ways = 0;
            for(let first = pre; first <= rest; first++) {
                ways+=dp[first][rest-first];
            }
            dp[pre][rest] = ways;
        }
    }
    return dp[1][N];
}

function dp2(N) {
    if(N < 0){
        return 0;
    }
    if(N === 1) {
        return 1;
    }
    let dp = [];
    conArr(dp,N+1,N+1);
    for(let pre = 1; pre <= N; pre++) {
        dp[pre][0] = 1;
        dp[pre][pre] = 1;
    }
    for(let pre = N-1; pre >= 1; pre--){
        for(let rest = pre+1;rest <= N; rest++) {
            dp[pre][rest] = dp[pre + 1][rest];
            dp[pre][rest] += dp[pre][rest - pre];
        }
    }
    return dp[1][N];
}

console.log(splitNumber(13));
console.log(dp(13));
console.log(dp2(13));
