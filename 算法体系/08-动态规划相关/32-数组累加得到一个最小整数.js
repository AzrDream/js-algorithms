function isSum(arr, i, sum, aim) {
    if(i === arr.length) {
        return sum === aim;
    }
    return isSum(arr, i+1, sum, aim)
           ||
           isSum(arr, i+1, sum+arr[i], aim);
}
let arr = [1,4,8];
console.log(isSum(arr, 0, 0, 9));
