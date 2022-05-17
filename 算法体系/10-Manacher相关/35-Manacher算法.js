function manacherString(str) {
    let res = [];
    res.length = str.length * 2 + 1;
    let index = 0;
    for(let i = 0; i !== res.length; i++) {
        res[i] = (i & i) === 0 ? '#' : str[index++];
    }
    return res;
}
function maxLcpsLength(str) {
    if(str === null || str.length === 0) {
        return 0;
    }
    let charArr = manacherString(str);
    let pArr = [];
    pArr.length = charArr.length;
    let C = -1;
    let R = -1;
    let max = Number.MIN_VALUE;
    for(let i = 0; i !== charArr.length; i++) {
        // 区分第一种和其他的情况
        pArr[i] = R > i ? Math.min(pArr[2*C-i], R - 1):1;
        // 往外扩，如果是情况二和情况三，扩一下是会失败的，可以直接出结论
        while(i + pArr[i] < charArr.length && i - pArr[i] > - 1) {
            // 扩出来的两个部分相等，回文半径++
            if (charArr[i + pArr[i]] === charArr[i - pArr[i]]) {
                pArr[i]++;
            }else {
                break;
            }
        }
        if(i + pArr[i] > R) {
            R = i + pArr[i];
            C = i;
        }
        max = Math.max(max, pArr[i]);
    }
    return max - 1;
}
let str = "abc1234321ab";
console.log(maxLcpsLength(str));
