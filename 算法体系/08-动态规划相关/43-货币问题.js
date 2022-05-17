function coinWays(arr, aim) {
    return process(arr, 0, aim);
}
// arr[index....] 组成正好rest这么多的钱，有几种方法
function process(arr, index, rest) {
    if(rest < 0) {
        return 0;
    }
    if(index === arr.length) {
        return rest === 0 ? 1 : 0;
    }else{
        return process(arr, index + 1, rest) + process(arr, index + 1, rest - arr[index]);
    }
}
let arr = [1,1,1];

function conArr(arr, x, y) {
    for(let i = 0; i < x; i++) {
        arr[i] = [];
        for (let j = 0; j < y; j++) {
            arr[i][j] = 0;
        }
    }
}
function coinWays2(arr, aim) {
    if (aim === 0) {
        return 1;
    }
    let N = arr.length;
    let dp = [];
    conArr(dp,N+1,aim+1);
    dp[N][0] = 1;
    for (let index = N - 1; index >= 0; index--) {
        for (let rest = 0; rest <= aim; rest++) {
            dp[index][rest] = dp[index + 1][rest] + (rest - arr[index] >= 0 ? dp[index + 1][rest - arr[index]] : 0);
        }
    }
    return dp[0][aim];
}
console.log(coinWays2(arr, 2));
