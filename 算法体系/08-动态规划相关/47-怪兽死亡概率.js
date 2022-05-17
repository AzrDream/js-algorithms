function killMonster(N,M,K) {
    if (N < 1 || M < 1 || K < 1) {
        return 0;
    }
    let all = Math.pow(M + 1, K);
    let kill = process(K,M,N);
    return kill / all;
}
// times:剩余次数
// M:每次的伤害在[0~M]范围上
// hp:当前血量
// 返回砍死的情况数!
function process(times,M,hp) {
    if (times === 0) {
        return hp <= 0 ? 1 : 0;
    }
    if (hp <= 0) {
        return Math.pow(M + 1, times);
    }
    let ways = 0;
    for (let i = 0; i <= M; i++) {
        ways += process(times - 1, M, hp - i);
    }
    return ways;
}

console.log(killMonster(5, 5, 2));
console.log(dp(5, 5, 2));
console.log(dp2(5, 5, 2));

function conArr(arr, x, y) {
    for(let i = 0; i < x; i++) {
        arr[i] = [];
        for (let j = 0; j < y; j++) {
            arr[i][j] = 0;
        }
    }
}
// N:血量
// M:最大伤害
// K:打击次数
function dp(N,M,K) {
    if (N < 1 || M < 1 || K < 1) {
        return 0;
    }
    let all = Math.pow(M + 1, K);
    let dp = [];
    conArr(dp,K+1,N+1);
    dp[0][0] = 1;
    for (let times = 1; times <= K; times++) {
        dp[times][0] = Math.pow(M + 1, times);
        for (let hp = 1; hp <= N; hp++) {
            let ways = 0;
            for (let i = 0; i <= M; i++) {
                if (hp - i >= 0) {
                    ways += dp[times - 1][hp - i];
                } else {
                    ways += Math.pow(M + 1, times - 1);
                }
            }
            dp[times][hp] = ways;
        }
    }
    let kill = dp[K][N];
    return kill / all;
}

function dp2(N,M,K) {
    if (N < 1 || M < 1 || K < 1) {
        return 0;
    }
    let all = Math.pow(M + 1, K);
    let dp = [];
    conArr(dp,K+1,N+1);
    dp[0][0] = 1;
    for (let times = 1; times <= K; times++) {
        dp[times][0] = Math.pow(M + 1, times);
        for (let hp = 1; hp <= N; hp++) {
            dp[times][hp] = dp[times][hp - 1] + dp[times - 1][hp];
            if (hp - 1 - M >= 0) {
                dp[times][hp] -= dp[times - 1][hp - 1 - M];
            } else {
                dp[times][hp] -= Math.pow(M + 1, times - 1);
            }
        }
    }
    let kill = dp[K][N];
    return kill / all;
}
