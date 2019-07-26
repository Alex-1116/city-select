<template>
    <div class="parent-box">
            <span class="back">
                <i class="iconfont icon icon-back">返回</i> 
            </span>
            <slot></slot>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
    .parent-box{
        width :100%;
        height :45px;
        position: relative;
        background :#fff;
        text-align: center;
        line-height: 45px;
        font-size:20px;
        font-weight: 800;
        // z-index: 999;
        .back{
          display :block;
          width :50px;
          text-align: center;
          line-height :45px;
          margin-left :8px;
          position :absolute;
        }
    }
    
</style>
