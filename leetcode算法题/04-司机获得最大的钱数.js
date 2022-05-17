// income -> N*2的矩阵 N是偶数
function maxMoney(income) {
    if(income === null || income.length < 2 || income / 2 !== 0) {
        return 0;
    }
    let N = income.length; // 司机数量一定是偶数
    let M = N / 2;  // 要去A区域的人
    return process(income, 0, N);
}
// index往后的司机往A和B区域分配
// A区域还有rest个名额
// 返回把index后面的司机分配完，司机平均分给A和B区域，整体收入最大是多少
function process(income, index, rest) {
    if(index === income.length) {
        return 0;
    }
    // 还剩下的司机数量刚好等于A区域剩下的名额
    if(income.length - index === rest) {
        return income[index][0] + process(income, index + 1, rest - 1);
    }
    // 没有名额
    if(rest === 0) {
        return income[index][1] + process(income, index + 1, rest);
    }
    // 当前司机可以去A或者去B
    let p1 = income[index][0] + process(income, index + 1, rest - 1);
    let p2 = income[index][1] + process(income, index + 1, rest);
    return Math.max(p1, p2);
}
