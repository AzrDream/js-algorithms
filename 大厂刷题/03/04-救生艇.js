function numRescueBoats1(arr, limit) {
    if (arr == null || arr.length === 0) {
        return 0;
    }
    let N = arr.length;
    arr.sort();
    if (arr[N - 1] > limit) {
        return -1;
    }
    let lessR = -1;
    for (let i = N - 1; i >= 0; i--) {
        if (arr[i] <= (limit / 2)) {
            lessR = i;
            break;
        }
    }
    if (lessR === -1) {
        return N;
    }
    let L = lessR;
    let R = lessR + 1;
    let noUsed = 0;
    while (L >= 0) {
        let solved = 0;
        while (R < N && arr[L] + arr[R] <= limit) {
            R++;
            solved++;
        }
        if (solved === 0) {
            noUsed++;
            L--;
        } else {
            L = Math.max(-1, L - solved);
        }
    }
    let all = lessR + 1;
    let used = all - noUsed;
    let moreUnsolved = (N - all) - used;
    return used + (noUsed + 1) >> 1 + moreUnsolved;
}
// 首位双指针的解法
function numRescueBoats2(people, limit) {
    people.sort();
    let ans = 0;
    let l = 0;
    let r = people.length - 1;
    let sum = 0;
    while (l <= r) {
        sum = l === r ? people[l] : people[l] + people[r];
        if (sum > limit) {
            r--;
        } else {
            l++;
            r--;
        }
        ans++;
    }
    return ans;
}
let people = [9304,21894,26964,20519,14164], limit = 29998;
console.log(numRescueBoats1(people, limit));
console.log(numRescueBoats2(people, limit));
