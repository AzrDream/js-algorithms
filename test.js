//给数组对象增加一个方法，用来复制自己
Array.prototype.copyself = function(){
    let arr = new Array();
    for(let i of this){
        arr[i]  = i
    }
    return arr;
};
let p = {
    "id":"007",
    "name":"刘德华",
    "books":new Array("三国演义","红楼梦","水浒传")//这是引用类型
};
function copyObj(obj){
    let newObj={};
    for(let key in obj){
        if(typeof obj[key] =='object'){//如:key是wife,引用类型,那就递归
            newObj[key] = obj[key].copyself();
        }else{//基本类型,直接赋值
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
let pNew = copyObj(p);
pNew.books[0] = "四国";
console.log(pNew);
console.log(p);  
