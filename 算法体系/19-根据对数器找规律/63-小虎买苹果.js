function minBags(apple) {
    if(apple < 0) {
        return -1;
    }
    let bag8 = (apple >> 3);
    let rest = apple - (bag8 << 3);
    while(bag8 >= 0) {
        // rest 个
        if(rest % 6 ===0) {
            return bag8 + (rest / 6);
        } else {
            bag8--;
            rest += 8;
        }
    }
    return -1;
}
function minBags2(apple) {
    if ((apple & 1) !== 0) { // 如果是奇数，返回-1
        return -1;
    }
    if (apple < 18) {
        return apple === 0 ? 0 : (apple === 6 || apple === 8) ? 1
            : (apple === 12 || apple === 14 || apple === 16) ? 2 : -1;
    }
    return (apple - 18) / 8 + 3;
}
let num = 90;
console.log(minBags(num));
console.log(minBags2(num));
