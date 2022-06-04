function type1(arr) {
    let types = new Set();
    for(let str of arr) {
        let map = [];
        for(let i = 0; i < str.length; i++) {
            map[str[i].charCodeAt(0) - 'a'.charCodeAt(0)] = true;
        }
        let key = '';
        for(let i = 0; i < 26; i++) {
            if(map[i]) {
                key += String.fromCharCode(i)
            }
        }
        types.add(key);
    }
    return types.size;
}
function type2(arr) {
    let types = new Set();
    for(let str of arr) {
        let key = 0;
        for(let i = 0; i <str.length; i++) {
            key |= (1 << (str[i].charCodeAt(0) - 'a'.charCodeAt(0)));
        }
        types.add(key);
    }
    return types.size;
}
let arr = ['abcabc','ab','a','abb','abc'];
console.log(type1(arr));
console.log(type2(arr));
