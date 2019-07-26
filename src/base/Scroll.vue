<template>
    <div class="scroll" ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
    props: {
        /*
        列表的数据
       */
        data: {
            type: Array,
            default: null
        },
        // 是否触发滚动时间
         /*
        1 滚动的时候会派发scroll事件，会截流。
        2 滚动的时候实时派发scroll事件，不会截流。
        3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
        probeType: {
            type: Number,
            default: 1
        },
         /*
        是否派发滚动事件
       */
        listenScroll: {
            type: Boolean,
            default: false
        },
  },
    mounted(){
        this.$nextTick(()=>this._initScroll());
    },
    methods:{
        _initScroll(){
            let scrollDOM = this.$refs.wrapper;
            if(!scrollDOM){
                return;
            }
            
            this.scroll = new BScroll(scrollDOM,{
                probeType: this.probeType,
                scrollY: true, // 滚动方向为Y轴
                click: true, // 是否派发click事件，通常判断浏览器派发的click还是betterscroll派发的click，可以用event._constructed，若是bs派发的则为true
                momentum: true, // 当快速滑动时是否开启滑动惯性
                bounce: false, // 是否启用回弹动画效果
                bounceTime: 700, // 弹力动画持续的毫秒数
                deceleration: 0.001, // 滚动动量减速越大越快，建议不大于0.01
                momentumLimitTime: 300, // 符合惯性拖动的最大时间
                momentumLimitDistance: 15, // 符合惯性拖动的最小拖动距离
                resizePolling: 60 // 重新调整窗口大小时，重新计算better-scroll的时间间隔
            });
             // 是否派发滚动事件
            if (this.listenScroll) {
                // 滚动开始时触发
                this.scroll.on('scrollStart', () => this.$emit('scrollStore', true));
                // pos为位置参数
                this.scroll.on('scroll', (pos) => {
                this.$emit('distance', Math.abs(pos.y));
                this.$emit('scrollStore', true);
                });
                // 滚动结束
                this.scroll.on('scrollEnd', () => this.$emit('scrollStore', false));
            }
        },
        scrollTo() {
            // 代理better-scroll的scrollTo方法 // 滚向位置
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            // 代理better-scroll的scrollToElement方法 // 滚向元素
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        },
         refresh() {
        // 代理better-scroll的refresh方法 // 确保绑定成功
        this.scroll && this.scroll.refresh()
    
        },

    },
   
    watch:{
        // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
        data() {
           this.$nextTick(() => this.refresh());
        }
    },
    components:{
        BScroll
    }
}
</script>
<style lang="less" scoped>
    .scroll{
        width:100%;
        height:100%;
        background-color:#eee;
        overflow: hidden;//使用better-scroll必填
    }
</style>
