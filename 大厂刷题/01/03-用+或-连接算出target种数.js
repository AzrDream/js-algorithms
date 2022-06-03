function findTargetSumWays1(arr, s) {
    return process1(arr, 0, s);
}
// 可以自由使用index及其往后的所有数字
// 搞出rest这个数，方法数是多少？返回
function process1(arr, index, rest) {
    if(index === arr.length) { // 没数了
        return rest === 0 ? 1:0;
    }
    // 还有数：arr[index] arr[index+1 ...]
    // 两种选择，在前面添-号，在前面添+号
    return process1(arr, index + 1, rest - arr[index]) + process1(arr, index+1, rest + arr[index]);
}

function findTargetSumWays3(arr, target) {
    let sum = 0;
    for(let n of arr) {
        sum += n;
    }
    return sum < target || ((target & 1)^(sum & 1)) !== 0 ? 0 : subset(arr, (target + sum)>>1);
}
function subset(nums, target) {
    let dp = [];
    for(let i = 0; i <= target+1; i++) {
        dp[i] = 0;
    }
    dp[0] = 1;
    for(let n of nums) {
        for(let i = target; i >= n; i--) {
            dp[i] += dp[i - n];
        }
    }
    if(dp[target] === undefined) dp[target] = 0;
    return dp[target];
}
let arr = [1,2,3,4,5];
let target = 5;
console.log(findTargetSumWays3(arr, target));
