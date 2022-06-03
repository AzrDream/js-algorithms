function findUnsortedSubarray(nums) {
    if (nums == null || nums.length < 2) {
        return 0;
    }
    let N = nums.length;
    let right = -1;
    let max = Number.MIN_VALUE;
    for (let i = 0; i < N; i++) {
        if (max > nums[i]) {
            right = i;
        }
        max = Math.max(max, nums[i]);
    }
    let min = Number.MAX_VALUE;
    let left = N;
    for (let i = N - 1; i >= 0; i--) {
        if (min < nums[i]) {
            left = i;
        }
        min = Math.min(min, nums[i]);
    }
    return Math.max(0, right - left + 1);
}
let nums = [2,6,4,8,10,9,15];
console.log(findUnsortedSubarray(nums));
