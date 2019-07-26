<template>
  <div id="app">
        <div class="top">
            <MHeader>{{title}}</MHeader>
            <Search @txtdata="searchText" :clearText="clearSearch" :canSearchSpell="canSearchSpell"></Search>
        </div>
        <div class="content" style="height: calc(100% - 90px);width: 100%;">
            <transition name="list" mode="out-in">
                <SearchList v-if="associationShow" :searchListContent="searchListContent" @changeName="changeCity"></SearchList>
            </transition>
            <Scroll :data="citylist" ref="suggest" :probeType="3" :listenScroll="true" @distance="distance" @scrollStore="scrollStore">
                <div>
                    <div ref="position"></div>
                    <PositionBox @changeCity="changeCity" :needHotCity="needHotCity" :nowcity="nowcity" :hotcity="hotcity" :historyCity="historyCity"></PositionBox>
                    <CityList :choiceCityName="choiceCityName" @positionCity="changeCity" :elementIndex="elementIndex" :allcity="citylist" @singleLetter="singleLetter"></CityList>
                </div>
            </Scroll> 
        </div>
        <NavList :navList="cityIndexList" @toElement="toElement" :flagText="flagText"></NavList>
        <MaskBox :show='maskShow' :message="maskMessage" @changeMaskShow="changeResult"></MaskBox>
        <transition name="flag" mode="out-in">
            <div class="nowFlag" v-if="showFlag">
                {{flagText}}
            </div>
        </transition>
  </div>
</template>

<script>
import Search from './components/Search'
import Scroll from './base/Scroll.vue'
import PositionBox from './components/PositionBox'
import CityList from './components/CityList'
import NavList from './components/NavList'
import MaskBox from './components/MaskBox'
import SearchList from './components/SearchList'
import MHeader from './components/MHeader'
import {allCities ,nowCity,hotCity} from './api/axios.js';
import {getSearchList} from './common/js/search.js';
import { getDistance } from './common/js/dom';
export default {
  name: 'App',
  data(){
      return{
          clearSearch:false,// 是否清除输入框的文字
          canSearchSpell:true,//是否可以使用拼音
          maskShow:false,//弹窗是否弹出
          associationShow: false, // 是否开启联想展示框
          searchListContent: [], // 搜索页的内容数组
          maskMessage: '', // 弹窗展示的信息
          choiceCity: '', // 点击即将查看的城市
          choiceCityName: '', // 选择查看的城市
          citylist:[],//allcity数据
          showFlag: false, // 字母牌是否显示
          flagText: '顶', // 字母牌显示的字
          cityIndexList: ['顶'], // 右边导航栏列表
          historyCityArr: [], // 查看历史记录
          elementIndex: '', // navlist页点击的index
          arrHeight: [], // 高度数组
          needHotCity:true,//是否存在hotCity
          title:"选择城市",//标题
          nowcity:'',
          hotcity:[],
      }
  },
  created () {
    this.getNowCity();
    this.getHotCity();
    this.cityList();
  },
  computed:{
      choseCity(){
          return this.choiceCityName ? this.choiceCityName : this.nowcity;
      },
      historyCity(){
          return this.historyCityArr ? this.historyCityArr : ['北京','上海'];
      }
  },
  components: {
      Search,
      Scroll,
      PositionBox,
      CityList,
      NavList,
      MaskBox,
      SearchList,
      MHeader
  },
  methods: {
       async getNowCity(){
            let {city} = await nowCity();
            this.nowcity = city.substring(0,2);
            this.choiceCity = this.nowcity;
            this.choiceCityName = this.nowcity;
            this.getHistoryCity();
            this.getCity();
            
        },
        async getHotCity(){
            this.hotcity = await hotCity();
        },
      //缓存到本地
        setHistoryCity(arr){
            localStorage.setItem('historyCityArr',arr);
        },
        //获取缓存
        getHistoryCity(){
            let history = localStorage.getItem('historyCityArr');
            if(!history){
                this.historyCityArr = []
            }else{
                // 目前所有的浏览器中都会把localStorage的值类型限定为string类型
                this.historyCityArr = history.split(',');
            }
        },
        // 存到本地,正在查看的城市
        setCity(name){
                localStorage.setItem('seeCity',name);
        },
        // 读取本地,正在查看的城市
        getCity(){
            let name = localStorage.getItem('seeCity');
            if(!name){
                this.choiceCity = '';
                this.choiceCityName = '';
            }else {
                this.choiceCity = name;
                this.choiceCityName = name;
            }
        },
      //接受搜索框输入的内容
      searchText(text){
          if(text.length === 0){
              //当清除内容后，关闭输入框
              this.associationShow = false;
              return false
          }
          this.clearSearch = false;
          this.associationShow = true;
          this.searchListContent = getSearchList(text,this.citylist,this.canSearchSpell);
      },
      // 点击城市名字，弹出弹窗确认
      changeCity(name){
          if(this.choiceCityName === name){
              // 关闭搜索框（在搜索状态下）
              this.associationShow = false;
              //清除搜索框内容（在搜索状态下）
              this.clearSearch = true;
          }
          this.choiceCity = name;
          this.maskMessage = `是否选择该${name}？`;
          this.maskShow = true;
      },
      // 是否确认切换定位
      changeResult(bool){
          
          //如果点击取消，关闭弹窗
          if(!bool){
              this.maskShow = bool;
              this.title = "选择城市";
          }else{
                this.choiceCityName = this.choiceCity;
                this.local();
                this.title = this.choiceCityName;
                // 关闭搜索框（在搜索状态下）
                this.associationShow = false;
                // 清除输入框的字（在搜索状态下）
                this.clearSearch = true;
                // 当确认后滚动到顶部
                this.$refs.suggest.scrollTo(0,0,200);
                //关闭弹窗
                this.maskShow = false;
          }
      },
      //加载缓存//防止出现点两次同样的城市，以及点定位的城市
      local(){
          if(this.choiceCityName !== this.nowcity && this.choiceCityName !== this.historyCityArr[0]){
               this.historyCityArr.unshift(this.choiceCityName);
          }
          this.historyCityArr =this.historyCityArr.slice(0,2);
          this.setCity(this.choiceCityName);
      },
      //获取allcity数据
      async cityList(){
         this.citylist = await allCities();
         this.getCityList();
      },
      //获取城市列表
      getCityList(){
          this.citylist.forEach((item)=>{
              this.cityIndexList.push(item[0]);
          });
          this.getDomHeight();
        //   console.log(this.citylist);
      },
      // 点击右边nav，向citylist组件传值
      toElement(text){
          if(text === '顶'){
              //el,time,offsetX,offsetY,easing
              this.$refs.suggest.scrollToElement(this.$refs.position,200,false,0);
          }
          this.elementIndex = text;
      },
      // 滚动到相应的dom节点
      singleLetter(dom){
          this.$refs.suggest.scrollToElement(dom,200,false,30);//这里的30指的是cityList滚动
      },
      // 根据滑动距离显示字母牌上的字
      distance(dis){
          this.elementIndex = '';
          for(let i = 0 ,len = this.arrHeight.length; i <len; i++){
              if(dis < this.arrHeight[i]){
                  this.flagText = this.cityIndexList[i];
                  return false;
              }
          }
          
      },
      //计算高度
      getDomHeight(){
          let arr = getDistance(this.citylist);
          // 向开始添加顶端的85px的距离,作为当前定位的高度
          const positionBoxHeight = this.needHotCity ? 220 : 85;
          //添加到数组第一位
          arr.unshift(positionBoxHeight);
          /* let i = 0;
          this.arrHeight = arr.map((dis)=>{
              //把每一段距离拼接起来
              i += dis;
              return i ;
          })   */
          let i = 0;
          arr.forEach((dis)=>{
              i += dis;
              this.arrHeight.push(i);
          })
        //   console.log(this.arrHeight);
      },
    //   字母牌是否显示
      scrollStore(val){
          this.showFlag = val ;
      }
  },
  watch: {
      historyCityArr(val){
          this.setHistoryCity(val);
      }
  }
}

</script>

<style lang="less" >
@import './common/less/index.less';
html{
  height: 100%;
  body{
    height: 100%;
    #app{
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing :antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
      background-color:#ccc;
      height: 100%;
      font-size: 12px;
      .content{
          .list-enter{
              opacity: 0;
          }
          .list-enter-active,.list-leave-active{
              transition :all 0.5s;
          }
          .list-leave-to{
              transform :scale(0, 0);
              opacity: 0;
          }
      }
      .nowFlag{
        width :50px;
        height: 50px;
        background: #4395ff;
        color :#fff;
        font-size: 30px;
        font-weight: 900;
        line-height: 50px;
        text-align :center;
        position :absolute;
        top :60px;
        left: 50%;
        margin-left: -25px;
      }
      .flag-leave-active{
          transition :all 1s;
      }
      .flag-leave-to{
          opacity: 0;
      }
    }   
  }    
}

</style>
