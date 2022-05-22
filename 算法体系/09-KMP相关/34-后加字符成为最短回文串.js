function getMaxStr(str) {
    let str2 = str + " ";
    let next = getNextArray(str2);
    return str + str.substring(next[str2.length - 1]);
}
// next数组
function getNextArray(str) {
    if(str.length === 1) {
        return [-1];
    }
    let next = [-1,0];
    next.length = str.length;
    let i = 2;
    let cn = 0;
    while(i < next.length) {
        if(str[i-1] === str[cn]) {
            next[i++] = ++cn;
        }else if(cn > 0) {
            cn = next[cn];
        }else {
            next[i++] = 0;
        }
    }
    return next;
}
console.log(getMaxStr("abcabc"));
