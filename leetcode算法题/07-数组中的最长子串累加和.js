function maxSubArray(arr) {
    if(arr === null || arr.length === 0) {
        return 0;
    }
    // 上一步dp的值
    // dp[0]
    let pre = arr[0];
    let max = pre;
    for(let i = 1; i < arr.length; i++) {
        pre = Math.max(arr[i],arr[i] + pre);
        max = Math.max(max, pre);
    }
    return max;
}

console.log(maxSubArray([-3, 4, -5, 2, -1, 6, -7]));
