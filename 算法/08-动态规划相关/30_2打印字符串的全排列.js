function permutation(str) {
    let ans = [];
    if(str == null) {
        return ans;
    }
    f(str, '', ans);
    return ans;
}
function f(rest,path, ans) {
    // rest：剩下的字符
    // path：之前做过的决定
    // ans：剩下的字符生成的全排列
    if(!rest.length){
        ans.push(path);
    }else{
        rest = rest.split('');  // 方便后续处理字符串
        for(let i = 0; i < rest.length; i++){
            let cur = rest[i];
            rest.splice(i,1);
            f(rest.join(''),path+cur,ans);
            rest.splice(i,0,cur);
        }
    }
}
// console.log(permutation('abc'));

function permutation2(str) {
    let ans = [];
    if(str == null) {
        return ans;
    }
    g(str.split(''), 0, ans);
    return ans;
}
function g(str, index, ans) {
    if(index === str.length) {
        ans.push(str.join(''));
    }else{
        for(let i = index; i < str.length; i++) {
            swap(str,index,i);
            g(str,index+1, ans);
            swap(str,index,i);
        }
    }
}
// console.log(permutation2('abc'));

function permutation3(str) {
    let ans = [];
    if(str == null) {
        return ans;
    }
    g2(str.split(''), 0, ans);
    return ans;
}
function g2(str, index, ans) {
    if(index === str.length) {
        ans.push(str.join(''));
    }else{
        let visited = [];
        for(let i = index; i < str.length; i++) {
            if(!visited[str[i].charCodeAt()]){
                visited[str[i].charCodeAt()] = true;
                swap(str,index,i);
                g(str,index+1, ans);
                swap(str,index,i);
            }
        }
    }
}
function swap(str,i,j){
    let temp = str[i];
    str[i] = str[j];
    str[j] = temp;
}
console.log(permutation3('acc'));
