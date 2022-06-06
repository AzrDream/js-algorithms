function num1(arr, sum) {
    if(sum === 0) {
        return true;
    }
    if(arr === null || arr.length===0) {
        return false;
    }
    return process1(arr,0, sum);
}
// 自由使用i到length-1的长度数组，能不能组成sum
function process1(arr, i, sum) {
    if(sum === 0) {
        return true;
    }
    if(i > arr.length-1) {
        return false;
    }
    return process1(arr, i+1, sum - arr[i]) ||
        process1(arr, i+1, sum);
}

function conArr(arr, a, b) {
    for(let i = 0; i < a; i++) {
        arr[i] = [];
        for (let j = 0; j < b; j++) {
            arr[i][j] = -1;
        }
    }
}
// 记忆化搜索
function num2(arr, sum) {
    if(sum === 0) {
        return true;
    }
    if(arr === null || arr.length===0) {
        return false;
    }
    let dp = [];
    conArr(dp, arr.length, sum);
    return process2(arr,0, sum, dp);
}
function process2(arr, i, sum, dp) {
    if(dp[i][sum] !== -1) {
        return dp[i][sum];
    }
    let ans = false;
    if(sum === 0) {
        ans = true;
    }else{
        ans = process2(arr, i+1, sum - arr[i], dp) ||
            process2(arr, i+1, sum, dp);
    }
    dp[i][sum] = ans;
    return ans;
}
let arr = [1,2,3,4,5];
console.log(num1(arr, -1));
console.log(num2(arr, -1));
