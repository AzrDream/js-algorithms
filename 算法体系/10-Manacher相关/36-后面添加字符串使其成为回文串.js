function shortesEnd(s) {
    if(s === null || s.length === 0) {
        return null;
    }
    let str = manacherString(s);
    let pArr = [];
    for(let i = 0; i < str.length; i++) {
        pArr[i] = 0
    }
    let C = -1;
    let R = -1;
    let maxContainsEnd = -1;
    for (let i = 0; i !== str.length; i++) {
        pArr[i] = R > i ? Math.min(pArr[2 * C - i], R - i) : 1;
        while (i + pArr[i] < str.length && i - pArr[i] > -1) {
            if (str[i + pArr[i]] === str[i - pArr[i]])
                pArr[i]++;
            else {
                break;
            }
        }
        if (i + pArr[i] > R) {
            R = i + pArr[i];
            C = i;
        }
        if (R === str.length) {
            maxContainsEnd = pArr[i];
            break;
        }
    }
    let res = [];
    res.length = s.length - maxContainsEnd + 1;
    for (let i = 0; i < res.length; i++) {
        res[res.length - 1 - i] = str[i * 2 + 1];
    }
    return res.join("");
}
function manacherString(str) {
    let res = [];
    res.length = str.length * 2 + 1;
    let index = 0;
    for(let i = 0; i !== res.length; i++) {
        if(i === index*2+1) {
            res[i] = str[index++];
        }else{
            res[i] = '#'
        }
    }
    return res.join('');
}
let str = "abcd123321";
console.log(shortesEnd(str));
