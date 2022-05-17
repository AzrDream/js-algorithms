class Info{
    constructor(c,z){
        this.coins = c;
        this.zhangs = z;
    }
}
// 默认数组去重和张数数组已经准备完成
// coins 面值数组，正数且去重
// zhangs 每种面值对应的张数
function process(coins,zhangs,index,rest) {
    if(index === coins.length){
        return rest === 0 ? 1 : 0;
    }
    let ways = 0;
    for (let zhang = 0; zhang * coins[index] <= rest && zhang <= zhangs[index]; zhang++) {
        ways += process(coins, zhangs, index + 1, rest - (zhang * coins[index]));
    }
    return ways;
}

function conArr(arr, x, y) {
    for(let i = 0; i < x; i++) {
        arr[i] = [];
        for (let j = 0; j < y; j++) {
            arr[i][j] = 0;
        }
    }
}
function dp(arr, aim, coins, zhangs) {
    if (arr == null || arr.length === 0 || aim < 0) {
        return 0;
    }
    let N = coins.length;
    let dp = [];
    conArr(dp,N+1,aim+1);
    dp[N][0] = 1;
    for (let index = N - 1; index >= 0; index--) {
        for (let rest = 0; rest <= aim; rest++) {
            dp[index][rest] = dp[index + 1][rest];
            if (rest - coins[index] >= 0) {
                dp[index][rest] += dp[index][rest - coins[index]];
            }
            if (rest - coins[index] * (zhangs[index] + 1) >= 0) {
                dp[index][rest] -= dp[index + 1][rest - coins[index] * (zhangs[index] + 1)];
            }
        }
    }
    return dp[0][aim];
}
