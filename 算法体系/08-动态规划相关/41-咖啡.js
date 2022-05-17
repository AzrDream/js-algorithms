// drinks 所有杯子可以开始洗的时间
// wash 单杯洗干净的时间（串行）
// air 挥发干净的时间(并行)
// free 洗的机器什么时候可用
// drinks[index.....]都变干净，最早的结束时间（返回）
function bestTime(drinks, wash, air, index, free) {
    if(index === drinks.length) {
        return 0;
    }
    // index号杯子，决定洗，只有当前杯子可以洗的世界并且洗的机器可用才可以洗
    let selfClean1 = Math.max(drinks[index],free)+wash;
    let restClean1 = bestTime(drinks, wash, air, index + 1, selfClean1);
    let p1 = Math.max(selfClean1, restClean1);

    // index号杯子，决定挥发
    let selfClean2 = drinks[index]+air;
    let restClean2 = bestTime(drinks, wash, air, index+1, free);
    let p2 = Math.max(selfClean2, restClean2);
    return Math.min(p1, p2);
}

function conArr(arr, row, col) {
    for (let i = 0; i < row; i++) {
        arr[i] = [];
        for (let j = 0; j < col; j++) {
            arr[i][j] = 0;
        }
    }
}
function bestTimeDp(drinks, wash, air) {
    let N = drinks.length;
    let maxFree = 0;
    for(let i = 0; i < drinks.length; i++) {
        maxFree = Math.max(maxFree, drinks[i]) + wash;
    }
    let dp = [];
    conArr(dp, N+1,maxFree+1);
    for (let index = N - 1; index >= 0; index--) {
        for (let free = 0; free <= maxFree; free++) {
            let selfClean1 = Math.max(drinks[index], free) + wash;
            if (selfClean1 > maxFree) {
                break; // 因为后面的也都不用填了
            }
            // index号杯子 决定洗
            let restClean1 = dp[index + 1][selfClean1];
            let p1 = Math.max(selfClean1, restClean1);
            // index号杯子 决定挥发
            let selfClean2 = drinks[index] + air;
            let restClean2 = dp[index + 1][free];
            let p2 = Math.max(selfClean2, restClean2);
            dp[index][free] = Math.min(p1, p2);
        }
    }
    return dp[0][0];
}
