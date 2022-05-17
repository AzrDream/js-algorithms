let arr = [3,5,7,9,10,1,2,3];
function selectionSort(arr) {
    if(arr.length < 2){
        return
    }
    for(let i = 0; i < arr.length - 1; i++){
        let minIndex = i;
        for(let j = i + 1; j < arr.length; j++){
            minIndex = arr[j] < arr[minIndex] ? j : minIndex;
        }
        swap(arr, i, minIndex);
    }
}
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
selectionSort(arr);
console.log(arr);
