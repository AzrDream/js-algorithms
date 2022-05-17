function minStickers1(stickers, target) {
    let ans = process1(stickers, target);
    return ans === Number.MAX_VALUE ? -1 : ans;
}
// 所有贴纸stickers，每一种贴纸都有无穷张
// target
// 最少张数
function process1(stickers, target) {
    if (target.length === 0) {
        return 0;
    }
    let min = Number.MAX_VALUE;
    for (let first of stickers) {
        let rest = minus(target, first);
        if (rest.length !== target.length) {
            min = Math.min(min, process1(stickers, rest));
        }
    }
    return min + (min === Number.MAX_VALUE ? 0 : 1);
}
function minus(s1, s2) {
    let s3 = s1.split('');
    for (let char of s2) {
        let index = s3.indexOf(char);
        if(index !== -1) {
            s3.splice(index, 1);
        }
    }
    return s3.join('');
}

let stickers = ["with", "example", "science"];
let target = "thehat";
// console.log(minStickers1(stickers, target));


function conArr(arr, row, col) {
    if(col) {
        for(let i = 0; i < row; i++) {
            arr[i] = [];
            for(let j = 0; j < col; j++){
                arr[i][j] = 0;
            }
        }
    }else{
        for(let i = 0; i < row; i++) {
            arr[i] = 0;
        }
    }
}
function minStickers2(stickers, target) {
    let N = stickers.length;
    let counts = [];
    conArr(counts,N,26);
    for(let i = 0; i < N; i++) {
        let str = stickers[i];
        for(let char of str) {
            let num = char.charCodeAt(0)-97;
            counts[i][num]++;
        }
    }
    let ans = process2(counts, target);
    return ans === Number.MAX_VALUE ? -1 : ans;
}
// stickers[i] 数组，当初i号贴纸的字符统计 int[][] stickers -> 所有的贴纸
// 每一种贴纸都有无穷张
// 返回搞定target的最少张数
// 最少张数
function process2(stickers, target) {
    if(target.length===0){
        return 0;
    }
    // target做出词频统计
    // target  aabbc  2 2 1..
    //                0 1 2..
    let tcounts = [];
    conArr(tcounts,26);
    for (let char of target) {
        let num = char.charCodeAt(0)-97;
        tcounts[num]++;
    }
    let N = stickers.length;
    let min = Number.MAX_VALUE;
    for(let i = 0; i < N; i++) {
        // 尝试第一张贴纸是谁
        let sticker = stickers[i];
        // 最关键的优化（最重要的剪枝，这一步也是贪心）
        if (sticker[target[0].charCodeAt(0)-97] > 0) {
            let builder = '';
            for(let j = 0; j < 26; j++) {
                if(tcounts[j] > 0) {
                    let nums = tcounts[j]-sticker[j];
                    for (let k = 0; k < nums; k++) {
                        builder+=String.fromCharCode(j+97);
                    }
                }
            }
            min = Math.min(min, process2(stickers, builder));
        }
    }
    return min + (min === Number.MAX_VALUE ? 0 : 1);
}
// console.log(minStickers2(stickers, target));

function minStickers3(stickers, target) {
    let N = stickers.length;
    let counts = [];
    conArr(counts,N,26);
    for(let i = 0; i < N; i++) {
        let str = stickers[i];
        for(let char of str) {
            let num = char.charCodeAt(0)-97;
            counts[i][num]++;
        }
    }
    let dp = [];
    let ans = process2(counts, target);
    return ans === Number.MAX_VALUE ? -1 : ans;
}
