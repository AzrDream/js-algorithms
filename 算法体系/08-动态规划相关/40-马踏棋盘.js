// 当前来到的位置是（x,y）
// 还剩下rest步需要跳
// 跳完rest步，正好跳到a，b的方法数是多少？
// 10 * 9
function jump(a,b,k) {
    return process(0, 0, k, a, b);
}
function process(x,y,rest,a,b) {
    if (x < 0 || x > 9 || y < 0 || y > 8) {
        return 0;
    }
    if(rest===0){
        return (x===a&&y===b)?1:0;
    }
    let ways = process(x + 2, y + 1, rest - 1, a, b);
    ways += process(x + 1, y + 2, rest - 1, a, b);
    ways += process(x - 1, y + 2, rest - 1, a, b);
    ways += process(x - 2, y + 1, rest - 1, a, b);
    ways += process(x - 2, y - 1, rest - 1, a, b);
    ways += process(x - 1, y - 2, rest - 1, a, b);
    ways += process(x + 1, y - 2, rest - 1, a, b);
    ways += process(x + 2, y - 1, rest - 1, a, b);
    return ways;
}

function conArr(arr,x,y,z) {
    for(let i = 0; i < x;i++){
        arr[i] = [];
        for(let j = 0; j < y; j++) {
            arr[i][j] = [];
            for(let k = 0; k < z; k++) {
                arr[i][j][k] = 0;
            }
        }
    }
}
function jump2(a,b,k) {
    let dp = [];
    conArr(dp,10,9,k+1);
    dp[a][b][0] = 1;
    for(let rest = 1; rest <= k; rest++){
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 9; y++) {
                let ways = pick(dp, x + 2, y + 1, rest - 1);
                ways += pick(dp, x + 1, y + 2, rest - 1);
                ways += pick(dp, x - 1, y + 2, rest - 1);
                ways += pick(dp, x - 2, y + 1, rest - 1);
                ways += pick(dp, x - 2, y - 1, rest - 1);
                ways += pick(dp, x - 1, y - 2, rest - 1);
                ways += pick(dp, x + 1, y - 2, rest - 1);
                ways += pick(dp, x + 2, y - 1, rest - 1);
                dp[x][y][rest] = ways;
            }
        }
    }
    return dp[0][0][k];
}
function pick(dp, x, y, rest) {
    if (x < 0 || x > 9 || y < 0 || y > 8) {
        return 0;
    }
    return dp[x][y][rest];
}
console.log(jump2(7, 7, 10));
