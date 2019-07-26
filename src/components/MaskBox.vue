<template>
    <div class="mask-box" v-if="show">
        <div class="mask-body"></div>
        <div class="btn-box">
            <div class="message">
                <p>{{message}}</p>
            </div>
            <div class="btn">
                <p class="left-btn" @click="changeMaskTrue">确定</p>
                <p class="right-btn" @click="changeMaskFalse">取消</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        show:{
            type:Boolean
        },
        message:{
            type:String
        }
    },
    methods: {
        changeMaskTrue(){
            this.$emit('changeMaskShow',true);
        },
        changeMaskFalse(){
            this.$emit('changeMaskShow',false);
        }
    }
}
</script>
<style lang="less" scoped>
    .mask-box{
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
        .mask-body{
            width:100%;
            height:100%;
            position:absolute;
            top:0;
            left:0;
            background-color: #000;
            opacity: 0.2;
            z-index: 200;
        }
        .btn-box{
            width:300px;
            height:155px;
            position:absolute;
            top:0;
            left:0;
            bottom:0;
            right:0;
            margin:auto;
            background-color: #fff;
            z-index: 300;
            border-radius:8px;
            .message{
                width:100%;
                height:108px;
                border-radius:8px 8px 0 0;
                line-height:22px;
                text-align:center;
                border-bottom:2px solid #666;
                display:flex;
                flex-direction :column;
                justify-content: space-around;
                align-items :center;
                p{
                    font-size: 22px;
                    font-weight: 900;
                }
            }
            .btn{
                width:100%;
                height:45px;
                display: flex;
                border-radius:0 0 8px 8px;
                text-align:center;
                .left-btn{
                    display:flex;
                    flex:1;
                    border-right:1px solid #666;
                    font-size: 16px;
                    font-weight: 900;
                    justify-content: center;
                    align-items: center;
                }
                .right-btn{
                    display:flex;
                    flex:1;
                    border-left:1px solid #666;
                    font-size: 16px;
                    font-weight: 900;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
</style>
