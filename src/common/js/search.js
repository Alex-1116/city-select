//正则表达式
exports.getSearchList = (text,list,canSearchSpell)=>{
    const reg1 = /^[a-z,A-Z]+$/g ;//检测是否为字母
    const reg2 = new RegExp(`^${text}`,'g');//匹配以text为开头
    const reg3 = new RegExp(`^[\u4e00-\u9fa5]+$`,'g'); //检测是不是汉字
    const reg4 = new RegExp(`${text}`,'g');//匹配输入的汉字
    const reg5 = new RegExp(`^${text}`,'g');//匹配以acronym开头
    let resList = [];
    //当text为拼音时
    if(text.match(reg1) && canSearchSpell){
        for(let i=0,len1=list.length;i<len1;i++){
            for(let j=0,len2=list[i][1].length;j<len2;j++){
                if(list[i][1][j].pinyin.match(reg2)){
                    resList.push(list[i][1][j]);
                }//else if(list[i][1][j].acronym.match(reg5)){
                //     resList.push(list[i][1][j]);
                // }
            }
        }//当text为汉字时
    }else if(reg3.test(text)){
        for(let i=0,len1=list.length;i<len1;i++){
            for(let j=0,len2=list[i][1].length;j<len2;j++){
                if(list[i][1][j].name.match(reg4)){
                    resList.push(list[i][1][j]);
                }
            }
        }
    }
    return resList;
}