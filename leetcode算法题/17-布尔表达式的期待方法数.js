class Info{
    t = 0;
    f = 0;
    constructor(tr,fa) {
        this.t = tr;
        this.f = fa;
    }
}
// 返回str从l到r返回true和false的方法数
// 限制：l到r上一定有奇数个字符
//      L和R上的字符非0即1，不能是逻辑符号
function info(str, L, R, dp) {
    if(dp[L][R] != null) {
        return dp[L][R];
    }
    let t = 0;
    let f = 0;
    if(L === R) {
        let t = str[L] == 1 ? 1 : 0;
        let f = str[L] == 0 ? 1 : 0;
        return new Info(t,f);
    }else{  // L到R>=3
        // 每一个逻辑符号，split枚举的东西
        // 都去试试最后结合
        for(let split = L+1; split < R; split+=2) {
            let leftInfo = info(str,L, split - 1, dp);
            let rightInfo = info(str, split + 1, R, dp);
            let a = leftInfo.t;
            let b = leftInfo.f;
            let c = rightInfo.t;
            let d = rightInfo.f;
            // 根据逻辑符号的不同做定制
            switch (str[split]) {
                case '&':
                    t += a*c;
                    f += b*c+b*d+a*d;
                    break;
                case '|':
                    t += a*c+a*d+b*c;
                    f += b*d;
                    break;
                default:
                    t += a*d+b*c;
                    f += a*c+b*d;
                    break;
            }
        }
    }
    dp[L][R] = new Info(t,f);
    return dp[L][R];
}

function countEval(express, desired) {
    if(express === null || express === '') {
        return 0;
    }
    let N = express.length;
    let dp = [];
    for(let i = 0; i < N; i++) {
        dp[i] = [];
    }
    let allInfo = info(express, 0, express.length-1, dp);
    return desired === 1 ? allInfo.t : allInfo.f;
}

let s = "1^0|0|1";
console.log(countEval(s, 0));
