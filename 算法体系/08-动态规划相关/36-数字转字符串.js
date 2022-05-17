// str只含有数字字符0~9
// 返回多少种转化方案
function number(str) {
    return process(str,0);
}
// str[0..i-1]转化无需过问
// str[i.....]去转化，返回有多少种转化方法
function process(str,i) {
    if(i === str.length) {
        return 1;
    }
    // i没到最后，说明有字符
    if(str[i]==='0') {
        return 0;
    }
    // 可能性1，i单转
    let ways = 0;
    ways += process(str,i+1);
    // 可能性2
    if(i+1<str.length && str[i]+str[i+1]<'27') {
        ways += process(str, i+2);
    }
    return ways;
}
// console.log(number('11'));

function dp(str) {
    let N = str.length;
    let dp = [];
    for(let i = 0; i <= N; i++) {
        dp[i] = 0;
    }
    dp[N] = 1;
    for(let i = N-1; i >= 0; i--) {
        if(str[N] !== '0'){
            let ways = dp[i+1];
            // 可能性2
            if(i+1<str.length && str[i]+str[i+1]<'27') {
                ways += dp[i+2];
            }
            dp[i] = ways;
        }
    }
    return dp[0];
}
console.log(dp('111'));
