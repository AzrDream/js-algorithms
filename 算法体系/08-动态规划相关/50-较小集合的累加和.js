function splitSumClosed(arr) {
    if(arr === null || arr.length < 2) {
        return 0;
    }
    let sum = 0;
    for(let num of arr) {
        sum+=num;
    }
    return process(arr,0,sum / 2);
}
// arr[i...]可以自由选择，请返回累加和尽量接近rest，但不能超过rest的情况下，最接近的累加和是多少？
function process(arr,i,rest){
    if(i === arr.length) {
        return 0;
    }else{  // 还有数，arr[i]这个数
        let p1 = process(arr,i+1,rest);
        let p2 = 0;
        if(arr[i]<=rest){
            p2 = process(arr,i+1,rest-arr[i]);
        }
        return Math.max(p1,p2);
    }
}

function conArr(arr, x, y) {
    for (let i = 0; i < x; i++) {
        arr[i] = [];
        for (let j = 0; j < y; j++) {
            arr[i][j] = 0;
        }
    }
}
function dp(arr) {
    if (arr == null || arr.length < 2) {
        return 0;
    }
    let sum = 0;
    for (let num of arr) {
        sum += num;
    }
    sum /= 2;
    let N = arr.length;
    let dp = [];
    conArr(dp,N+1,sum+1);
    for (let i = N - 1; i >= 0; i--) {
        for (let rest = 0; rest <= sum; rest++) {
            // 可能性1，不使用arr[i]
            let p1 = dp[i + 1][rest];
            // 可能性2，要使用arr[i]
            let p2 = 0;
            if (arr[i] <= rest) {
                p2 = arr[i] + dp[i + 1][rest - arr[i]];
            }
            dp[i][rest] = Math.max(p1, p2);
        }
    }
    return dp[0][sum];
}
