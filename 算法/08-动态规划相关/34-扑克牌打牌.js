// 根据规则，返回获胜者的分数
function win1(arr) {
    let first = f1(arr,0,arr.length-1);
    let second = g1(arr,0,arr.length-1);
    return Math.max(first,second);
}
// arr[L..R]，先手获得的最好分数返回
function f1(arr, L, R) {
    if(L===R){
        return arr[L];
    }
    let a1 = arr[L] + g1(arr, L+1, R);
    let a2 = arr[R] + g1(arr, L, R-1);
    return Math.max(a1,a2);
}
// arr[L..R]，后手获得的最好分数返回
function g1(arr, L, R) {
    if(L===R){
        return 0;
    }
    let a1 = f1(arr, L+1, R);
    let a2 = f1(arr, L, R-1);
    return Math.min(a1,a2);
}
let arr = [50,100,20,10];
// console.log(win1(arr));

function ConArr(arr, len) {
    for(let i = 0; i < len; i++) {
        arr[i] = [];
        for (let j = 0; j < len; j++) {
            arr[i][j] = 0;
        }
    }
}
function win2(arr) {
    let fmap = [];
    ConArr(fmap, arr.length);
    let gmap = [];
    ConArr(gmap, arr.length);
    let first = f2(arr,0,arr.length-1,fmap,gmap);
    let second = g2(arr,0,arr.length-1,fmap,gmap);
    return Math.max(first,second);
}
// arr[L..R]，先手获得的最好分数返回
function f2(arr, L, R,fmap,gmap) {
    if(fmap[L][R] !== -1) {
        return fmap[L][R];
    }
    let ans = 0;
    if(L===R){
        ans = arr[L];
    }else{
        let a1 = arr[L] + g2(arr, L+1, R, fmap, gmap);
        let a2 = arr[R] + g2(arr, L, R-1, fmap, gmap);
        ans = Math.max(a1,a2);
    }
    fmap[L][R] = ans;
    return ans;
}
// arr[L..R]，后手获得的最好分数返回
function g2(arr, L, R, fmap, gmap) {
    if(gmap[L][R] !== -1){
        return gmap[L][R];
    }
    let ans = 0;
    if(L !== R){
        let a1 = f2(arr, L+1, R, fmap, gmap);
        let a2 = f2(arr, L, R-1, fmap, gmap);
        ans = Math.min(a1,a2);
    }
    gmap[L][R] = ans;
    return ans;
}
// console.log(win2(arr));

function win3(arr) {
    let fmap = [];
    ConArr(fmap, arr.length);
    let gmap = [];
    ConArr(gmap, arr.length);
    for(let i = 0; i < arr.length; i++) {
        fmap[i][i] = arr[i];
    }
    for(let startCol = 1; startCol<arr.length;startCol++){
        let L = 0;
        let R = startCol;
        while (R < arr.length){   // 行不会越界，只有列会越界
            fmap[L][R] = Math.max(arr[L] + gmap[L + 1][R], arr[R] + gmap[L][R - 1]);
            gmap[L][R] = Math.min(fmap[L + 1][R], fmap[L][R - 1]);
            L++;
            R++;
        }
    }
    return Math.max(fmap[0][arr.length - 1], gmap[0][arr.length - 1]);
}
console.log(win3(arr));
