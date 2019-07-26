const titleHeight = 30;//与cityList组件的city-title的高度相同
const itemHeight = 35;//与cityList组件的city-item的高度相同

//获取或设置DOM属性
export const handleDomData = (el,name,val)=>val ? el.setAttribute(name, val) : el.getAttribute(name);
//获取每一个字母在数组中对应的index
export const getIndex = (arr,query)=> arr.findIndex(val => val === query);
// 计算连接每一部分的高度 
export const getDistance = (arr)=>{
    // let distanceArr = [];
    let distanceArr = arr
        .filter((item)=> item !== [])
        .map((item)=>{
           return titleHeight + itemHeight * item[1].length;
    })
    return distanceArr;//得到的是cityList组件A，B，c,d...每一项的高度；
}