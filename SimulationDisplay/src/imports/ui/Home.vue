<template>
<div class="b-home">
    <h2>Industrial IoT Edge Digital Twin</h2>
    <div class="draw_box">
      <div id="myChartWind" :style="{width: '620px', height: '300px',overflow:'hidden',float:'left',marginLeft:'50px'}"></div>
      <div style="float:left;overflow:hidden;">
        <div id="myChartLife" :style="{width: '620px', height: '300px',overflow:'hidden',position:'absolute',top:'0',left:'700px',marginLeft:'50px',zIndex:'1'}"></div>
        <!-- <div id="myChartCurrent" :style="{width: '620px', height: '89px',overflow:'hidden',position:'absolute',top:'91px',left:'700px',marginLeft:'50px',zIndex:'4'}"></div> -->
        <!-- <div id="myChartBrightness" :style="{width: '620px', height: '300px',overflow:'hidden',position:'absolute',top:'-70px',left:'700px',marginLeft:'50px',zIndex:'3'}"></div> -->

      </div>
    </div>
    <div class="home">
      <img src="/WindDG.png" class="wind_title" width="25%">
      <img src="/Lighth.png" class="light_title" width="20%">
      <img src="/PoweredbyLeapIot.png" class="pbl_title" width="16%">
      <div class="content">
        <div class="fenche1">
          <div class="zhuzi"></div>
          <div class="fc"></div>
        </div>

        <div class="fenche2" >
          <div class="zhuzi"></div>
          <div class="fc"></div>
          <transition name="slide-in">
            <div class="box" >
              <p>RPM : {{windWms}} </p>
            </div>
          </transition>
        </div>

        <div class="fenche3">
          <div class="zhuzi"></div>
          <div class="fc"></div>
        </div>

        <div class="dengta">
          <div class="dt"></div>
          <div class="light"></div>
          <transition name="slide-in">
            <div class="box">
              <p>Brightness : {{lm}}cd/m2</p>
              <p>Temperature : {{tp}}°C</p>
              <p>Current : {{cur}}mA</p>
              <p>Remaining life : {{ttf}}h</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
</div>

</template>

<script>
//采集点数值
var numbers = 0;
var sums = [];

for(var i=0 ;i<40; i++){
  numbers++;
  sums.push(numbers)
}
//采集点数值

import { Meteor } from 'meteor/meteor'
import { Metrics } from '../api/collections'
export default {
  data () {
    return {
        lm:0, //电流
        tp:0, //温度
        cur:0, //current 电流,
        ttf:0,
        allData:[],
        windData:[],
        windWms:0,
        dy:0,  //电压
        clearTimer:null,
        fengcheTimerShown:null,
        fengcheTimerHide:null,
        fenche2Show:false,
        dengtaShow:false,
        //绘制数据图
        myChartLife:null, 
        lifeOptions:{},
        myChartCurrent:null,
        currentOptions:{},
        windOptions:{},
        myChartWind:null,
        myChartBrightness:null,
        brightnessOptions:{},
       
        vData:[],  // Brightness
        tpdata:[], //Temperature
        curdata:[], //Current
        ttfdata:[], //Remaining life

        brightdata:[],
        currentdata:[]
    }
  },
  created(){
  },
  beforeDestroy(){
    clearInterval(this.fengcheTimerShown)
    clearInterval(this.fengcheTimerHide)
    clearInterval(this.clearTimer)
  },

  mounted(){
    this.clearTimer = setInterval(()=>{
      this.getAll();
      this.drawLineLife();
      this.drawLineWind();

    },3000)

    // this.fengcheTimerShown = setInterval(()=>{
    //   this.fenche2Show = true
    //   this.dengtaShow = true
    // },5000)
    // this.fengcheTimerHide = setInterval(()=>{
    //   this.dengtaShow = false
    //   this.fenche2Show = false
    // },10000)


  },
  methods: {
    getAll(){
       if(this.allData.length>0){
          this.vData = [];
          this.windData = [];
          this.tpdata = [];
          // this.lmdata = [];
          for(let i=0; i<this.allData.length; i++){
            this.vData.unshift((this.allData[i].cur).toFixed(0))  
            this.windData.unshift(this.allData[i].wms>150?150:this.allData[i].wms.toFixed(0))
            this.tpdata.unshift(this.allData[i].tp.toFixed(0))
            // this.lmdata.unshift(this.allData[i].lm).toFixed(0))

            //数据图
            let lifenum = Math.floor(this.allData[i].ttf/3600/25);
            let current = Math.floor(this.allData[i].cur/5+10);
          
            this.ttfdata.unshift(lifenum > 100? 100:lifenum.toFixed(0))
            this.brightdata.unshift(Math.floor((255-this.allData[i].lm)/2.5).toFixed(0))
            this.currentdata.unshift(current > 100? 100:current.toFixed(0))


            let wd = this.allData[0]  
            this.windWms = wd.wms;
          }
          this.lm = Math.floor((255-this.allData[0].lm));
          this.tp = this.allData[0].tp;
          this.cur = this.allData[0].cur;
          this.ttf = Math.floor(this.allData[0].ttf/3600);

          
          // let f = this.allData[0]
          // let l = this.allData[1]
      }
      
    },
    // showFenche2(){
    //   this.fenche2Show = !this.fenche2Show;
    // },
    // showDengta(){
    //   this.dengtaShow = !this.dengtaShow;
    // }
    drawLineWind(){
      this.myChartWind =  this.$echarts.init(document.getElementById('myChartWind'))
      this.windOptions = {
        xAxis: {
            type: 'category',
            data: sums,
            name:'NO.',
            axisLabel: {
              show: true,
              textStyle: {
                  color: 'transparent'
              },
              rotate:40
            },
            axisLine: {
              lineStyle: {
                  type: 'solid',
                  color:'transparent',
              }
            },
            //除去刻度
            axisTick: {
                show: false
            },
        },
        yAxis: {
            type: 'value',
            min:0,
            max:150,
            minInterval : 0.25,
            boundaryGap : [ 0, 0 ],
            name:'RPM',
            splitLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                  color: 'transparent'
              },
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                  type: 'solid',
                  color:'transparent',
              }
            },
            axisTick: {
              show: false
            },
            
        },
        tooltip:{
          trigger: 'item',
          formatter: function (params) {
            var color = 'transparent';//图例颜色
            var htmlStr ='<div style="width:100px;height:30px;font-size:14px;text-align:center;line-height:30px;">';
            // htmlStr += '..' + '<br/>';//x轴的名称
            
            //为了保证和原来的效果一样，这里自己实现了一个点的效果
            htmlStr += '<span style="margin-right:5px;display:inline-block;width:0px;height:0px;border-radius:5px;background-color:'+color+';"></span>';
            
            //添加一个汉字，这里你可以格式你的数字或者自定义文本内容
            htmlStr += 'RPM : '+params.value;
            
            htmlStr += '</div>';
            
            return htmlStr; 
          }
        },
        legend:{
          data:['RPM'],
          top:'20px',
          textStyle:{//图例文字的样式
              color:'#fff',
              fontSize:14
            }
        },
        series: [{
            name:'RPM',
            data: this.windData,
            symbol:'circle', 
            type: 'line',
            smooth: true,
            symbolSize: 2,
            lineStyle: {
                normal: {
                    color: '#00D0FD',
                    width: 1,
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#00D0FD',
                    color: '#00D0FD'
                }
            }
        }]
      };
      this.myChartWind.setOption(this.windOptions);
    },
    drawLineLife(){
      this.myChartLife =  this.$echarts.init(document.getElementById('myChartLife'))
      this.lifeOptions = {
        xAxis: {
            type: 'category',
            data: sums,
            name:'NO.',
            axisLabel: {
              show: true,
              textStyle: {
                  color: 'transparent'
              },
              rotate:40
            },
            axisLine: {
              lineStyle: {
                  type: 'solid',
                  color:'transparent',
              }
            },
            //除去刻度
            axisTick: {
                show: false
            },
        },
        yAxis: {
            type: 'value',
            min:0,
            max:100,
            minInterval : 0.25,
            boundaryGap : [ 0, 0 ],
            name:'RPM',
            splitLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                  color: 'transparent'
              },
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                  type: 'solid',
                  color:'transparent',
              }
            },
            axisTick: {
              show: false
            },
            
        },
        tooltip:{
          trigger: 'item',
          // axisPointer: {
          //     type: 'cross'
          // }
        },
        legend:{
          data:['Brightness','Current','Remaining life'],
          top:'20px',
          textStyle:{//图例文字的样式
            color:'#fff',
            fontSize:14
          }
        },
        series: [
          {
            name:'Brightness',
            data: this.brightdata,
            symbol:'circle', 
            type: 'line',
            smooth: true,
            symbolSize: 2,
            lineStyle: {
                normal: {
                    color: '#00D0FD',
                    width: 1,
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#00D0FD',
                    color: '#00D0FD'
                }
            }
          },

          // {
          //   name:'Temperature',
          //   data: this.tpdata,
          //   symbol:'circle', 
          //   type: 'line',
          //   smooth: true,
          //   symbolSize: 2,
          //   lineStyle: {
          //       normal: {
          //           color: '#0091B2',
          //           width: 1,
          //       }
          //   },
          //   itemStyle: {
          //       normal: {
          //           borderWidth: 1,
          //           borderColor: '#0091B2',
          //           color: '#0091B2'
          //       }
          //   }
          // },

          {
            name:'Current',
            data: this.currentdata,
            symbol:'circle', 
            type: 'line',
            smooth: true,
            symbolSize: 2,
            lineStyle: {
                normal: {
                    color: '#866496',
                    width: 1,
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#866496',
                    color: '#866496'
                }
            }
          },

          {
            name:'Remaining life',
            data: this.ttfdata,
            symbol:'circle', 
            type: 'line',
            smooth: true,
            symbolSize: 2,
            lineStyle: {
                normal: {
                    color: '#0E69C7',
                    width: 1,
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#0E69C7',
                    color: '#0E69C7'
                }
            }
          }

        ]
      };
      this.myChartLife.setOption(this.lifeOptions);
    },
    // drawLineCurrent(){
    //   this.myChartCurrent =  this.$echarts.init(document.getElementById('myChartCurrent'))
    //   this.currentOptions = {
    //     xAxis: {
    //         type: 'category',
    //         data: sums,
    //         name:'NO.',
    //         axisLabel: {
    //           show: true,
    //           textStyle: {
    //               color: 'transparent'
    //           },
    //           rotate:40
    //         },
    //         axisLine: {
    //           lineStyle: {
    //               type: 'solid',
    //               color:'transparent',
    //           }
    //         },
    //         //除去刻度
    //         axisTick: {
    //             show: false
    //         },
    //     },
    //     yAxis: {
    //         type: 'value',
    //         min:0,
    //         max:80,
    //         minInterval : 0.25,
    //         boundaryGap : [ 0, 0 ],
    //         name:'RPM',
    //         splitLine: {
    //           show: false
    //         },
    //         axisLabel: {
    //           show: true,
    //           textStyle: {
    //               color: 'transparent'
    //           },
    //           formatter: '{value}'
    //         },
    //         axisLine: {
    //           lineStyle: {
    //               type: 'solid',
    //               color:'transparent',
    //           }
    //         },
    //         axisTick: {
    //           show: false
    //         },
            
    //     },
    //     tooltip:{
    //       trigger: 'item',
    //       // axisPointer: {
    //       //     type: 'cross'
    //       // }
    //     },
    //     // legend:{
    //     //   data:['Brightness','Temperature','Current','Remaining life']
    //     // },
    //     series: [
    //       {
    //         name:'Current',
    //         data: this.currentdata,
    //         symbol:'circle', 
    //         type: 'line',
    //         smooth: true,
    //         symbolSize: 2,
    //         lineStyle: {
    //             normal: {
    //                 color: '#866496',
    //                 width: 1,
    //             }
    //         },
    //         itemStyle: {
    //             normal: {
    //                 borderWidth: 1,
    //                 borderColor: '#866496',
    //                 color: '#866496'
    //             }
    //         }
    //       },
    //     ]
    //   };
    //   this.myChartCurrent.setOption(this.currentOptions);
    // },
    // drawLineBrightness(){
    //   this.myChartBrightness =  this.$echarts.init(document.getElementById('myChartBrightness'))
    //   this.brightnessOptions = {
    //     xAxis: {
    //         type: 'category',
    //         data: sums,
    //         name:'NO.',
    //         axisLabel: {
    //           show: true,
    //           textStyle: {
    //               color: 'transparent'
    //           },
    //           rotate:40
    //         },
    //         axisLine: {
    //           lineStyle: {
    //               type: 'solid',
    //               color:'transparent',
    //           }
    //         },
    //         //除去刻度
    //         axisTick: {
    //             show: false
    //         },
    //     },
    //     yAxis: {
    //         type: 'value',
    //         min:5,
    //         max:20,
    //         minInterval : 0.25,
    //         boundaryGap : [ 0, 0 ],
    //         name:'RPM',
    //         splitLine: {
    //           show: false
    //         },
    //         axisLabel: {
    //           show: true,
    //           textStyle: {
    //               color: '#fff'
    //           },
    //           formatter: '{value}'
    //         },
    //         axisLine: {
    //           lineStyle: {
    //               type: 'solid',
    //               color:'transparent',
    //           }
    //         },
    //         axisTick: {
    //           show: false
    //         },
            
    //     },
    //     tooltip:{
    //       trigger: 'item',
    //       // axisPointer: {
    //       //     type: 'cross'
    //       // }
    //     },
    //     // legend:{
    //     //   data:['Brightness','Temperature','Current','Remaining life']
    //     // },
    //     series: [
    //       {
    //         name:'Brightness',
    //         data: this.brightdata,
    //         symbol:'circle', 
    //         type: 'line',
    //         smooth: true,
    //         symbolSize: 2,
    //         lineStyle: {
    //             normal: {
    //                 color: '#00D0FD',
    //                 width: 1,
    //             }
    //         },
    //         itemStyle: {
    //             normal: {
    //                 borderWidth: 1,
    //                 borderColor: '#00D0FD',
    //                 color: '#00D0FD'
    //             }
    //         }
    //       }
    //     ]
    //   };
    //   this.myChartBrightness.setOption(this.brightnessOptions);
    // }
  },
  watch:{
    'allData'(val,oldval){
    }
  },
  meteor: {
    $subscribe: {
      metrics () {
        return [40];
      }
    },
    updateData () {
      var datal = Metrics.find({},{
          sort: {created:-1},
          limit: 40
      }).fetch();
       this.allData = datal;
    }
  }

}
</script>


<style lang="less">
.slide-in-enter-active, .slide-in-leave-active {
  transition: opacity 0.5s;
}
.slide-in-enter, .slide-in-leave-to {
  opacity: 0;
}

body{
  height: 100% !important;
  background-color: #1e1f1f;
}
.draw_box{
  // height: 100px;
  position:absolute;
  top:86px;
  left: 0;
  width: 1470px;
  z-index: 9;
}
.draw_box span{
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  font-size: 12px;
}
.b-home>h2{
  padding: 2rem 0;
  text-align: center;
  font-size: 34px;
  font-weight: 500;
  color: #fff;
  position: relative;
}
.home{
  position: relative;
  background-image: url('/dixing.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  min-height: 750px;
  color: #fff;
  overflow: hidden;
  max-width: 1920px;
}
.home .wind_title{
  position: absolute;
  top: 70px;
  left: 150px;
}
.home .light_title{
  position: absolute;
  top: 24px;
  left: 990px;
}
.home .pbl_title{
  position: absolute;
  bottom:15px;
  right: 20px;
}
.fenche1 .zhuzi{
    background-image: url(/fengche1a.png);
    background-size: cover;
    background-repeat: no-repeat;
    height: 219px;
    width: 30px;
    position: absolute;
    top: 426px;
    left: 273px;
}
.fenche1 .fc{
  background-image: url('/fengche1b.png');
  background-size: cover;
  background-repeat: no-repeat;
  height: 205px;
  width: 235px;
  position: absolute;
  top: 304px;
  left: 176px;
  transform-origin:47.5% 64%;
  -webkit-transform-origin:47.5% 64%;
  -webkit-animation: fenche1 1.8s infinite linear;
  animation: fenche1 1.8s infinite linear;
}

/********风车1动画********/
@-webkit-keyframes fenche1{
  0%{
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
  }100%{
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
@keyframes fenche1{
  0%{
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
  }100%{
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
} 
/********风车1动画********/

.fenche2, .dengta{
  cursor: pointer;
}
.fenche2 .zhuzi{
  background-image: url('/fengche2b.png');
  background-size: cover;
  background-repeat: no-repeat;
  height: 153px;
  width: 20px;
  position: absolute;
  left: 494px;
  top: 396px;
}

.fenche2 .fc{
  background-image: url('/fengche2a.png');
  background-size: cover;
  background-repeat: no-repeat;
  height: 149px;
  width: 164px;
  position: absolute;
  top: 306px;
  left: 428px;
  transform-origin:47% 64.3%;
  -webkit-transform-origin:47% 64.3%;
  -webkit-animation: fenche2 1.5s infinite linear;
  animation: fenche2 1.5s infinite linear;
}

/********风车2动画********/
@-webkit-keyframes fenche2{
  0%{
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
  }100%{
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
@keyframes fenche2{
  0%{
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
  }100%{
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
} 
/********风车2动画********/

.fenche2 .box{
  background-image: url('/FC_kang.png');
  background-size: cover;
  background-repeat: no-repeat;
  width: 228px;
  height: 48px;
  position: absolute;
  top: 393px;
  left: 524px;
}
.fenche2 .box>p{
  margin-left: 45px;
  margin-top: 13px;
  font-size: 14px;
}
.fenche3 .zhuzi{
  background-image: url('/fengche3b.png');
  background-size: cover;
  background-repeat: no-repeat;
  height: 292px;
  width: 38px;
  position: absolute;
  left: 750px;
  top: 443px;
}
.fenche3 .fc{
  background-image: url('/fengche3a.png');
  background-size: cover;
  background-repeat: no-repeat;
  height: 244px;
  width: 259px;
  position: absolute;
  top: 307px;
  left: 646px;
  transform-origin:48% 62.5%;
  -webkit-transform-origin:48% 62.5%;
  -webkit-animation: fenche3 1.2s infinite linear;
  animation: fenche3 1.2s infinite linear;
}

/********风车3动画********/
@-webkit-keyframes fenche3{
  0%{
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
  }100%{
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
@keyframes fenche3{
  0%{
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
  }100%{
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
} 
/********风车3动画********/

.dengta .dt{
  background-image: url('/DT.png');
  background-size: cover;
  background-repeat: no-repeat;
  width: 58px;
  height: 210px;
  position: absolute;
  left: 1162px;
  top: 365px;
}
.dengta .light{
  background-image: url('/light.png');
  background-size: cover;
  background-repeat: no-repeat;
  width: 289px;
  height: 431px;
  position: absolute;
  top: 353px;
  left: 934px;
  transform-origin:88.5% 11%;
  -webkit-transform-origin: 88.5% 11%;
  animation: light 8s infinite linear;
  -webkit-animation: light 8s infinite linear;
}

/********灯塔动画********/
@-webkit-keyframes light{
  0%{
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
  }35%{
    transform: rotate(35deg);
    -webkit-transform: rotate(35deg);
  }70%{
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
  }100%{
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
}
@keyframes light{
  0%{
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
  }35%{
    transform: rotate(35deg);
    -webkit-transform: rotate(35deg);
  }70%{
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
  }100%{
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
}
/********灯塔动画********/

.dengta .box{
  background-image: url('/DT_kuang.png');
  background-size: cover;
  background-repeat: no-repeat;
  width: 368px;
  height: 137px;
  position: absolute;
  top: 310px;
  left: 803px;
}
.dengta .box p{
  font-size: 14px;
  margin-left: 30px;
  margin-bottom: 10px;
  margin-top:12px;
}
</style>
