function maxGap(nums) {
    if(nums.length < 2) {
        return
    }
    let len = nums.length;
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    for(let i = 0; i < len; i++){
        min = Math.min(min, nums[i]);
        max = Math.max(max, nums[i]);
    }
    if(min === max) {
        return 0;
    }
    let hasNum = [];
    let maxs = [];
    let mins = [];
    let bid = 0;
    for(let i = 0; i < len; i++) {
        bid = bucket(nums[i], len, min, max);
        mins[bid] = hasNum[bid] ? Math.min(mins[bid], nums[i]):nums[i];
        maxs[bid] = hasNum[bid] ? Math.max(maxs[bid], nums[i]) : nums[i];
        hasNum[bid] = true;
    }
    let res = 0;
    let lastMax = maxs[0];
    let i = 1;
    for(; i <= len; i++) {
        if(hasNum[i]) {
            res = Math.max(res, mins[i] - lastMax);
            lastMax = maxs[i];
        }
    }
    return res;
}
function bucket(num, len, min, max) {
    return ((num - min) * len / (max - min));
}
let arr = [2,3,4,5,8,9,1];
let max = maxGap(arr);
console.log(max);
