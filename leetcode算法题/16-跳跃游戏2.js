function jump(nums) {
    let step = 0;
    let cur = 0;
    let next = 0;
    for(let i = 0; i < nums.length - 1; i++) {
        if(cur < i) {
            step++;
            cur = next;
        }
        next = Math.max(next, i + nums[i]);
    }
    return step;
}
let nums = [2,3,1,1,4];
console.log(jump(nums));
