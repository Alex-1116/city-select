<template>
    <div class="lists">
        <div v-for="allCity in allCities" :key="allCity[0]" >
            <p class="city-title" :ref="allCity[0]">{{allCity[0]}}</p>
            <p :class="{'city-item':true,'vue-1px-t':index}" v-for="(city,index) in allCity[1]" :key="city.id" @click="changeCity(city.name)">
                {{city.name}}
                <i :class="iconCss(city)" ></i>
                </p>   
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            allCities:[],
        }
    },
    props:{
        allcity:{
            type:Array
        },
        elementIndex:{
            type:String
        },
        choiceCityName:{
            type:String
        }
    },
    methods:{
        changeCity(name){
            this.$emit('positionCity',name);
        },
        iconCss(city){
            if(this.choiceCityName === city.name){
                return 'iconfont icon icon-zhengque'
            }else{
                return 'iconfont2 icon icon-zhengque'
            }
        }
    },
    watch:{
        elementIndex(curVal){
            if(!curVal)return;
            if(curVal === '顶')return;
            this.$emit('singleLetter',this.$refs[curVal][0])
            // console.log(this.$refs[curVal][0]);
        },
        allcity(curVal){
            if(!curVal)return;
            this.allCities = curVal;
        },
        
    }
}
</script>
<style lang="less" scoped>
@import '../common/less/1px.css';
    .lists{
        width: 100%;
        div{
            font-size: 16px;
            .city-title{
                height:30px;
                line-height: 30px;
                color:#010;
                box-sizing: border-box;
                padding-left:5px;
            }
            .city-item{
                height:35px;
                line-height: 35px;
                color:#000;
                font-weight: 700;
                box-sizing: border-box;
                background-color: #fff;
                padding-left:10px;
                .iconfont{
                    position:absolute;
                    right: 0;
                    margin-right:40px;
                    text-align: right;
                    width:10%;
                    color:#119dfc;
                    font-size:25px;
                    height:35px;
                    line-height: 35px;
                }
                .iconfont2{
                    position:absolute;
                    right: 0;
                    margin-right:40px;
                    text-align: right;
                    width:10%;
                    color:#119dfc;
                    font-size:25px;
                    height:35px;
                    line-height: 35px;
                    display:none;
                }
            }
           
        }
         
                
    }
</style>
