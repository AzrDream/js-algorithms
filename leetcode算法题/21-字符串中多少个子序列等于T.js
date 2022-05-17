function numDistinct2(s, t) {
    let dp = [];
    for(let i = 0; i < s.length; i++) {
        dp[i] = [];
        for(let j = 0; j < t.length; j++) {
            dp[i][j] = 0;
        }
    }
    dp[0][0] = s[0]==t[0]?1:0;
    for(let i = 1; i < s.length; i++) {
        dp[i][0] = s[i]==t[0]?(dp[i-1][0]+1):dp[i-1][0];
    }
    for(let i = 1; i < s.length; i++) {
        for (let j = 1; j <= Math.min(i, t.length-1); j++) {
            dp[i][j] = dp[i-1][j];
            if(s[i]==t[i]){
                dp[i][j]+=dp[i-1][j-1];
            }
        }
    }
    return dp[s.length-1][t.length-1];
}
function numDistinct3(s,t) {
    let dp = [1];
    for(let j = 1; j<=t.length; j++) {
        dp[j] = 0;
    }
    for(let i = 1; i <= s.length; i++) {
        for(let j = t.length; j >= 1; j--) {
            dp[j] += s[i-1]==t[j-1]?dp[j-1]:0;
        }
    }
    return dp[t.length];
}
let arr=[1,1,2,2];
let s = "12";
console.log(numDistinct2(arr, s));
console.log(numDistinct3(arr, s));
