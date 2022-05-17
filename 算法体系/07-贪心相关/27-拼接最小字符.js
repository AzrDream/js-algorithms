function comparator(a,b) {
    return (a+b)>(b+a)?1:-1;
}
function lowestString(strs) {
    if(strs === null || strs.length === 0) {
        return "";
    }
    strs.sort(comparator);
    let res = "";
    for(let i = 0; i < strs.length; i++) {
        res += strs[i];
    }
    return res;
}
let strs1 = ["jibw", "ji", "jp", "bw", "jibw"];
console.log(lowestString(strs1));
let strs2 = ["ba", "b"];
console.log(lowestString(strs2));
