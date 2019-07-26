<template>
    <div class="citylist-item">
        <p class="city-item" v-for="city in searchListContent" :key="city.id" @click="changeCity(city.name)">{{city.name}}</p>
    </div>
</template>
<script>
export default {
    props:{
        searchListContent:{
            type:Array
        }
    },
    methods:{
        changeCity(name){
            this.$emit('changeName',name);
        }
    }
}
</script>
<style lang="less" scoped>
    .citylist-item{
        width:100%;
        background-color: #fff;
        .city-item{
            background-color: #fff;
            margin:0 10px;
            height:35px;
            line-height:35px;
            border-bottom:1px solid #ccc;
            box-sizing: border-box;
            &:last-child{
                border:none;
            }
        }
    }
</style>
