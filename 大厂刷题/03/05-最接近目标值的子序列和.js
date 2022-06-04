function minAbsDifference(nums, goal) {
    let l = [];
    let r = [];
    if (nums == null || nums.length === 0) {
        return goal;
    }
    let le = process(nums, 0, nums.length >> 1, 0, 0, l);
    let re = process(nums, nums.length >> 1, nums.length, 0, 0, r);
    l.sort();
    r.sort();
    /*
    console.log(l);
    console.log(le);
    let l2 = l.splice(0,le);
    l2.sort();
    console.log(l2);
    l = l2 + l.splice(le+1);

    let r2 = r.splice(0,re);
    r2.sort();
    r = r2 + r.splice(re--);
    let ans = Math.abs(goal);
    */
    for (let i = 0; i < le; i++) {
        let rest = goal - l[i];
        while (re > 0 && Math.abs(rest - r[re - 1]) <= Math.abs(rest - r[re])) {
            re--;
        }
        ans = Math.min(ans, Math.abs(rest - r[re]));
    }
    return ans;
}
function process(nums,index,end,sum,fill,arr) {
    if (index === end) {
        arr[fill++] = sum;
    } else {
        fill = process(nums, index + 1, end, sum, fill, arr);
        fill = process(nums, index + 1, end, sum + nums[index], fill, arr);
    }
    return fill;
}
let nums = [7,-9,15,-2], goal = -5;
console.log(minAbsDifference(nums, goal));
