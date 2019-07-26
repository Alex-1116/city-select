<template>
    <div class="position-box">
        <div class="history">
            <p>定位/最近访问</p>
            <div class="citybox">
                <button @click="changeCity(nowCity)">
                    <i class="iconfont icon icon-dingwei">
                        <a>{{nowCity}}</a>
                    </i>
                </button>
                <button v-for="(history,index) in historyCity" :key="index">{{history}}</button>
            </div>
        </div>
        <div class="hot" v-if="needHotCity">
            <p>热门城市</p>
            <div class="citybox">
                <button v-for="(hotCity,index) in hotCities" :key="index" @click="changeCity(hotCity.name)">
                    <a>{{hotCity.name}}</a>
                </button>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            nowCity:"北京",//默认是北京
            hotCities:[],
            historyCities:[]
        }
    },
    props:{
        needHotCity:{
            type:Boolean
        },
        nowcity:{
            type:String
        },
        hotcity:{
            type:Array
        },
        historyCity:{
            type:Array
        }
    },
   
    methods:{
       
        changeCity(name){
            this.$emit('changeCity',name);
        }
    },
    watch: {
        nowcity(val){
            this.nowCity = val;
        },
        hotcity(val){
            this.hotCities = val;
        },
        historyCity(val){
            this.historyCities = val;
        }
    }
}
</script>
<style lang="less" scoped>
    .position-box{
        width:100%;
        background-color: #eee;
        padding-bottom: 10px;
        .history{
            width:100%;
            background-color: #fff;
            padding: 5px 10px 0px 10px;
            box-sizing: border-box;
            
            p{
                font-size: 18px;
                font-weight: 700;
                line-height: 30px;
            }
            .citybox{
                height:40px;
                box-sizing: border-box;
                button{
                    box-sizing :border-box;
                    border-radius: 4px;
                    outline: none;
                    width :23%;
                    height: 30px;
                    margin: 5px 5%;
                    background: #fdfdfd;
                    // float :left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space :nowrap;
                    font-size :14px;
                    border :1px solid #aaa;
                    text-align: center;
                    .icon{
                        font-size :14px;
                        color :#119dfc;
                        margin:0px auto;
                    }
                }
            }
        }
        .hot{
            width:100%;
            background-color: #fff;
            padding: 5px 10px 0px 10px;
            box-sizing: border-box;
            p{
                font-size: 18px;
                font-weight: 700;
                line-height: 30px;
            }
            .citybox{
                height:80px;
                box-sizing:border-box;
                display:flex;
                flex-flow:row wrap;
                justify-content: flex-start;
                button{
                    box-sizing :border-box;
                    border-radius: 4px;
                    outline: none;
                    width :23%;
                    height: 30px;
                    margin: 5px 5%;
                    background: #fdfdfd;
                    float :left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space :nowrap;
                    font-size :14px;
                    border :1px solid #aaa;
                    text-align: center;
                }
            }
        }
   
    
     
    }
</style>
