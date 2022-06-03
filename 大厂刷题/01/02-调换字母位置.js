function minSteps(s) {
    if(s === null || s.length === 0) {
        return 0;
    }
    let step1 = 0;
    let gi = 0;
    for(let i = 0; i < s.length; i++) {
        if(s[i] === 'G') {
            step1 += i - (gi++);
        }
    }
    let step2 = 0;
    let bi = 0;
    for(let i = 0; i < s.length; i++) {
        if(s[i] === 'B') {
            step2 += i - (bi++);
        }
    }
    return Math.min(step1, step2);
}
// 方法二
function minSteps2(s) {
    if(s === null || s.length === 0) {
        return 0;
    }
    let step1 = 0;
    let gi = 0;
    let step2 = 0;
    let bi = 0;
    for(let i = 0; i < s.length; i++) {
        if(s[i] === 'G') {
            step1 += i - (gi++);
        } else {
            step2 += i - (bi++);
        }
    }
    return Math.min(step1, step2);
}

let str = "GBBGGB";
console.log(minSteps(str));
console.log(minSteps2(str));
