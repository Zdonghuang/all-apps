<template>
  <div class="home">
      <h2>LeezSBC</h2>
      <div class="content">
        <div class="light_box">
            <p>Lighthouse</p>
            <div class="bread">
                <!-- 遮盖 -->
                <div class="switch_btnbox" v-if="switch_btnbox"></div> 
                <!-- 遮盖 -->
                <div class="switch_button">
                  <span>on</span>
                  <div class="switch" @click="switchBtn">
                    <input type="checkbox">
                    <span :class="{'el-switch__core':switchVal}"></span> 
                  </div>
                  <span>off</span>
                </div>
                <div class="light">
                    <span>lm</span>
                    <div class="light_num">
                        <div class="round" v-for="(item,index) in lights" :key="index" :style="item.style" :class="{white:item.openlight}"></div>
                    </div>
                </div>
            </div>
            <div class="voltage">
                <span>Voltage</span>
                <!-- 遮盖 -->
                <div class="show_slider" v-if="lineLightSwitch"></div>
                <!-- 遮盖 -->
                  <Slider :min=0 :max=10 v-model="Vval" style="display:inline-block;"
                          @subtract="decreaseLight" @plus="increaseLight"></Slider>
            </div>
            <div id="myChart" :style="{width: '600px', height: '300px',float:'left',overflow:'hidden'}"></div>
        </div>
        <div class="wind_box"> 
            <p>Wind Driven Generator</p>
            <!-- 遮盖 -->
            <div class="switch_btnbox" v-if="switch_btnbox" style="left: 269px;top: 103px;"></div>
            <!-- 遮盖 -->
            <div class="switch_button">
              <span>on</span>
              <div class="switch" @click="switchWindBtn">
                <input type="checkbox">
                <span :class="{'el-switch__core':switchWindVal}"></span>
              </div>
              <span>off</span>
            </div>
            <div class="voltage">
                <span>Voltage</span>
                <!-- 遮盖 -->
                <div class="show_slider" v-if="lineWindSwitch"></div>
                <!-- 遮盖 -->
                <Slider :min=0 :max=10 v-model="Wval" style="display:inline-block;"
                @subtract="decreaseWind" @plus="increaseWind"></Slider>
            </div>
            <div class="windImg_box">
              <div id="myChartWind" :style="{width: '200px', height: '200px',float:'left',overflow:'hidden'}"> </div>
              <div class="execute">
                  <img :src="windWms>=175?'/execute2.png':'/execute.png'" alt="" width="110">
                  <p>Alert</p>
              </div>
            </div>
        </div>
      </div>
      <div class="btn_1" @click="btnAction" style="width:136px;">Demonstration</div>
      <div class="btn_2" @click="btnOver">Stop</div>
  </div>
</template>

<script>

var colorTemplate1 = [[0.2, "#FDBFC8"], [0.8, "#FDBFC8"], [1, "#FDBFC8"]];

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
      switch_btnbox:false,
      lineLightSwitch:true,
      lineWindSwitch:true,
      lm:0,
      lights:[{style:"width:5px;height:5px",openlight:false},
          {style:"width:6px;height:6px",openlight:false},
          {style:"width:7px;height:7px",openlight:false},
          {style:"width:8px;height:8px",openlight:false},
          {style:"width:9px;height:9px",openlight:false},
          {style:"width:10px;height:10px",openlight:false},
          {style:"width:11px;height:11px",openlight:false},
          {style:"width:12px;height:12px",openlight:false},
          {style:"width:13px;height:13px",openlight:false},
          {style:"width:14px;height:14px",openlight:false}],
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
        lightBUlb:'', //灯亮度调节
        windWms:0,
        dy:0  //电压
    }
  },
  components:{
    Slider
  },
  beforeDestroy(){
    clearInterval(this.clearTimer)
    clearInterval(this.actionTimer)
  },
  mounted(){
    if(localStorage.getItem('lightBtn')=='true'){
      this.switchVal = true
      
    }else{
      this.switchVal = false
    }
    
    if(localStorage.getItem('windBtn')=='true'){
      this.switchWindVal = true
    }else{
      this.switchWindVal = false
    }

    if(localStorage.getItem('switchBtnbox')=='true'){
      this.switch_btnbox = true
    }else{
      this.switch_btnbox = false
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
    switchBtn(){
      this.switchVal = !this.switchVal
      this.lineLightSwitch = !this.switchVal
      localStorage.setItem('lightBtn',this.switchVal)

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
      var val = (this.lightBUlb-oldval)*0.5;

      
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
      var val = (per-oldval)*0.5;

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
      var val = (per-oldval)*0.5;

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
      var val = (per-oldval)*0.5;

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
              type: 'line',
              smooth: true,
              lineStyle: {
                normal: {
                    color: '#EE0CB0',
                    width: 1,
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#EE0CB0',
                    color: '#fff'
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
                  min:0,
                  max: 200,
                  splitNumber: 8,
                  detail: {
                    show: false,	
                  },
                  data: [
                    {name:'Rev', value: this.windData.wms ,}
                   
                    ],
                  axisLine: {				// 仪表盘轴线(轮廓线)相关配置。
                    show: true,				// 是否显示仪表盘轴线(轮廓线),默认 true。
                    lineStyle: {			// 仪表盘轴线样式。
                      color: colorTemplate1, 	//仪表盘的轴线可以被分成不同颜色的多段。每段的  结束位置(范围是[0,1]) 和  颜色  可以通过一个数组来表示。默认取值：[[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]
                      opacity: 1,					//图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                      width: 10,					//轴线宽度,默认 30。
                      shadowBlur: 0,				//(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。 
                      shadowColor: "FDBFC8",		//阴影颜色。支持的格式同color。
                    }
                  },
                  axisLabel:{
                    distance: 5,			// 标签与刻度线的距离,默认 5。
                    fontSize: 12,
                    color:'#E9566A'
                  },
                  splitLine:{
                    length:15
                  },
                  pointer:{
                    show: true,				// 是否显示指针,默认 true。
	            	    length: "70%",			// 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
	            	    width: 5,	
                  },
                   title: {				// 仪表盘标题。
                    show: true,				// 是否显示标题,默认 true。
                    offsetCenter: [0,0],//相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                    fontSize: 14,			// 文字的字体大小,默认 15。
                  },
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
            this.windData = this.allData[this.allData.length-1]
            this.windWms = this.windData.wms;
          }
          this.lm = this.allData[0].lm;
          // let f = this.allData[0]
          // let l = this.allData[1]
      }
      
    },
    btnAction(){
      this.switch_btnbox = true
      localStorage.setItem('switchBtnbox',this.switch_btnbox )  //保存演示状态

      this.lineLightSwitch= true
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
      this.switch_btnbox = false
      localStorage.setItem('switchBtnbox',this.switch_btnbox )  //保存演示状态

      if(this.switchVal){
        this.lineLightSwitch= false
      }

      if(this.switchWindVal){
        this.lineWindSwitch = false
      }

      let windObj = JSON.stringify({
        topic:"mwcdemo/response/windmill",
        message:"{\"type\":\"execute\",\"goal\":\"windmill\",\"command\":\"decrease\",\"parameter\":\"5\"}",
      })
      _this.$ajax.post('https://api.ileapcloud.com/mqtt/publish',windObj).then((res)=>{
      })

      let lightObj = JSON.stringify({
        topic:"mwcdemo/response/bulb",
        message:"{\"type\":\"execute\",\"goal\":\"bulb\",\"command\":\"decrease\",\"parameter\":\"5\"}",
      })
      _this.$ajax.post('https://api.ileapcloud.com/mqtt/publish',lightObj).then((res)=>{
      })

      clearInterval(this.actionTimer);

    }
  },
  watch:{
    'lm':function(val,oldval){
      var z = Math.floor((255-this.lm)/25)
      for(var i =0 ;i<this.lights.length; i++){
          this.lights[i].openlight = false
          if(i<=z){
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
body{
  height: 100% !important;
  background-color: #D9D9D9;
}
.home{
  position: relative;
}
.btn_1,.btn_2{
  position: absolute;
  top: 50px;
  right: 150px;
  border: 1px solid #e85f61;
  padding: 5px 0;
  width: 70px;
  text-align: center;
  border-radius: 5px;
  background: #C0C0C0;
  cursor: pointer;
  font-size: 14px;
}
.btn_2{
  right: 65px;
}
.btn_1:hover,.btn_2:hover{
  background: #D9D9D9;
}

.content{
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
h2{
  text-align: center;
  margin: 0;
  padding: 3rem;
  font-weight: 800;
}
.light_box,.wind_box{
    float: left;
    width: 600px;
    position: relative;
}
  .light_box p, .wind_box p{
      font-size: 24px;
      text-align: center;
      font-weight: 500;
  }
  .bread{
      margin-top: 3rem;
      overflow: hidden;
      position: relative;
  }
  .round{
      width: 10px;
      height: 10px;
      background: #C0C0C0;
      border-radius: 50%;
  }
  .wind_box .switch_button{
    width: 100%;
    text-align: center;
    margin-top: 1.4rem;
    margin-bottom: 3.8rem;
  }
  .wind_box .switch_button>span{
    margin: 0 1rem;
  }
  .switch_button{
    overflow: hidden;
    float: left;
  }
  .wind_box .voltage{
    overflow: hidden;
    width: 100%;
    height: 30px;
    text-align: center;
    position: relative;
  }
  .wind_box .voltage .show_slider{
    left: 163px;
  }
  .switch {
    display: inline-flex;
    align-items: center;
    position: relative;
    font-size: 14px;
    line-height: 20px;
    height: 20px;
    vertical-align: middle;
    width: 51px;
  }
  .switch>input{
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  .switch span{
    margin: 0;
    display: inline-block;
    position: relative;
    width: 48px;
    height: 20px;
    outline: none;
    background: url('/square.png');
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;
    cursor: pointer;
    transition: border-color .3s,background-color .3s;
    vertical-align: middle;
  }

  .switch span::after{
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    background: url('/btn.png');
    background-repeat: no-repeat;
    background-size: cover;
    transition: all .3s;
    width: 20px;
    height: 20px;
  }
  //动画
  .switch .el-switch__core{
    width: 48px;
    height: 20px;
    background: url('/square_open.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .switch .el-switch__core:after {
    left: 100%;
    margin-left: -17px;
  }
  //动画
  
  .light{
      font-size: 15px;
      float: left;
      margin-left: 6.5rem;
  }
  .light span{
      margin-right: 0.5rem;
  }
  .light_num{
      overflow: hidden;
      display: inline-block;
      line-height: 6px;
  }
  .round{
      display: inline-block;
      margin-left: 5px;
  }
  .voltage{
    margin-top: 4rem;
    margin-bottom: 3rem;
    position: relative;
  }

  .windImg_box{
    margin-top: 5rem;
    padding: 0 6rem;
    overflow: hidden;
  }
  .windImg_box .execute {
    width: 120px;
    overflow: hidden;
    margin-top: 1rem;
    float: right;
  }
  .windImg_box .execute p{
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }
  .show_slider{
    position: absolute;
    top: 2px;
    left: 69px;
    width: 342.33px;
    height: 21.6px;
    background: #d3d0d0;
    z-index: 99;
    opacity: 0.3;
    border-radius: 10px;
  }
  .switch_btnbox{
    position: absolute;
    top: 0;
    left: 19px;
    width: 60px;
    height: 24px;
    background: #d3d0d0;
    z-index: 99;
    opacity: 0.3;
  }
  .white{
    background: #fff;
  }
</style>
