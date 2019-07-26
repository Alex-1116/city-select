<template>
    <div class="list-body">
        <Scroll :data="searchListContent">
            <div>
                <CityItem :searchListContent="searchListContent" @changeName="changeCity"></CityItem>
            </div>
        </Scroll>
    </div>
</template>
<script>
import Scroll from '../base/Scroll';
import CityItem from '../base/CityItem';
export default {
    props:{
        searchListContent:{
            type:Array
        }
    },
    methods: {
      changeCity(name){
          this.$emit('changeName',name);
      }  
    },
    components: {
        Scroll,
        CityItem
    }
}
</script>
<style lang="less" scoped>
    .list-body{
        width :100%;
        height: calc(100% - 90px) ;//不知到为什么没有继承.content的height，而继承的是手机屏幕的高度 这里要去掉表头的高度原来是100%
        background :#f5f5f5;
        position :absolute;
        z-index :100;
    }
        
</style>
