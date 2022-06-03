// 暴力方法
function right(m,a,b,c,x) {
    let qian = [100, 50, 10];
    let zhang = [a, b, c];
    let puts = 0;
    while (m !== 0) {
        let cur = buy(qian, zhang, x);
        if (cur === -1) {
            return -1;
        }
        puts += cur;
        m--;
    }
    return puts;
}
function buy(qian, zhang, rest) {
    let first = -1;
    for (let i = 0; i < 3; i++) {
        if (zhang[i] !== 0) {
            first = i;
            break;
        }
    }
    if (first === -1) {
        return -1;
    }
    if (qian[first] >= rest) {
        zhang[first]--;
        giveRest(qian, zhang, first + 1, qian[first] - rest, 1);
        return 1;
    } else {
        zhang[first]--;
        let next = buy(qian, zhang, rest - qian[first]);
        if (next === -1) {
            return -1;
        }
        return 1 + next;
    }
}

// 要买的可乐数量，m
// 100元有a张
// 50元有b张
// 10元有c张
// 可乐单价x
function putTimes(m, a, b, c, x) {
    let qian = [100, 50, 10];
    let zhang = [a, b, c];
    // 总共需要多少次投币
    let puts = 0;
    // 之前面值的钱还剩下多少总钱数
    let preQianRest = 0;
    // 之前面值的钱还剩下多少总张数
    let preQianZhang = 0;
    for (let i = 0; i < 3 && m !== 0; i++) {
        // 要用之前剩下的钱、当前面值的钱，共同买第一瓶可乐
        // 之前的面值剩下多少钱，是preQianRest
        // 之前的面值剩下多少张，是preQianZhang
        // 之所以之前的面值会剩下来，一定是剩下的钱，一直攒不出一瓶可乐的单价
        // 当前的面值付出一些钱+之前剩下的钱，此时有可能凑出一瓶可乐来
        // 那么当前面值参与搞定第一瓶可乐，需要掏出多少张呢？就是curQianFirstBuyZhang
        let curQianFirstBuyZhang = (x - preQianRest + qian[i] - 1) / qian[i];
        if (zhang[i] >= curQianFirstBuyZhang) { // 如果之前的钱和当前面值的钱，能凑出第一瓶可乐
            // 凑出来了一瓶可乐也可能存在找钱的情况，
            giveRest(qian, zhang, i + 1, (preQianRest + qian[i] * curQianFirstBuyZhang) - x, 1);
            puts += curQianFirstBuyZhang + preQianZhang;
            zhang[i] -= curQianFirstBuyZhang;
            m--;
        } else { // 如果之前的钱和当前面值的钱，不能凑出第一瓶可乐
            preQianRest += qian[i] * zhang[i];
            preQianZhang += zhang[i];
            continue;
        }
        // 凑出第一瓶可乐之后，当前的面值有可能能继续买更多的可乐
        // 以下过程就是后续的可乐怎么用当前面值的钱来买
        // 用当前面值的钱，买一瓶可乐需要几张
        let curQianBuyOneColaZhang = (x + qian[i] - 1) / qian[i];
        // 用当前面值的钱，一共可以搞定几瓶可乐
        let curQianBuyColas = Math.min(zhang[i] / curQianBuyOneColaZhang, m);
        // 用当前面值的钱，每搞定一瓶可乐，收货机会吐出多少零钱
        let oneTimeRest = qian[i] * curQianBuyOneColaZhang - x;
        // 每次买一瓶可乐，吐出的找零总钱数是oneTimeRest
        // 一共买的可乐数是curQianBuyColas，所以把零钱去提升后面几种面值的硬币数，
        // 就是giveRest的含义
        giveRest(qian, zhang, i + 1, oneTimeRest, curQianBuyColas);
        // 当前面值去搞定可乐这件事，一共投了几次币
        puts += curQianBuyOneColaZhang * curQianBuyColas;
        // 还剩下多少瓶可乐需要去搞定，继续用后面的面值搞定去吧
        m -= curQianBuyColas;
        // 当前面值可能剩下若干张，要参与到后续买可乐的过程中去，
        // 所以要更新preQianRest和preQianZhang
        zhang[i] -= curQianBuyOneColaZhang * curQianBuyColas;
        preQianRest = qian[i] * zhang[i];
        preQianZhang = zhang[i];
    }
    return m === 0 ? puts : -1;
}
function giveRest(qian, zhang, i, oneTimeRest, times) {
    for (; i < 3; i++) {
        zhang[i] += (oneTimeRest / qian[i]) * times;
        oneTimeRest %= qian[i];
    }
}

console.log(right(2, 2, 3, 10, 200));
console.log(putTimes(2, 2, 3, 10, 200));
