let arr = [3,5,7,9,10,1,2,3];
let num = 5;
function partition(arr, L, R, num) {
    let less = L-1;
    let more = R+1;
    let cur = L;
    while(cur < more) {
        if(arr[cur] < num) {
            swap(arr, ++less, cur++);
        } else if(arr[cur] > num) {
            swap(arr, --more, cur);
        } else {
            cur++;
        }
    }
}
function swap(arr, i , j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
partition(arr, 0, arr.length-1, num);
console.log(arr);
