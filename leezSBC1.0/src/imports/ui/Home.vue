<template>
  <div class="home">
      <div class="content" 
        @touchstart="touchStart"
        @touchmove.prevent="touchMove"
        @touchend="touchEnd" ref="back">
        <div class="light_box" >
          <div style="margin-top: 2rem;">
            <p>Lighthouse</p>
            <div class="bread">
                <div class="voltage">
                  <span>Voltage</span>
                  <!-- 遮盖 -->
                  <div class="show_slider" v-if="lineLightSwitch"></div>
                  <!-- 遮盖 -->
                    <Slider :min=0 :max=5 v-model="Vval" style="display:inline-block;"
                            @subtract="decreaseLight" @plus="increaseLight"></Slider>
                </div>
                <div class="switch_button">
                  <div class="color_btn">
                    <transition name="fadeWai">
                      <div class="wai_cricle" v-show="clightWAI"></div>
                    </transition> 
                    <transition name="fadeZhong">
                      <div class="zhong_cricle" v-show="clightZHONG"></div>
                    </transition>
                    <transition name="fadeNei">
                      <div class="nei_cricle" v-show="clightNEI"></div>
                    </transition>
                    <div class="switch" @click="switchBtn" v-if="!switchVal"></div>
                    <div class="switch size_switch" @click="switchBtn" style="background-image:url(/on_1.png); background-size: cover;" v-else></div>
                  </div>
                </div>
                <div class="light">
                    <span>Brightness</span>
                    <div class="light_num">
                        <div class="round" v-for="(item,index) in lights" :key="index" :style="item.style" :class="{white:item.openlight}"></div>
                    </div>
                </div>
            </div>
            <div id="myChart" :style="{width: '620px', height: '300px',float:'left',overflow:'hidden',marginTop:'-20px'}"></div>
            <div class="btnboxs">
              <div class="btnall">
                  <div class="btn_1" @click="btnAction">Demonstration</div>
                  <div class="btn_2" @click="btnOver">Stop</div>
                  <div class="hidebtnlight_box1" v-if="!hidebtnlightB1"></div>
                  <!-- <div class="hidebtnlight_box2" ></div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="wind_box">
          <div style="margin-top: 2rem;"> 
            <p>Wind Turbine</p>
           
            <div class="bread">
              <div class="voltage">
                <span>Voltage</span>
                <!-- 遮盖 -->
                <div class="show_slider" v-if="lineWindSwitch"></div>
                <!-- 遮盖 -->
                <Slider :min=0 :max=5 v-model="Wval" style="display:inline-block;"
                @subtract="decreaseWind" @plus="increaseWind"></Slider>
              </div>
              <div class="switch_button">
                <div class="color_btn">
                  <transition name="fadeWai">
                    <div class="wai_cricle" v-show="cwindWAI"></div>
                  </transition>
                  <transition name="fadeZhong">
                    <div class="zhong_cricle" v-show="cwindZHONG"></div>
                  </transition>
                  <transition name="fadeNei">
                    <div class="nei_cricle" v-show="cwindNEI"></div>
                  </transition>
                  <div class="switch" @click="switchWindBtn" v-if="!switchWindVal"></div>
                  <div class="switch size_switch" @click="switchWindBtn" style="background-image:url(/on_1.png); background-size: cover;" v-else></div>
                </div>
              </div>
            </div>
            <div class="windImg_box">
              <div>
                <div id="myChartWind" :style="{width: '220px', height: '220px',float:'left',overflow:'hidden',marginTop:'-18px;',marginLeft:'10px'}"> </div>
                <p style="position:absolute;top: 210px;left: 100px;font-size:24px;" class="ab_size">Rev</p>
              </div>
              <div class="execute">
                  <div></div>
                  <img :src="windWms>=120?'/execute2.png':'/execute.png'" alt="" width="250" style="margin-top: -20px;">
                  <p>Alert</p>
              </div>
            </div>
            <div  class="btnboxs">
              <div class="btnall">
                  <div class="btn_1" @click="btnWindAction" >Demonstration</div>
                  <div class="btn_2" @click="btnWindOver">Stop</div>
                  <div class="hidebtnlight_box1" v-if="!hidebtnwindB1"></div>
                  <!-- <div class="hidebtnlight_box2" ></div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <img id="linear-pic"  src="/linear.png"  width="100" style="display:none;"/>
  </div>
</template>

<script>

//采集点数值
var numbers = 0;
var sums = [];

for(var i=0 ;i<50; i++){
  numbers++;
  sums.push(numbers)
}
//采集点数值


import { Meteor } from 'meteor/meteor'
import { Metrics } from '../api/collections'
import Slider from './slider'
export default {
  data () {
    return {
      switchVal:false,
      switchWindVal:false,
   
      lineLightSwitch:true,
      lineWindSwitch:true,
      hidebtnlightB1:false,
      hidebtnlightB2:false,
      hidebtnwindB1:false,
      hidebtnwindB2:false,
      lm:0,
      lights:[{style:"width:19px;height:19px",openlight:false},
          {style:"width:22px;height:22px",openlight:false},
          {style:"width:25px;height:25px",openlight:false},
          {style:"width:27px;height:27px",openlight:false},
          {style:"width:30px;height:30px",openlight:false}],
        Vval:0,
        Wval:0,
        myChart:null,
        option:{},
        myWindChart:null,
        optionW:{},
        allData:[],
        vData:[],
        windData:[],
        clearTimer:null,
        actionTimer:null,
        actionWindTimer:null,
        lightBUlb:'', //灯亮度调节
        windWms:0,
        dy:0, //电压
        //滑动
        currentPlay:'red',
        percent: 0,
        //光圈
        clightWAI:false,
        clightZHONG:false,
        clightNEI:false,
        //风车
        cwindWAI:false,
        cwindZHONG:false,
        cwindNEI:false
    }
  },
  components:{
    Slider
  },
  beforeDestroy(){
    clearInterval(this.clearTimer)
    clearInterval(this.actionTimer)
    clearInterval(this.actionWindTimer)
  },
  created() {
    this.touch = {}
  },
  mounted(){
    if(localStorage.getItem('lightBtn')=='true'){
      this.switchVal = true
      this.clightWAI = true
      this.clightZHONG = true
      this.clightNEI = true
      this.hidebtnlightB1 = true
      this.hidebtnlightB2 = true
      
    }else{
      this.switchVal = false
      this.clightWAI = false
      this.clightZHONG = false
      this.clightNEI = false
      this.hidebtnlightB1 = false
      this.hidebtnlightB2 = false
    }
    
    if(localStorage.getItem('windBtn')=='true'){
      this.switchWindVal = true
      this.cwindWAI = true
      this.cwindZHONG = true
      this.cwindNEI = true
      this.hidebtnwindB1 = true
      this.hidebtnwindB2 = true
    }else{
      this.switchWindVal = false
      this.cwindWAI = false
      this.cwindZHONG = false
      this.cwindNEI = false
      this.hidebtnwindB1 = false
      this.hidebtnwindB2 = false
    }

    //演示遮罩
    //灯
    if(localStorage.getItem('hidebtnlightB1')=='true'){
      this.hidebtnlightB1 = true
    }else{
      this.hidebtnlightB1 = false
    }

    if(localStorage.getItem('hidebtnlightB2')=='true'){
      this.hidebtnlightB2 = true
    }else{
      this.hidebtnlightB2 = false
    }

    //风
    if(localStorage.getItem('hidebtnwindB1')=='true'){
      this.hidebtnwindB1 = true
    }else{
      this.hidebtnwindB1 = false
    }

    if(localStorage.getItem('hidebtnwindB2')=='true'){
      this.hidebtnwindB2 = true
    }else{
      this.hidebtnwindB2 = false
    }
    

    this.lineLightSwitch = !this.switchVal
    this.lineWindSwitch = !this.switchWindVal


    this.clearTimer = setInterval(()=>{
      this.drawLine();
      this.drawWindLine();
      this.getAll();
    },3000)
  },
  methods: {
    // 手滑动
    touchStart(e) {
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    touchMove(e) {
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      const left = this.currentPlay == 'red' ?  0 : -window.innerWidth
      var offsetWidth = Math.min(0, Math.max(-window.innerWidth,left+deltaX))
      this.percent = Math.abs(offsetWidth/window.innerWidth)
      this.$refs.back.style["transform"] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.back.style["transitionDuration"] = 10
    },
    touchEnd() {
      let offsetWidth
      let percent
      if(this.currentPlay === 'red'){
        if(this.percent > 0.5) {
          this.currentPlay = 'yellow'
          offsetWidth = -window.innerWidth
        } else {
          offsetWidth = 0
        }
      } else {
        if( 0.5 < this.percent < 0.9) {
          this.currentPlay = 'red'
          offsetWidth = 0
        } else {
          offsetWidth = -window.innerWidth
        }
      }
      this.$refs.back.style["transform"]  = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.back.style["transitionDuration"] = 10
    },
    switchBtn(){
      this.switchVal = !this.switchVal //开关
      this.lineLightSwitch = !this.switchVal

      this.hidebtnlightB1 = !this.hidebtnlightB1
      if(this.switchVal==false){
        this.hidebtnlightB1=false
      }

      this.hidebtnlightB2 = false
      localStorage.setItem('hidebtnlightB1',this.hidebtnlightB1 )  //保存演示状态
      localStorage.setItem('hidebtnlightB2',this.hidebtnlightB2 )  //保存演示状态

      

      //光圈
      this.clightWAI = !this.clightWAI
      this.clightZHONG = !this.clightZHONG
      this.clightNEI = !this.clightNEI

      localStorage.setItem('lightBtn',this.switchVal)

      if(this.switchVal==true){
        this.btnBG = '/on_1.png';
      }else{
        this.btnBG = '/normal.png';
      }

      let _this = this;
      let obj = JSON.stringify({
        topic:"mwcdemo/response/bulb",
        message:"{\"type\":\"execute\",\"goal\":\"bulb\",\"command\":\"onoff\",\"parameter\":\"0\"}",
      })
      _this.$ajax.post('https://api.ileapcloud.com/mqtt/publish',obj).then((res)=>{
        
      })
    },
    switchWindBtn(){
      this.switchWindVal = !this.switchWindVal
      this.lineWindSwitch = !this.switchWindVal
      this.hidebtnwindB1 = !this.hidebtnwindB1

      if(this.switchWindVal==false){
        this.hidebtnwindB1=false
      }

      this.hidebtnwindB2=false

      localStorage.setItem('hidebtnwindB1',this.hidebtnwindB1 )  //保存演示状态
      localStorage.setItem('hidebtnwindB2',this.hidebtnwindB2 )  //保存演示状态

      //光圈
      this.cwindWAI = !this.cwindWAI
      this.cwindZHONG = !this.cwindZHONG
      this.cwindNEI = !this.cwindNEI

      localStorage.setItem('windBtn',this.switchWindVal)

      let _this = this;
      let obj = JSON.stringify({
        topic:"mwcdemo/response/windmill",
        message:"{\"type\":\"execute\",\"goal\":\"windmill\",\"command\":\"onoff\",\"parameter\":\"0\"}",
      })
      _this.$ajax.post('https://api.ileapcloud.com/mqtt/publish',obj).then((res)=>{
        
      })
    },
    //灯减
    decreaseLight(per){
      this.lightBUlb = per
      var oldval = this.lightBUlb-1
      var val = (this.lightBUlb-oldval)*1;

      
      localStorage.setItem('lightNUM',this.lightBUlb )

      let _this = this;
      let obj = JSON.stringify({
        topic:"mwcdemo/response/bulb",
        message:"{\"type\":\"execute\",\"goal\":\"bulb\",\"command\":\"decrease\",\"parameter\":\""+val+"\"}",
      })
      _this.$ajax.post('https://api.ileapcloud.com/mqtt/publish',obj).then((res)=>{
        
      })
    },
    //灯加
    increaseLight(per){
      var oldval = per-1
      var val = (per-oldval)*1;

      this.lightBUlb = per
      let _this = this;
      let obj = JSON.stringify({
        topic:"mwcdemo/response/bulb",
        message:"{\"type\":\"execute\",\"goal\":\"bulb\",\"command\":\"increase\",\"parameter\":\""+val+"\"}",
      })
      _this.$ajax.post('https://api.ileapcloud.com/mqtt/publish',obj).then((res)=>{
      })
    },
    //风减
    decreaseWind(per){
      var oldval = per-1
      var val = (per-oldval)*1;

      let _this = this;
      let obj = JSON.stringify({
        topic:"mwcdemo/response/windmill",
        message:"{\"type\":\"execute\",\"goal\":\"windmill\",\"command\":\"decrease\",\"parameter\":\""+val+"\"}",
      })
      _this.$ajax.post('https://api.ileapcloud.com/mqtt/publish',obj).then((res)=>{
      })
    },
    //风加
    increaseWind(per){
      var oldval = per-1
      var val = (per-oldval)*1;

      let _this = this;
      let obj = JSON.stringify({
        topic:"mwcdemo/response/windmill",
        message:"{\"type\":\"execute\",\"goal\":\"windmill\",\"command\":\"increase\",\"parameter\":\""+val+"\"}",
      })
      _this.$ajax.post('https://api.ileapcloud.com/mqtt/publish',obj).then((res)=>{
        
      })
    },
    drawLine(){
      this.myChart =  this.$echarts.init(document.getElementById('myChart'))
      this.option = {
          xAxis: {
              type: 'category',
              data: sums,
              name:'No.',
              //除去刻度
              axisTick: {
                  show: false
              },
              splitLine: {
                show: false
              },
          },
          yAxis: {
              type: 'value',
              min:0,
              max:500,
              name:'Current',
              axisTick: {
                show: false
              },
              splitLine: {
                show: false
              },
          },
          series: [{
              data:this.vData,
              symbol: "none",
              type: 'line',
              smooth: true,
              lineStyle: {
                normal: {
                    color: {
                       type: 'linear',
                       x: 0,
                       y: 0,
                       x2: 0,
                       y2: 1,
                       colorStops: [{
                            offset: 0, color: 'red' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'blue' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    width: 2,
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#EE0CB0',
                    color: ''
                }
            }
          }]
      };
      this.myChart.setOption(this.option);
    },
    drawWindLine(){
      this.myWindChart = this.$echarts.init(document.getElementById('myChartWind'));
      this.optionW = {
          series: [
              {
                  name: '业务指标',
                  type: 'gauge',
                  radius: '90%',
                  min:0,
                  max: 200,
                  splitNumber: 8,
                  axisLine: {
                    show: true,
                    lineStyle: {
                      width: 3,
                      opacity: 0
                  },
                },
                detail: { show: false	},
                title: {				// 仪表盘标题。
                  show: false,				// 是否显示标题,默认 true。
                },
                data: [
                  {name:'Rev', value: this.windData.wms}
                ],
                axisTick: {				// 仪表盘轴线(轮廓线)相关配置。
                    length:10,
                    show: true,				// 是否显示仪表盘轴线(轮廓线),默认 true。
                    lineStyle: {			// 仪表盘轴线样式。
                      color:{
                        image: document.getElementById('linear-pic'),
                        repeat: 'no-repeat',
                      },
                     	//仪表盘的轴线可以被分成不同颜色的多段。每段的  结束位置(范围是[0,1]) 和  颜色  可以通过一个数组来表示。默认取值：[[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]
                      // opacity: 1,					//图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                      width: 2,					//轴线宽度,默认 30。
                      // shadowBlur: 0,				//(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。 
                      // shadowColor: "FDBFC8",		//阴影颜色。支持的格式同color。
                    },
                  },
                  axisLabel:{
                    distance: -10,			// 标签与刻度线的距离,默认 5。
                    fontSize: 14,
                    color:'#c504de',
                    show:true
                  },
                  splitLine:{ 
                    show: false
                  },
                  pointer:{
                    show: true,				// 是否显示指针,默认 true。
	            	    length: "70%",			// 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
                    width: 5,	
                  },
                  itemStyle:{
                      color:'#9c27b0'
                  }
              }
          ]
      };
      this.myWindChart.setOption(this.optionW, true);
    },
    getAll(){
       if(this.allData.length>0){
          this.vData = [];
          for(let i=0; i<this.allData.length; i++){
            this.vData.unshift(this.allData[i].cur.toFixed(0))
            this.windData = this.allData[0]
            this.windWms = this.windData.wms;
          }
          this.lm = this.allData[0].lm;
          // let f = this.allData[0]
          // let l = this.allData[1]
      }
    },
    btnAction(){

      this.hidebtnlightB1 = false
      this.hidebtnlightB2 = true
      
   
      localStorage.setItem('hidebtnlightB1',this.hidebtnlightB1 )  //保存演示状态
      localStorage.setItem('hidebtnlightB2',this.hidebtnlightB2 )  //保存演示状态


      this.lineLightSwitch= true

      let _this = this;
      var v1 =0;
      var v2 =0;
      var val1 = 0;
      var step=0;

      let lightObj = JSON.stringify({
        topic:"mwcdemo/response/bulb",
        message:"{\"type\":\"execute\",\"goal\":\"bulb\",\"command\":\"decrease\",\"parameter\":\"5\"}",
      })
      _this.$ajax.post('https://api.ileapcloud.com/mqtt/publish',lightObj).then((res)=>{
      })

      this.actionTimer = setInterval(()=>{
        var dy = (Math.random()*1.5).toFixed(1)-0
        step++
        var updown; //增加 减少
      
        if(step==1){
          v1 = dy
          val1 =v1;
          updown = "increase"
        }
        if(step == 2){
          v2=dy
          val1 =v2;
          updown = "increase"
        }
        if(step==3){
          val1 = v1;
          updown = "decrease"
        }
        if(step==4){
          val1 = v2;
          updown = "decrease"
          step = 0;
        }

        //灯
        let lightobj = JSON.stringify({
          topic:"mwcdemo/response/bulb",
          message:"{\"type\":\"execute\",\"goal\":\"bulb\",\"command\":\""+updown+"\",\"parameter\":\""+val1+"\"}",
        })
        _this.$ajax.post('https://api.ileapcloud.com/mqtt/publish',lightobj).then((res)=>{
          
        })

      },12000)

    },
    btnWindAction(){
      this.hidebtnwindB1 = false
      this.hidebtnwindB2 = true
      
      localStorage.setItem('hidebtnwindB1',this.hidebtnwindB1 )  //保存演示状态
      localStorage.setItem('hidebtnwindB2',this.hidebtnwindB2 )  //保存演示状态

      this.lineWindSwitch = true

      let _this = this;
      var v1 =0;
      var v2 =0;
      var val1 = 0;
      var step=0;

      let windObj = JSON.stringify({
        topic:"mwcdemo/response/windmill",
        message:"{\"type\":\"execute\",\"goal\":\"windmill\",\"command\":\"decrease\",\"parameter\":\"5\"}",
      })
      _this.$ajax.post('https://api.ileapcloud.com/mqtt/publish',windObj).then((res)=>{
      })

      this.actionWindTimer = setInterval(()=>{
        var dy = (Math.random()*1.5).toFixed(1)-0
        step++
        var updown; //增加 减少
      
        if(step==1){
          v1 = dy
          val1 =v1;
          updown = "increase"
        }
        if(step == 2){
          v2=dy
          val1 =v2;
          updown = "increase"
        }
        if(step==3){
          val1 = v1;
          updown = "decrease"
        }
        if(step==4){
          val1 = v2;
          updown = "decrease"
          step = 0;
        }

        //风
        let windobj = JSON.stringify({
          topic:"mwcdemo/response/windmill",
          message:"{\"type\":\"execute\",\"goal\":\"windmill\",\"command\":\""+updown+"\",\"parameter\":\""+val1+"\"}",
        })
        _this.$ajax.post('https://api.ileapcloud.com/mqtt/publish',windobj).then((res)=>{
          
        })

      },12000)
    },
    btnOver(){
      let _this = this;

      if(this.switchVal==true){
        this.hidebtnlightB1 = true
      }

      // this.hidebtnlightB2 = false
    
      localStorage.setItem('hidebtnlightB1',this.hidebtnlightB1 )  //保存演示状态
      // localStorage.setItem('hidebtnlightB2',this.hidebtnlightB2 )  //保存演示状态

      if(this.switchVal){
        this.lineLightSwitch= false
      }

      let lightObj = JSON.stringify({
        topic:"mwcdemo/response/bulb",
        message:"{\"type\":\"execute\",\"goal\":\"bulb\",\"command\":\"decrease\",\"parameter\":\"5\"}",
      })
      _this.$ajax.post('https://api.ileapcloud.com/mqtt/publish',lightObj).then((res)=>{
      })

      clearInterval(this.actionTimer);

    },
    btnWindOver(){
      let _this = this;

      if(this.switchWindVal==true){
        this.hidebtnwindB1 = true
      }
      // this.hidebtnwindB2 = false
      
      localStorage.setItem('hidebtnwindB1',this.hidebtnwindB1 )  //保存演示状态
      // localStorage.setItem('hidebtnwindB2',this.hidebtnwindB2 )  //保存演示状态

      if(this.switchWindVal){
        this.lineWindSwitch = false
      }

      let windObj = JSON.stringify({
        topic:"mwcdemo/response/windmill",
        message:"{\"type\":\"execute\",\"goal\":\"windmill\",\"command\":\"decrease\",\"parameter\":\"5\"}",
      })
      _this.$ajax.post('https://api.ileapcloud.com/mqtt/publish',windObj).then((res)=>{
      })

      clearInterval(this.actionWindTimer);
    }
  },
  watch:{
    'lm':function(val,oldval){
      var z = Math.floor((255-this.lm)/50)
      for(var i =0 ;i<this.lights.length; i++){
          this.lights[i].openlight = false
          if(i<z){
            this.lights[i].openlight = true
          }
      }
    }
  },
  meteor: {
    $subscribe: {
      metrics () {
        return [100];
      }
    },
    updateData () {
      var datal = Metrics.find({},{
          sort: {created:-1},
          limit: 50
      }).fetch();
       this.allData = datal;
    }
  }

}
</script>


<style lang="less">
*,body{padding: 0;margin: 0;}

//光圈动画
.fadeWai-enter, .fadeWai-leave-to {
  opacity: 0;
}
.fadeWai-enter-active, .fadeNei-leave-active{
  transition: opacity  0.5s 0.2s;
}

.fadeZhong-enter, .fadeZhong-leave-to{
  opacity: 0;
}
.fadeZhong-enter-active, .fadeZhong-leave-active {
  transition: opacity  0.5s 0.1s;
}

.fadeNei-enter, .fadeNei-leave-to {
  opacity: 0;
}
.fadeNei-enter-active, .fadeWai-leave-active  {
  transition: opacity  0.5s ;
}
//光圈动画

body{
  background: #0d0d0d;
  color: #fff;
}
.home{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: #000;
}
.btnall{
    width: 538px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}
.btn_1,.btn_2{
  float: left;
  border: 1px solid #fff;
  padding: 5px 0;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
    font-size: 22px;
    width: 200px;
}
.btn_1:hover, .btn_2:hover{
  background: url('/Demonstration__hover.png');
  background-size: cover;
}
.btn_2{
  margin-left: 25px;
  float: right;
}
.size_switch{
  width:170px;
  height:170px;
}
.content{
  position: fixed;
  white-space: nowrap;
  width: 100%;
  height:1000%;
  transition:.3s linear;
  margin: 0 auto;
}
h2{
  text-align: center;
  margin: 0;
  padding: 3rem;
  font-weight: 800;
}

.light_box .voltage{
  float: left;
  width: 82px;
   margin-right: 40px;
}
.voltage>span{
  display: block;
  text-align: center;
  margin-bottom: 20px;
  font-size: 26px;
}
.light_box,.wind_box{
    width: 100%;
    height: 10%;
    position: relative;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
    background:url('/bgblack.png');
    background-repeat: no-repeat;
    background-size: cover;
}
.light_box>div{
  width: 607px;
  margin: 0 auto;
}
.wind_box>div{
  width: 607px;
  margin: 0 auto;
}
  .light_box p, .wind_box p{
      font-size: 26px;
      text-align: center;
      font-weight: 500;
      margin-bottom:1.5rem;
  }
  .bread{
      overflow: hidden;
      position: relative;
  }
  .round{
      width: 13px;
      height: 13px;
      background: url('/im_5.png');
      background-size: cover;
      margin: 0 auto;
      margin-bottom: 38px;
  }
  .round:nth-child(5){
    margin-bottom: 20px;
  }
  .wind_box .switch_button{
    overflow: hidden;
    text-align: center;
    margin-top: 1.4rem;
    // margin-bottom: 3.8rem;
  }
  .wind_box .switch_button>span{
    margin: 0 1rem;
  }
  .switch_button{
    width: 358px;
    overflow: hidden;
    float: left;
    position: relative;
  }
  .wind_box .voltage{
    float: left;
    width: 80px;
   margin-right: 44px;

  }
  // .wind_box .voltage .show_slider{
  //   left: 163px;
  // }
  .switch {
    top: 80px;
    left: 80px;
    margin: 0 auto;
    background: url('/normal.png');
    background-size: cover;
    cursor: pointer;
    position: absolute;
    width: 190px;
    height: 190px;
  }
  .switch:hover{
    width: 190px;
    height:190px;
    margin: 0 auto;
    background: url('/hover.png');
    background-size: cover;
  }
  .wai_cricle{
    background: url('/open_wai.png');
    background-size: cover;
    width: 358px;
    height: 362px;
    padding: 27px 0;
    position: absolute;
    top: 2px;
    left: 2px;
  }
  .zhong_cricle{
    background: url('/open_zhong.png');
    background-size: cover;
    width: 276px;
    height: 276px;
    margin: 0 auto;
    padding: 23px 0;
    position: absolute;
    top: 42px;
    left: 44px;
  }
  .nei_cricle{
    background: url('/open_nei.png');
    background-size: cover;
    width:205px;
    height: 205px;
    margin: 0 auto;
    position: absolute;
    top: 76px;
    left: 74px;
  }
  .color_btn{
    width: 358px;
    height: 358px;
    position: relative;
  }
  //动画
  .light{
      font-size: 15px;
      float: left;
      float: right;
  }
  .light span{
    display: block;
    margin-right: 0.5rem;
    font-size: 24px;
  }
  .light_num{
      overflow: hidden;
      margin: 0 auto;
      line-height: 6px;
      transform: rotate(180deg);
  }
  .voltage{
    margin-bottom: 1.5rem;
    position: relative;
  }

  .windImg_box{
    overflow: hidden;
    position: relative;
    margin-bottom: 30px;
  }
  .windImg_box .execute {
    overflow: hidden;
    margin-top: 1rem;
    float: right;
  }
  .windImg_box .execute p{
    margin: 0;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    margin-top: -28px;
  }
  .show_slider{
   position: absolute;
    top: 0;
    left: 0;
    width: 96px;
    height: 371px;
    background: #000;
    z-index: 99;
    opacity: 0.1;
  }

  .white{
    background:url('/im_L_5.png');
    background-size: cover;
  }
  .hidebtnlight_box1 ,.hidebtnlight_box2{
    width: 200px;
    height: 42px;
    position: absolute;
    top:0;
    left: 0;
    background:rgba(0,0,0,0.3);
  }
  .hidebtnlight_box2{
    left: inherit;
    right: 0;
  }
  
</style>
