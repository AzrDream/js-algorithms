function isInterleave(str1, str2, str3) {
    if(str1 === null || str2 === null || str3 === null) {
        return false;
    }
    if(str3.length !== str1.length + str2.length) {
        return false;
    }
    let dp = [];
    for(let i = 0; i <= str1.length; i++) {
        dp[i] = [];
        for(let j = 0; j <= str2.length; j++) {
            dp[i][j] = false;
        }
    }
    dp[0][0] = true;
    for(let i = 1; i <= str1.length; i++) {
        if(str1[i - 1] !== str3[i-1]) {
            break;
        }
        dp[i][0] = true;
    }
    for(let j = 1; j <= str2.length; j++) {
        if(str2[j - 1] !== str3[j-1]) {
            break;
        }
        dp[0][j] = true;
    }
    for(let i = 1; i <= str1.length; i++) {
        for(let j = 1; j <= str2.length; j++) {
            if(
                (str1[i-1]===str3[i+j-1]&&dp[i-1][j])
                || (str2[j-1]===str3[i+j-1]&&dp[i][j-1])
            ){
                dp[i][j] = true;
            }
        }
    }
    return dp[str1.length][str2.length];
}
