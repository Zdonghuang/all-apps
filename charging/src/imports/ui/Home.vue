<template>
<div>
  <div class="home clearfloat">
    <!-- 左 -->
    <div>
      <div class="map">
        <div v-for="(item,index) in data" :key='index'>
          <div  :class="(item.state)?'points':'point'" :style="item.position" @click="showLog(index)"></div>
        </div>
         <!-- <img src="../1.gif" alt="" style="position:absolute;top:5px;left:-30px;" v-if="carState==1 || carState==2 || carState==3 || carState==4"> -->
         <img src="../1.gif" alt="" style="position:absolute;top:5px;left:-30px;" v-show="carState==1 || carState==2 || carState==3">
         <img src="../demo.png" alt="" style="position:absolute;top:480px;left:194px;" v-show="carState==4">  
         <img src="../2.gif" alt="" style="position:absolute;top:6px;left:-27px;" v-show="carState==3">
         <img src="../3.gif" alt="" style="position:absolute;top:14px;left:-17px;" v-show="carState==5">
        <!-- 弹框 -->
        <div class="box" v-if="carState==3 || carState==4">
          <div v-if="carState==3">
            <p>电池状态</p>
            <p>当前电量剩余10%</p>
            <p>还能行驶20公里</p>
            <p>已为您搜索附近充电站...</p>
          </div>
          <div v-if="carState==4">
            <p>推荐充电站</p>
            <p>TFL充电站</p>
            <p>目标距离8.8公里</p>
            <p>已为您推荐线路...</p>
          </div>
        </div>
        <!-- 线路 -->
        <div class="line" v-if="carState==4 || carState==5">
          <img src="../green.png" alt="">
        </div>
        <div class="light" v-if="carState==4 || carState==5">
          <img src="../light.png" alt="" @click="showLog(20)">
        </div>
      </div>
    </div>
    <!-- 右 -->
    <div>
      <div class="rest" v-if="carState==0 || carState==1 || carState==2 ||carState==3 ">
        <div class="ele1">
          <p style="font-size:18px;">车辆电量实时</p>
          <p>当前剩余电量<span>{{eleData.ele}}%</span> 预计可行驶<span>{{eleData.km}}</span>公里</p>
        </div>
        <div style="font-size:18px;padding-bottom:15px;">用电排行</div>
        <div class="ele2">
          <div>
            <p>动力</p>
            <p>40%</p>
          </div>
          <div>
            <p>辅助功能</p>
            <p>26%</p>
          </div>
        </div>
        <div class="ele3">
          <div>
            <p>仪表</p>
            <p>14%</p>
          </div>
          <div>
            <p>照明</p>
            <p>12%</p>
          </div>
          <div>
            <p>其他</p>
            <p>8%</p>
          </div>
        </div>
      </div>
      <div class="rest"  v-if="carState==4 || carState==5">
        <div class="rest1">{{showData.name}}充电站</div>
        <div class="rest2">
          <div>
            <img src="../total.png" alt="" class="Rotation img">
            <p>充电桩总数</p>
            <p>{{showData.all}}</p>
          </div>
          <div>
            <img src="../total2.png" alt="" class="Rotation img">
            <p>可用充电桩数</p>
            <p>{{showData.good}}</p>
          </div>
        </div>
        <div class="rest2">
          <div>
            <img src="../total3.png" alt="" class="Rotation img">
            <p>损坏充电桩数</p>
            <p>{{showData.all-showData.good}}</p>
          </div>
          <div>
            <img src="../total4.png" alt="" class="Rotation img">
            <p>已占用充电桩数</p>
            <p>{{showData.isused}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import { Meteor } from 'meteor/meteor'
export default {
  data () {
    return {
      carState:0,
      data:[
        {position:'position:absolute;left:284px;top:12px;',state:false,all:50,good:50,isused:10,isshow:false,name:'QAZ'},
        {position:'position:absolute;left:76px;top:80px;',state:false,all:60,good:55,isused:13,isshow:false,name:'WSX'},
        {position:'position:absolute;left:208px;top:90px;',state:false,all:70,good:60,isused:12,isshow:false,name:'EDC'},
        {position:'position:absolute;left:323px;top:150px;',state:false,all:40,good:35,isused:6,isshow:false,name:'RFV'},
        {position:'position:absolute;left:500px;top:168px;',state:false,all:55,good:45,isused:20,isshow:false,name:'TGB'},
        {position:'position:absolute;left:632px;top:120px;',state:false,all:30,good:15,isused:15,isshow:false,name:'YHN'},
        {position:'position:absolute;left:268px;top:244px;',state:false,all:20,good:13,isused:1,isshow:false,name:'UJM'},
        {position:'position:absolute;left:108px;top:262px;',state:false,all:33,good:12,isused:3,isshow:false,name:'PLM'},
        {position:'position:absolute;left:324px;top:290px;',state:false,all:77,good:65,isused:10,isshow:false,name:'OKN'},
        {position:'position:absolute;left:508px;top:310px;',state:false,all:54,good:45,isused:17,isshow:false,name:'IGN'},
        {position:'position:absolute;left:409px;top:328px;',state:false,all:50,good:35,isused:8,isshow:false,name:'UHB'},
        {position:'position:absolute;left:348px;top:332px;',state:false,all:40,good:39,isused:20,isshow:false,name:'YGV'},
        {position:'position:absolute;left:216px;top:344px;',state:false,all:56,good:50,isused:19,isshow:false,name:'TFC'},
        {position:'position:absolute;left:30px;top:376px;',state:false,all:33,good:22,isused:11,isshow:false,name:'RDX'},
        {position:'position:absolute;left:94px;top:462px;',state:false,all:55,good:50,isused:12,isshow:false,name:'ESZ'},
        {position:'position:absolute;left:232px;top:540px;',state:false,all:53,good:43,isused:13,isshow:false,name:'PJB'},
        {position:'position:absolute;left:320px;top:372px;',state:false,all:30,good:20,isused:14,isshow:false,name:'FRD'},
        {position:'position:absolute;left:416px;top:443px;',state:false,all:40,good:35,isused:15,isshow:false,name:'HYG'},
        {position:'position:absolute;left:528px;top:456px;',state:false,all:55,good:50,isused:16,isshow:false,name:'KUB'},
        {position:'position:absolute;left:642px;top:438px;',state:false,all:75,good:60,isused:17,isshow:false,name:'DEC'},
        {position:'position:absolute;left:451px;top:534px;',state:false,all:20,good:12,isused:7,isshow:false,name:'TFL'},
      ],
      showData:{position:'position:absolute;left:451px;top:534px;',state:false,all:20,good:12,isused:7,isshow:false,name:'TFL'},
      defaultData:[
        {ele:70,km:120},
        {ele:60,km:100},
        {ele:50,km:90},
        {ele:45,km:70},
        {ele:30,km:60},
        {ele:20,km:35},
        {ele:15,km:30},
        {ele:10,km:20},
      ],
      eleData:{ele:80,km:160},
      num:0,
      time1:null,
      time2:null,
      time3:null,
      time4:null,
      time5:null,
      inter:null,
    }
  },
  mounted(){
    // this.getRest();
    // this.$nextTick(function () {
      //dom已更新
      document.getElementById('appLoading').style.display = 'none';
      this.time1=setTimeout(()=>{
        this.carState=1;
      },1000)
      this.inter=setInterval(()=>{
        this.eleData=this.defaultData[this.num];
        (this.num<7)?this.num++:this.num=0;
      },1000)
      this.time2=setTimeout(()=>{
        this.carState=2;
      },6000)
      this.time3=setTimeout(()=>{
        this.carState=3;
        clearInterval(this.inter);
        this.data= this.data.map(function(item, index, arr) {
            item.state = true;
            return item;
        });
      },8000)
      this.time4=setTimeout(()=>{
        this.carState=4;
      },11500)
      this.time5=setTimeout(()=>{
        this.carState=5;
      },15000)
  },
  beforeDestroy(){
    clearTimeout(this.time1);
    clearTimeout(this.time2);
    clearTimeout(this.time3);
    clearTimeout(this.time4);
    clearTimeout(this.time5);
    clearInterval(this.inter);
  },
  watch:{
    'carState':(curVal,oldVal)=>{
　　　},   
  },
  methods: {
    // 显示状态
    showLog(index){
      this.showData=this.data[index];
    },
  },
}
</script>


<style lang="less">
body{
  background-image: url(../bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
.home {
  text-align: center;
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  position: relative;
}
.clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
.clearfloat{zoom:1}
.home>div{
  float: left;
}
.map{
  background-image: url(../map2.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 700px;
  height: 646px;
}
.rest{
  background-image: url(../totals.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 420px;
  height: 520px;
  margin-left: 75px;
  margin-top: 30px;
}
.rest div{
  color: #fff;
}
.rest1{
  padding: 35px 0 43px 0;
  font-size: 24px;
}
.rest2{
  height: 200px;
}
.rest2>div{
  display: inline-block;
  width: 130px;
  height: 130px;
  margin: 34px 35px 38px 35px;
}
.rest2>div>p{
  margin-top: 52px;
  font-size: 32px;
  position: relative;
  top: -220px;
}
.rest2>div>p:nth-child(2){
  top: -230px;
  font-size: 18px;
}
.total{
  background-image: url(../total.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 540px;
  height: 290px;
  color: #09D1C9;
  margin-top: 60px;
}
main{
  background-color: transparent;
  width: 1200px !important;
  padding: 0 !important;
  min-width: 1200px !important;
  margin: 10px auto 0 !important;
  height: 670px;
}
.point{
  width: 6px;
  height: 9px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.points{
  width: 26px;
  height: 35px;
  background-image: url(../car.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 1000;
}
.notice{
  position: absolute;
  right: -157px;
  top: 100px;
  color: #fff;
  width: 160px;
  height: 22px;
  line-height: 22px;
}
.notice>span{
  display: block;
  font-size: 12px;
  width: 160px;
}
.notice>img{
  display: block;
}
.last_notice{
  position: absolute;
  top: 23px;
  left: 34px;
}
h4{
  letter-spacing: 2px;
  font-size: 17px;
}
.top>div{
  display: inline-block;
  margin:0 15px;
}
.top>div>p>img{
  vertical-align: sub;
  margin-right: 15px;
}
.bottom{
  margin-top: 30px;
}
.bottom>div{
  display: inline-block;
  width: 100px;
  height: 100px;
  // background-image: url(../circle.png);
  // background-size: cover;
  // background-repeat: no-repeat;
  margin: -20px 25px;
}
.bottom>div>img{
  margin-left: 20px;
}
.bottom>div>p{
  position: relative;
  top: -100px;
}
.bottom>div>p:nth-child(2){
  margin: 20px 0 5px 0;
}
.bottom>div>p:last-child{
  margin-top: 5px;
}
.pic{
  position: relative;
  left: 0px;
  top: 20px;
}
.logo {
    text-align: center;
    // margin-top: 100px;
}
@-webkit-keyframes rotation {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}

.Rotation {
    -webkit-transform: rotate(360deg);
    animation: rotation 8s linear infinite;
    -moz-animation: rotation 8s linear infinite;
    -webkit-animation: rotation 8s linear infinite;
    -o-animation: rotation 8s linear infinite;
}
.img {
    border-radius: 200px;
}

.ele1{
  padding: 20px 0;
}
.ele1>p>span{
  font-size: 18px;
}
.ele2>div{
  display: inline-block;
  background-image: url(../ele.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100px;
  height: 100px;
  margin:40px 16px;
}
.ele3>div{
  display: inline-block;
  background-image: url(../ele3.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100px;
  height: 100px;
  margin: 30px 14px;
}
.ele3>div>p{
  position: relative;
  top: -12px;
  font-size: 20px;
}
.ele3>div>p:first-child{
  position: relative;
  top: -50px;
  font-size: 16px;
}
.ele2>div>p{
  position: relative;
  top: -12px;
  font-size: 20px;
}
.ele2>div>p:first-child{
  position: relative;
  top: -50px;
  font-size: 16px;
}
.gif{
  position: absolute;
  top: 0;
  left: 0;
}
.box{
  display: inline-block;
  background-image: url(../box.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 228px;
  height: 206px;
  position: absolute;
  top: 282px;
  left: 68px;
  z-index: 1100;
}
.box>div{
  color: #fff;
}
.box>div>p{
  font-size: 15px;
  margin: 2px 0;
}
.box>div>p:first-child{
  margin-top:33px;
}
.line{
  display: inline-block;
  position:absolute;
  top:505px;
  left:219px;
}
.light{
  display: inline-block;
  position:absolute;
  top:540px;
  left:232px;
  z-index: 1100;
}
</style>
