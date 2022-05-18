function splitSumClosedSizeHalf() {
    if(arr === null || arr.length < 2) {
        return 0;
    }
    let sum = 0;
    for(let num of arr) {
        sum+=num;
    }
    if((arr.length&1)===0){
        return process(arr, 0, arr.length / 2, sum / 2);
    }else{
        return Math.max(process(arr, 0, arr.length / 2, sum / 2), process(arr, 0, arr.length / 2 + 1, sum / 2));
    }
}
// arr[i....]自由选择，挑选的个数一定要是picks个，累加和<=rest, 离rest最近的返回
function process(arr, i, picks, rest) {
    if (i === arr.length) {
        return picks === 0 ? 0 : -1;
    } else {
        let p1 = process(arr, i + 1, picks, rest);
        // 就是要使用arr[i]这个数
        let p2 = -1;
        let next = -1;
        if (arr[i] <= rest) {
            next = process(arr, i + 1, picks - 1, rest - arr[i]);
        }
        if (next !== -1) {
            p2 = arr[i] + next;
        }
        return Math.max(p1, p2);
    }
}

function conArr(arr, x, y,z) {
    for(let i = 0; i < x; i++) {
        arr[i] = [];
        for (let j = 0; j < y; j++) {
            arr[i][j] = [];
            for(let k = 0; k < z; k++) {
                arr[i][j][k] = -1;
            }
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
    let M = (N + 1) / 2;
    let dp = [];
    conArr(dp,N+1,M+1,sum+1);
    for (let rest = 0; rest <= sum; rest++) {
        dp[N][0][rest] = 0;
    }
    for (let i = N - 1; i >= 0; i--) {
        for (let picks = 0; picks <= M; picks++) {
            for (let rest = 0; rest <= sum; rest++) {
                let p1 = dp[i + 1][picks][rest];
                // 就是要使用arr[i]这个数
                let p2 = -1;
                let next = -1;
                if (picks - 1 >= 0 && arr[i] <= rest) {
                    next = dp[i + 1][picks - 1][rest - arr[i]];
                }
                if (next !== -1) {
                    p2 = arr[i] + next;
                }
                dp[i][picks][rest] = Math.max(p1, p2);
            }
        }
    }
    if ((arr.length & 1) === 0) {
        return dp[0][arr.length / 2][sum];
    } else {
        return Math.max(dp[0][arr.length / 2][sum], dp[0][(arr.length / 2) + 1][sum]);
    }
}
