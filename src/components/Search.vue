<template>
    <div class="search-box">
        <div class="input-box">
            
            <input type="search" class="search-input" :placeholder="placeholder" @input="entry()" v-model="searchText">

            <div class="icon-box">
                <i class="iconfont icon icon-sousuo "></i>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'Search',
    props:{
        clearText:{
            type:Boolean
        },
        canSearchSpell:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return{
            searchText:"",
            timer:{}
        }
    },
    computed:{
        placeholder(){
          return this.canSearchSpell ? '城市名称/拼音' : '城市名称';
        }
    },
    methods: {
      
      //延时搜索
      entry(){
          if(this.timer){
              clearTimeout(this.timer);
          }
          this.timer = setTimeout(()=>{
              this.$emit('txtdata',this.searchText);
          },300)
      }  
    },
    watch: {
        //清除搜索内容
        clearText(curVal,oldVal){
            if(curVal){
                this.searchText = "";
                this.entry();
            }
        }
    }
}
</script>
<style lang="less" scoped>
.search-box {
     position:relative;
    // top:45px;
    // left:50%;
    // z-index: 999;
    // transform: translateX(-50%);
    height: 45px;
    width: 100%;
    border-radius:5px;
    background: #aaa;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .input-box {
        width: 95%;
        position: relative;
        height: 30px;
        border-radius: 5px;
        background: #fff;
        padding-top: 6px;
        box-sizing: border-box;
        .search-input {
            display: block;
            width: 100%;
            padding-left: 10%;
            padding-right: 10%;
            border: none;
            outline: none;
            border-radius: 20px;
            box-sizing: border-box;
            font-size: 12px;
            background: #fff;
            line-height: 18px;
            height: 18px;
        }
        input::-webkit-clear {
            display: none;
        }
        .icon-box {
            position: absolute;
            top: 0;
            left: 10%;
            margin-left: -20px;
            z-index: 50;
            width: 16px;
            height: 30px;
            line-height: 30px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .icon {
                font-size: 16px;
                font-weight: 900;
                color: #aaa;
            }
        }
    }
}
 


 
.search-box > .ipt-box > .mask-box {
  position: absolute;
  top: 0;
  right: 15%;
  margin-right: -5px;
  z-index: 50;
  width: 16px;
  height: 30px;
  line-height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #eee;
}
 

</style>
