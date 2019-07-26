<template>
    <div class="navbody">
        <div class="navlist" @touchstart="start" @touchmove="move">
            <div :data-name="item" v-for="(item,index) in navList" :key="index" :class="navClass(item)" @click.stop.prevent="clickNav(item)">
                {{item}}
            </div>
        </div>
    </div>
</template>
<script>
import {handleDomData, getIndex } from '../common/js/dom';
export default {
    props:{
        navList:{
            type:Array
        },
        flagText:{
            type:String
        }
    },
    data(){
        return{
            touch:{
                start:0,
                startIndex:'',
                endIndex:'',
                end:0
            }
        }
    },
    methods:{
        navClass(item){
            return (this.flagText === item) ? 'flagItem' : 'navItem'
        },
        //向上传递scroll事件
        scrollToElement(item){
            this.$emit('toElement',item);
        },
        //单击右侧导航栏
        clickNav(item){
            this.scrollToElement(item);
        },
        // 触摸开始，并向上触发滚动事件
        start(e){
            let item = handleDomData(e.target,'data-name');
            this.touch.start = e.touches[0].pageY;
            this.touch.startIndex = getIndex(this.navList,item)
        },
        move(e){
            this.touch.end = e.touches[0].pageY;
            let distance = this.touch.end -this.touch.start; 
            //
            this.touch.endIndex = Math.min(Math.max(this.touch.startIndex+Math.floor((distance+10)/20),0),22);
            this.scrollToElement(this.navList[this.touch.endIndex]); 
        }
    },
}
</script>
<style lang="less" scoped>
    .navbody{
        width:20px;
        border-radius:10px;
        height:480px;
        position:absolute;
        top:50%;
        right:0;
        margin-top:-200px;
        z-index:95;
        box-sizing: border-box;
        padding:10px 0px;
        .navItem{
            width:20px;
            height:20px;
            text-align: center;
            line-height: 20px;
            font-size: 14px;
            color:#000;
            user-select: none;
        }
        .flagItem{
            width:20px;
            height:20px;
            text-align: center;
            line-height: 20px;
            font-size: 14px;
            color:#fff;
            border-radius:10px;
            background-color: #4395ff;
            user-select: none;
        }
    }
</style>
