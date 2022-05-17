function distinctSubseqII(str) {
    if(!str.length) {
        return 0;
    }
    // 最后结果比较大，需要模一个数字
    let m = 1000000007;
    // s中有26种字符
    let all = 1;    // 算空集
    // 存储每个字符所在的位置的all
    let map = [];
    for(let i = 0; i < 26; i++){
        map[i] = 0;
    }
    for(let i = 0; i < str.length; i++) {
        let newAdd = all;
        let curAll = (all + newAdd)%m;
        curAll = (curAll - map[str.charCodeAt(i)-97]+m) % m;
        all = curAll;
        // 更新x的数量
        map[str.charCodeAt(i)-97] = newAdd;
    }
    return all - 1;
}

console.log(distinctSubseqII("lee"));
