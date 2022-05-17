function lengthOfLIS(arr) {
    let len = 1, n = arr.length;
    if (n === 0) {
        return 0;
    }
    let d = [0, arr[0]];
    for (let i = 1; i < n; ++i) {
        if (arr[i] > d[len]) {
            d[++len] = arr[i];
        } else {
            let l = 1, r = len, pos = 0; // 如果找不到说明所有的数都比 nums[i] 大，此时要更新 d[1]，所以这里将 pos 设为 0
            while (l <= r) {
                let mid = (l + r) >> 1;
                if (d[mid] < arr[i]) {
                    pos = mid;
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
            d[pos + 1] = arr[i];
        }
    }
    return len;
}
let arr = [10,9,2,5,3,7,101,18];
console.log(lengthOfLIS(arr));
