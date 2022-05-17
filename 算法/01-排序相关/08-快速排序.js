let arr = [3,5,7,9,10,1,2,3];
function quickSort(arr) {
    if(arr.length < 2) {
        return
    }
    quickSort1(arr, 0, arr.length - 1);
}
function quickSort1(arr, L, R) {
    if(L < R) {
        // swap(arr, L+Math.floor(Math.random()*(R - L + 1)), R);
        let p = partition(arr, L, R);
        quickSort1(arr, L, p[0] - 1);
        quickSort1(arr, p[1] + 1, R);
    }
}
function partition(arr, L, R) {
    let less = L-1;
    let more = R;
    while(L < more) {
        if(arr[L] < arr[R]) {
            swap(arr, ++less, L++);
        } else if(arr[L] > arr[R]) {
            swap(arr, --more, L);
        } else {
            L++;
        }
    }
    swap(arr, more, R);
    return [less + 1, more];
}
function swap(arr, i , j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

quickSort(arr);
console.log(arr);
