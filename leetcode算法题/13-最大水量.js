function maxArea(h) {
    let max = 0;
    let l = 0;
    let r = h.length - 1;
    while(l<r){
        max=Math.max(max,Math.min(h[l],h[r])*(r-l));
        if(h[l]>h[r]){
            r--;
        }else{
            l++;
        }
    }
    return max;
}
let arr = [1,8,6,2,5,4,8,3,7];
console.log(maxArea(arr));
