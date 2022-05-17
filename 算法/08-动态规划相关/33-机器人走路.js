function robotWalkWay1(N,start,aim,K) {
    return process1(start,K,aim,N);
}
// 机器人当前来到的位置是cur，
// 机器人还有rest步需要去走，
// 最终的目标是aim，
// 有哪些位置？1~N
// 返回：机器人从cur出发，走过rest步之后，最终停在aim的方法数，是多少？
function process1(cur,rest,aim,N){
    if(rest === 0) {    // 不需要走了。走完了
        return cur === aim ? 1 : 0;
    }
    // 特殊位置
    if(cur === 1) {
        return process1(2,rest-1,aim,N);
    }
    if(cur === N) {
        return process1(N-1,rest-1,aim,N);
    }
    // 中间位置
    return process1(cur-1,rest-1,aim,N)+process1(cur+1,rest-1,aim,N);
}
// console.log(robotWalkWay1(7, 2, 4, 4));

function robotWalkWay2(N,start,aim,K) {
    let dp = [];
    for(let i = 0; i <= N; i++){
        dp[i] = [];
        for(let j = 0; j <= K; j++){
            dp[i][j] = -1;
        }
    }
    // dp就是缓存表
    // dp[cur][rest] == -1 -> process1(cur, rest)之前没算过！
    // dp[cur][rest] != -1 -> process1(cur, rest)之前算过！返回值，dp[cur][rest]
    // N+1 * K+1
    return process2(start,K,aim,N,dp);
}
// cur 范: 1 ~ N
// rest 范：0 ~ K
function process2(cur,rest,aim,N,dp){
    if(dp[cur][rest]!==-1) {    // 之前进入过
        return dp[cur][rest];
    }
    // 之前没算过
    let ans = 0;
    if(rest === 0) {
        ans = cur === aim ? 1 : 0;
    }else if (cur === 1) {
        ans = process1(2,rest-1,aim,N,dp);
    }else if(cur === N) {
        ans = process1(N-1,rest-1,aim,N,dp);
    }else{
        ans = process1(cur-1,rest-1,aim,N,dp)+process1(cur+1,rest-1,aim,N,dp);
    }
    dp[cur][rest] = ans;
    return ans;
}
// console.log(robotWalkWay2(7, 2, 4, 4));

function robotWalkWay3(N,start,aim,K) {
    let dp = [];
    for(let i = 0; i <= N; i++){
        dp[i] = [];
        for(let j = 0; j <= K; j++) {
            dp[i][j] = 0;
        }
    }
    dp[aim][0] = 1;
    for(let rest = 1; rest<=K;rest++) {
        dp[1][rest] = dp[2][rest-1];
        for(let cur = 2; cur < N; cur++) {
            dp[cur][rest] = dp[cur-1][rest-1]+dp[cur+1][rest-1];
        }
        dp[N][rest] = dp[N-1][rest-1];
    }
    return dp[start][K];
}
console.log(robotWalkWay3(7, 2, 4, 4));
