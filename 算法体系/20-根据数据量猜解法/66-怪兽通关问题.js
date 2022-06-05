// int[] d d[i]：i号怪兽的武力
// int[] p p[i]：i号怪兽要求的钱
// ability 当前你所具有的能力
// index 来到了第index个怪兽的面前

// 目前，你的能力是ability，你来到了index号怪兽的面前，如果要通过后续所有的怪兽，
// 请返回需要花的最少钱数
function process(d, p, ability, index) {
    if(index === d.length) {
        return 0;
    }
    if(ability < d[index]){
        return p[index] + process(d,p,ability+d[index], index+1);
    }else{
        return Math.min(
            p[index]+process(d,p,ability+d[index]),
            process(d, p, ability, index+1)
        )
    }
}

// 从0....index号怪兽，花的钱，必须严格==money
// 如果通过不了，返回-1
// 如果可以通过，返回能通过情况下的最大能力值
function process2(d,p,index,money) {
    if (index === -1) { // 一个怪兽也没遇到呢
        return money === 0 ? 0 : -1;
    }
    // index >= 0
    // 1) 不贿赂当前index号怪兽
    let preMaxAbility = process2(d, p, index - 1, money);
    let p1 = -1;
    if (preMaxAbility !== -1 && preMaxAbility >= d[index]) {
        p1 = preMaxAbility;
    }
    // 2) 贿赂当前的怪兽 当前的钱 p[index]
    let preMaxAbility2 = process2(d, p, index - 1, money - p[index]);
    let p2 = -1;
    if (preMaxAbility2 !== -1) {
        p2 = d[index] + preMaxAbility2;
    }
    return Math.max(p1, p2);
}
// 调用方法2
function minMoney2(d, p) {
    let allMoney = 0;
    for (let i = 0; i < p.length; i++) {
        allMoney += p[i];
    }
    let N = d.length;
    for (let money = 0; money < allMoney; money++) {
        if (process2(d, p, N - 1, money) !== -1) {
            return money;
        }
    }
    return allMoney;
}
