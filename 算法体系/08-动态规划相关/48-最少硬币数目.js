function minCoinsNoLimit(arr, aim) {
    return process(arr, 0, aim);
}

// arr[index...]面值，每种面值张数自由选择，
// 搞出rest正好这么多钱，返回最小张数
// 拿Number.MAX_VALUE标记怎么都搞定不了
function process(arr, index, rest) {
    if (index === arr.length) {
        return rest === 0 ? 0 : Number.MAX_VALUE;
    } else {
        let ans = Number.MAX_VALUE;
        for (let zhang = 0; zhang * arr[index] <= rest; zhang++) {
            let next = process(arr, index + 1, rest - zhang * arr[index]);
            if (next !== Number.MAX_VALUE) {
                ans = Math.min(ans, zhang + next);
            }
        }
        return ans;
    }
}

let arr = [1, 2, 5];
console.log(minCoinsNoLimit(arr, 11));
console.log(dp(arr, 11));
console.log(dp2(arr, 11));

function conArr(arr, x, y) {
    for (let i = 0; i < x; i++) {
        arr[i] = [];
        for (let j = 0; j < y; j++) {
            arr[i][j] = 0;
        }
    }
}
function dp(arr, aim) {
    if (aim === 0) {
        return 0;
    }
    let N = arr.length;
    let dp = [];
    conArr(dp, N + 1, aim + 1);
    dp[N][0] = 0;
    for (let j = 1; j <= aim; j++) {
        dp[N][j] = Number.MAX_VALUE;
    }
    for (let index = N - 1; index >= 0; index--) {
        for(let rest = 0; rest <= aim; rest++) {
            let ans = Number.MAX_VALUE;
            for (let zhang = 0; zhang * arr[index] <= rest; zhang++) {
                let next = dp[index + 1][rest - zhang * arr[index]];
                if (next !== Number.MAX_VALUE) {
                    ans = Math.min(ans, zhang + next);
                }
            }
            dp[index][rest] = ans;
        }
    }
    return dp[0][aim];
}

function dp2(arr, aim) {
    if (aim === 0) {
        return 0;
    }
    let N = arr.length;
    let dp = [];
    conArr(dp, N + 1, aim + 1);
    dp[N][0] = 0;
    for (let j = 1; j <= aim; j++) {
        dp[N][j] = Number.MAX_VALUE;
    }
    for (let index = N - 1; index >= 0; index--) {
        for(let rest = 0; rest <= aim; rest++) {
            dp[index][rest] = dp[index+1][rest];
            if(rest-arr[index] >= 0
                && dp[index][rest-arr[index]] !== Number.MAX_VALUE){ // 旁边的值不越界 并且 值有效
                dp[index][rest] = Math.min(dp[index][rest],dp[index][rest-arr[index]]+1);
            }
        }
    }
    return dp[0][aim];
}
