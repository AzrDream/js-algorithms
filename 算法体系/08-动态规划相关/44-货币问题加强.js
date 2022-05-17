function coinsWay(arr, aim) {
    if (arr == null || arr.length === 0 || aim < 0) {
        return 0;
    }
    return process(arr, 0, aim);
}
// arr[index....] 所有的面值，每一个面值都可以任意选择张数，组成正好rest这么多钱，方法数多少？
function process(arr, index, rest) {
    if(index === arr.length) {  // 没钱了
        return rest === 0 ? 1 : 0;
    }
    let ways = 0;
    for(let zhang = 0; zhang*arr[index] <= rest; zhang++) {
        ways += process(arr, index+1, rest-(zhang*arr[index]))
    }
    return ways;
}
let arr = [1,2,5];
// console.log(coinsWay(arr, 5));


function conArr(arr, x, y) {
    for(let i = 0; i < x; i++) {
        arr[i] = [];
        for (let j = 0; j < y; j++) {
            arr[i][j] = 0;
        }
    }
}
/*
function dp1(arr, aim) {
    if (arr == null || arr.length === 0 || aim < 0) {
        return 0;
    }
    let N = arr.length;
    let dp = [];
    conArr(dp, N+1,aim+1);
    dp[N][0] = 1;
    for(let index = N-1; index>=0; index--) {
        for(let rest = 0; rest <= aim; rest++) {
            let ways = 0;
            for (let zhang = 0; zhang * arr[index] <= rest; zhang++) {
                ways += dp[index + 1][rest - (zhang * arr[index])];
            }
            dp[index][rest] = ways;
        }
    }
    return dp[0][aim];
}*/
console.log(dp2(arr, 5));

function dp2(arr, aim) {
    if (arr == null || arr.length === 0 || aim < 0) {
        return 0;
    }
    let N = arr.length;
    let dp = [];
    conArr(dp, N+1,aim+1);
    dp[N][0] = 1;
    for(let index = N-1; index>=0; index--) {
        for(let rest = 0; rest <= aim; rest++) {
            dp[index][rest] = dp[index+1][rest];
            if(rest-arr[index]>=0) {
                dp[index][rest]+=dp[index][rest-arr[index]];
            }
        }
    }
    return dp[0][aim];
}
