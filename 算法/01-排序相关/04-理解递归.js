let arr = [3,5,7,9,10,1,2,3];
function getMax(arr, L, R) {
    if(L === R) {
        return arr[L];
    }
    let mid = (L+R)/2;
    let maxLeft = getMax(arr, L, mid);
    let maxRight = getMax(arr, mid+1, R);
    return Math.max(maxLeft, maxRight);
}
let max = getMax(arr, 0, arr.length-1);
console.log(max);
