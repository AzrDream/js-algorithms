function getIndexOf(s, m) { // s是最长的字符串,m是要匹配的字符串
    if(s === null || m === null || m.length < 1 || s.length < m.length){
        return -1;
    }
    let i1 = 0;
    let i2 = 0;
    let next = getNextArray(m);
    while(i1 < s.length && i2 < m.length) {
        if(s[i1] === m[i2]) {
            i1++;
            i2++;
        }else if(next[i2] === -1) {
            i1++;
        }else {
            i2 = next[i2];
        }
    }
    return i2 === m.length ? i1 - i2 : -1;
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
let str = "abcabcababaccc";
let match = "ababa";
console.log(getIndexOf(str, match));
