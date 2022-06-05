// 如果先手赢，返回"先手"
// 如果后手赢，返回"后手"
function whoWin(n) {
    if(n < 5) {
        return n === 0 || n === 2 ? "后手" : "先手"
    }
    // 目前，是“先手”先选
    let want = 1;
    while(want <= n) {
        // want n-want
        if(whoWin(n-want) === '后手'){
            return "先手"
        }
        if(want<=(n/4)){
            want*=4
        }else{
            break;
        }
        want *= 4;
    }
    return "后手"
}
function whoWin2(n) {
    if (n % 5 === 0 || n % 5 === 2) {
        return "后手";
    } else {
        return "先手";
    }
}
