function lengthOfLongestSubstring(str) {
    if(str === null || str.length === 0) {
        return 0;
    }
    let map = [];
    // ascII码的长度是0-255
    map.length = 256;
    for(let i = 0; i < 256; i++) {
        map[i] = -1;
    }
    map[str[0].charCodeAt(0)] = 0;   // 0位置的字符要来到0位置，因为下面是从1开始的
    let N = str.length;
    let ans = 1; // 所有求得字符的长度的最大值
    let pre = 1; // 上一个位置向左推了多长
    for(let i = 1; i < N; i++) {
        pre = Math.min(i - map[str[i].charCodeAt(0)], pre + 1);   // 当前的长度
        ans = Math.max(ans, pre);   // 更新最大值
        map[str[i].charCodeAt(0)] = i;   // 相同字符来到i位置
    }
    return ans;
}
console.log(lengthOfLongestSubstring("abcabcab"));
