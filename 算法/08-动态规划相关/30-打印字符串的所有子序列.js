function printAllSub(str, i, res) {
    if(i === str.length) {
        console.log(res);
        return;
    }
    printAllSub(str, i+1, res);
    printAllSub(str, i+1, res+str[i]);
}
let test = "abc";
printAllSub(test, 0, "");
