function isMSum1(num) {
    for (let start = 1; start <= num; start++) {
        let sum = start;
        for (let j = start + 1; j <= num; j++) {
            if (sum + j > num) {
                break;
            }
            if (sum + j === num) {
                return true;
            }
            sum += j;
        }
    }
    return false;
}
function isMSum2(num) {
    return (num & (num - 1)) !== 0;
}
