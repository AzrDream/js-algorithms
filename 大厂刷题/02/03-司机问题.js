function maxMoney(income) {
    if (income == null || income.length < 2 || (income.length & 1) !== 0) {
        return 0;
    }
    let N = income.length; // 司机数量一定是偶数，所以才能平分，A N /2 B N/2
    let M = N >> 1; // M = N / 2 要去A区域的人
    return process1(income, 0, M);
}
// index.....所有的司机，往A和B区域分配！
// A区域还有rest个名额!
// 返回把index...司机，分配完，并且最终A和B区域同样多的情况下，index...这些司机，整体收入最大是多少！
function process1(income, index, rest) {
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
