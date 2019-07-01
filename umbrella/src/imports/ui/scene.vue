<template>
    <div class="scene_bg">
        <transition  name="fade">
            <div class="home" :style="{backgroundImage:'url('+senceImgs+')'}" v-cloak v-show="showScene">
                <rainDraw v-show="!showSun"></rainDraw>     
                <img src="/sun/sunlight.gif" alt="" class="sun" v-show="showSun">
                <div class="change_scence">
                    <img src="/title.png" alt="" width="300">
                    <button class="wather_now" @click="watherNow" :class="{toggleWimg:toggleClick}" ></button>
                    <img src="/momiweater.png" alt="" width="120">
                    <button class="sun_btn" @click="sunBtn" :class="{toggleSimg:toggleClickSun}" :disabled="sunBtndis"></button>
                    <button class="rain_btn" @click="rainBtn" :class="{toggleRimg:toggleClickRain}" :disabled="rainBtndis"></button>
                </div>
                <img src="/chair.png" alt="" class="chair">

                <!-- 人物行走 -->
                <img src="/standperson.png" class="sit" v-show="personShow" style="z-index:2;" >
                <img  :src="personMove[0].personimg" class="sit"  id="person" v-if="!personShow" v-show="personHide">  

                <img  :src="personMove[3].personimg" class="sit"  id="person" v-if="!personHide">  
                <!-- 人物行走 -->

                <img src="/cbroad.png" alt="" class="cbroad">
                <img src="/rain/borderLight.gif" class="border-light" v-if="showBorderL"/>
                <img src="/rain/qipao.gif" class="qipao" v-show="showQipao"/>
                <div :class="[{green_cricle_mv:greenLight},'green_cricle']"></div>
                <div :class="[{red_cricle_mv:redLight},'red_cricle']"></div>

                <img src="/umbrella.png" alt="" class="umbrella" v-if="sunUmbrella">
                <img src="/umbrella.png" alt="" class="umbrella" v-else v-show="showUmbrella" 
                        style="cursor:pointer;z-index:3;" @click="takebrella">
                <img src="/rain/yusanbian.gif" class="yusan" v-if="yusanLine">

                <img src="/door.png"  class="door" v-show="doorChange">
                <img v-for="(item,index) in doors"  :key="index" :src="item.doorsOC" :class="[{open_door:openDoor==index},'door_move']" v-show="!doorChange && doorsIndex==index" id="Doors">

                <!-- Pre load big images -->
                <img v-show="false" :src="personMove[0].personimg" @load="bigImageLoaded(0)">
                <img v-show="false" :src="personMove[2].personimg" @load="bigImageLoaded(2)">
                <img v-show="false" :src="personMove[1].personimg" @load="bigImageLoaded(1)">
            </div>
        </transition>      
        <LoadBox v-show="loadClose"></LoadBox> 
    </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadBox from './load.vue'
import rainDraw from './rain.vue'
export default {
    name:'scene',
    components:{
        LoadBox,rainDraw
    },
    data(){
        return{
            senceImgs:'sunshine.jpg',
            showSun:true, //太阳默认出来
            toggleClick:false,
            toggleClickSun:false,
            toggleClickRain:false,
            greenLight:false,   
            redLight:false, 
            showBorderL:false,
            yusanLine:false,
            showQipao:false,
            showUmbrella:false,
            personShow: false,
            sunBtndis:false,
            rainBtndis:false,
            sunUmbrella:true,
            showScene:false,
            loadClose:true,

            personHide:true,

            openDoor:0,
            personMove:[{personimg:'/sun/sit.gif'},
                        {personimg:'/sun/sun_goout.gif'},
                        {personimg:'/rain/rain_stand.gif'},
                        {personimg:'/rain/takebrallego.gif'}],
            doors:[{doorsOC:'/sun/openDoor.gif'},
                {doorsOC:'/sun/closeDoor.gif',}],
            doorsIndex:-1,
            doorChange:true,
            timerSun:{
                sun1:null,
                sun2:null,
                sun3:null,
                sun4:null,
                sun5:null,
            },
            timerRain:{
                rain1:null,
                rain2:null,
                rain3:null,
                rain4:null,
                rain5:null,
                rain6:null,
                rain7:null,
                rain8:null,
                rain9:null,
            },

            loadBigImagesDone: [false, false, false],
        }
    },
    mounted(){
        clearTimeout(this.timerSun.sun1);
        clearTimeout(this.timerSun.sun2);
        clearTimeout(this.timerSun.sun4);
        clearTimeout(this.timerRain.rain1);
        clearTimeout(this.timerRain.rain2);
        clearTimeout(this.timerRain.rain3);
        clearTimeout(this.timerRain.rain4);
        clearTimeout(this.timerRain.rain5);
        clearTimeout(this.timerRain.rain6);
        clearTimeout(this.timerRain.rain7);
        clearTimeout(this.timerRain.rain8);
        clearTimeout(this.timerRain.rain9);
        // setTimeout(()=>{
        //     this.loadClose = false;
        //     this.showScene = true;
        // },3000);
    },
    computed: {
        ...mapGetters('layout', {showCartState: 'showCart'})
    },
    methods:{
        ...mapActions('layout', [
            'showCart'
        ]),
        bigImageLoaded(index) {
            this.loadBigImagesDone[index] = true;

            if(!this.loadBigImagesDone.some(v => v == false)) {
                this.loadClose = false;
                this.showScene = true;
            }
        },
        //选择实时天气
        watherNow(){
            //this.toggleClick = !this.toggleClick;
            if(this.showCartState) {
                this.showCart(false)
            }
            else {
                this.showCart(true)
            }
        },
        sunBtn(){
            clearTimeout(this.timerRain.rain1);
            clearTimeout(this.timerRain.rain2);
            clearTimeout(this.timerRain.rain3);
            clearTimeout(this.timerRain.rain4);
            clearTimeout(this.timerRain.rain5);
            clearTimeout(this.timerRain.rain6);
            clearTimeout(this.timerRain.rain7);
            clearTimeout(this.timerRain.rain8);
            clearTimeout(this.timerRain.rain9);

            this.personHide = true //显示人物

            this.yusanLine = false;
            this.showQipao = false;
            this.showBorderL = false;

            this.doorChange = false; //   默认门是关着的
            this.showUmbrella = false;

            this.toggleClickSun = true
            this.toggleClickRain = false;
            this.sunBtndis = true;
            this.rainBtndis = false
            this.sunUmbrella = true;
            this.personShow = false;

            this.showSun = true;
            this.senceImgs = 'sunshine.jpg'; //太阳出来晴天
            
            setTimeout(()=>{
                document.getElementById('person').src = '/sun/sun_goout.gif';
            },500)
           
            // 门开关 定时
            this.timerSun.sun1 = setTimeout(()=>{
                this.doorChange = false;
            },4000);

            //晴天灯亮
            this.timerSun.sun2 =  setTimeout(()=>{
                this.greenLight = true
            },3000)

            this.timerSun.sun3 = setTimeout(()=>{
                this.greenLight = false;
            },5000)
           

            //门关闭
            this.timerSun.sun4 = setTimeout(()=>{
                this.doorsIndex = 1;
            },5500)

            this.doorChange = true;
            this.doorsIndex = 0;
        },
        rainBtn(){
            clearTimeout(this.timerSun.sun1);
            clearTimeout(this.timerSun.sun2);
            clearTimeout(this.timerSun.sun4);
            clearTimeout(this.timerSun.sun5);
            
            this.toggleClickRain = true;
            this.toggleClickSun = false;
            this.rainBtndis = true;
            this.sunBtndis = false;
            this.sunUmbrella = false;
            this.showUmbrella = true;

            this.showSun = false;
            this.senceImgs = '/rain/rain.jpg'; //下雨天

            this.doorChange = true;
           
            document.getElementById('person').src = '/sun/sit.gif';
            //人移动
            this.timerRain.rain1 = setTimeout(()=>{
                document.getElementById('person').src =  '/rain/rain_stand.gif' //人出门
            },500)

            //人站立
            this.timerRain.rain2 = setTimeout(()=>{
                this.personShow = true;
                this.doorChange = false;
                this.doorsIndex = 0;
            },4700)
            
            //  栗子板边框
            this.timerRain.rain3 = setTimeout(()=>{
                this.showBorderL = true
            },1900)

            //雨伞气泡
           this.timerRain.rain4 =  setTimeout(()=>{
                this.yusanLine = true;
                this.showQipao = true;
            },3800)

            //红色指示灯
            this.timerRain.rain5 = setTimeout(()=>{
                this.redLight = true
            },4780)
            this.timerRain.rain6 = setTimeout(()=>{
                this.redLight = false
            },6500)

        },
        takebrella(){
            //人拿伞出门
            this.timerRain.rain7 = setTimeout(()=>{
                this.personShow = false;
                this.showUmbrella = false;
                this.showQipao = false;
            },300)

            this.timerRain.rain9 = setTimeout(()=>{
                this.personShow = false;                
                this.personHide = false; // 拿伞走人           
            },300)

            this.timerRain.rain8 = setTimeout(()=>{
               this.doorsIndex = 1;
               this.yusanLine = false;
            },2000)
        }
    },
    distroyed: function () {
        clearTimeout(this.timerSun.sun1);
        clearTimeout(this.timerSun.sun2);
        clearTimeout(this.timerSun.sun4);
        clearTimeout(this.timerRain.rain1);
        clearTimeout(this.timerRain.rain2);
        clearTimeout(this.timerRain.rain3);
        clearTimeout(this.timerRain.rain4);
        clearTimeout(this.timerRain.rain5);
        clearTimeout(this.timerRain.rain6);
        clearTimeout(this.timerRain.rain7);
        clearTimeout(this.timerRain.rain8);
        clearTimeout(this.timerRain.rain9);
    }
}
</script>

<style scoped>
[v-cloak]{
    display: none;
}
.scene_bg{
    background-image: url('/scenebg.jpg');
    background-size: cover;
    height: 900px;
    width: 100%;
}
button{
    background-color: transparent;
    position: absolute;
    padding: 0;
    z-index: 9;
    outline: none;
}
.home{
    /* 切换场景 */
    width: 1200px;
    height: 850px;
    background-image: url('/sunshine.jpg'); 
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
    margin:  0 auto;
}
.change_scence{
    /* 房间背景 */
    width: 100%;
    height: 900px;
    background-image: url('/house.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    top:0;
    left: 0;
}
.change_scence img:nth-child(1) {
    display: block;
    margin: 30px auto;
}
.change_scence img:nth-child(3){
    position: absolute;
    top:165px;
    left: 470px;
    width: 108px;
}
.change_scence .wather_now{
    width: 132px;
    height: 54px;
    background-image: url('/w_normal_guide.png');
    background-size: cover;
    background-repeat: no-repeat;
    top: 90px;
    left: 440px;
    z-index: 5;
}
.wather_now:hover{
    height: 63px;
    background-image: url('/w_hover_guide.png');
}
.change_scence .sun_btn{
    background-image: url('/sun_normal.png');
    background-size: cover;
    background-repeat: no-repeat;
    width: 96px;
    height: 47px;
    top: 225px;
    left: 460px;
    z-index: 5;
}
.sun_btn:hover{
    background-image: url('/sun_hover.png');
}
.change_scence  .rain_btn{
    background-image: url('/rain_normal.png');
    background-size: cover;
    background-repeat: no-repeat;
    width: 96px;
    height: 47px;
    top: 225px;
    left: 578px;
    z-index: 5;
}
.rain_btn:hover{
    background-image: url('/rain_hover.png');
}
/* 太阳 */ 
.sun{
    width: 100%;
    position: absolute;
    top: -5px;
    left: -10px;
}
.chair{
    position: absolute;
    bottom: 58px;
    left: 36px;
    width: 170px;
}
.sit{
    position: absolute;
    bottom: -14px;
    left: 45px;
    width: 100%;
    z-index: 4;
}
.person_stand{
    position: absolute;
    bottom: 21px;
    left: 142px;
    width: 165px;
}
.cbroad{
    width: 71px;
    position: absolute;
    top:320px;
    right: 186px;
}
.border-light{
    position: absolute;
    top:100px;
    right:-20px;
    width: 1300px;
    z-index: 2;
}
.umbrella{
    position: absolute;
    top: 384px;
    right: 185px;
    width: 100px;
    z-index: 3;
}
.yusan{
    width: 1480px;
    position: absolute;
    top:88px;
    right:-54px;
    z-index: 2;
}
.qipao{
    position: absolute;
    top: 127px;
    right: -15px;
    width: 100%;
    z-index: 3;
}
.go_out{
    position: absolute;
    top:0;
    left: 0;
}

.door{
    position: absolute;
    right: -3px;
    top: 114px;
    width: 108px;
}

.door_move{
    width: 1653px;
    position: absolute;
    top: -31px;
    right: 0px;
}
.open_door{
    width: 1600px;
    top: -4px;
    right: -25px;
}
/* 更换图片 */ 

/* 实时天气 */ 
.change_scence .toggleWimg{
    width: 150px;
    height: 50px;
    background-image: url("/w_pitchon_guide.png");
}
/* 晴天按钮 */ 
.change_scence .toggleSimg{
    height: 40px;
    background-image: url("/sun_pitchon.png"); 
}
/* 下雨天按钮 */ 
.change_scence .toggleRimg{
     height: 40px;
    background-image: url("/rain_pitchon.png");
}

.stand_stay{
    position: absolute;
    bottom: 4px;
    left: 1305px;
    width: 165px;
    z-index: 2;
}

/* 圆形指示灯 绿色 */ 
.green_cricle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #6fe51f;
    position: absolute;
    top: 331px;
    right: 226px;
}
/* 指示灯动画 */
@-webkit-keyframes greenlight {
    0%{
       box-shadow:none;
    }
    50%{
        box-shadow: 0px 0px 10px 5px #6fe51f;
    }
    100%{
        box-shadow: none;
    }
}
.green_cricle_mv {
    animation: greenlight 0.5s infinite ease-in-out;
    -webkit-animation: greenlight 0.5s infinite ease-in-out;
}

.red_cricle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ff2d30;
    position: absolute;
    top: 331px;
    right: 211px;
}
@-webkit-keyframes redlight {
    0%{
       box-shadow:none;
    }
    50%{
        box-shadow: 0px 0px 10px 5px #ff2d30;
    }
    100%{
        box-shadow: none;
    }
}
.red_cricle_mv{
    animation: redlight 0.5s infinite ease-in-out;
    -webkit-animation: redlight 0.5s infinite ease-in-out;
}





/******* 加载动画 *******/ 
.loading{
    position: absolute;
    background: rgba(0,0,0,0.6);
    width: 100%;
    height: 100%;
    z-index: 9;
}
.loading p{
    position: absolute;
    top:450px;
    left: 45%;
    color: #eee;
}
@-moz-keyframes timer-loader {
  0% {
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes timer-loader {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes timer-loader {
  0% {
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
/* :not(:required) hides this rule from IE9 and below */
.timer-loader:not(:required) {
  border: 6px solid #c8d;
  -moz-border-radius: 24px;
  -webkit-border-radius: 24px;
  border-radius: 24px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  overflow: hidden;
  position: absolute;
  text-indent: -9999px;
  width: 48px;
  height: 48px;
  top:400px;
  left: 45%;
}
.timer-loader:not(:required)::before {
  -moz-animation: timer-loader 1250ms infinite linear;
  -webkit-animation: timer-loader 1250ms infinite linear;
  animation: timer-loader 1250ms infinite linear;
  -moz-transform-origin: 3px 3px;
  -ms-transform-origin: 3px 3px;
  -webkit-transform-origin: 3px 3px;
  transform-origin: 3px 3px;
  background: #c8d;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  content: '';
  display: block;
  position: absolute;
  width: 6px;
  height: 19.2px;
  left: 15px;
  top: 15px;
}
.timer-loader:not(:required)::after {
  -moz-animation: timer-loader 15000ms infinite linear;
  -webkit-animation: timer-loader 15000ms infinite linear;
  animation: timer-loader 15000ms infinite linear;
  -moz-transform-origin: 3px 3px;
  -ms-transform-origin: 3px 3px;
  -webkit-transform-origin: 3px 3px;
  transform-origin: 3px 3px;
  background: #c8d;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  content: '';
  display: block;
  position: absolute;
  width: 6px;
  height: 16px;
  left: 15px;
  top: 15px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>



