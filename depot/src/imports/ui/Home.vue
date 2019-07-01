<template>
  <div class="home clearfloat">
    <!-- 左 -->
    <div>
      <div class="map">
        <div v-for="(item,index) in data" :key='index'>
          <!-- <div  class="point" :style="item.position">{{item.state}}</div> -->
          <div  :class="item.state=='true'?'points':'point'" :style="item.position" @click="showLog(index)"></div>
          <div :style="item.positions" :class="item.state=='true'?'ttt':'tt'" v-if="item.isshow">
            <p>车牌：{{item.no}}</p>
            <p>开始时间：{{item.time}}</p>
            <p>停车时间：{{item.hour}}小时</p>
          </div>
        </div>
        <div class="one">一区</div>
        <div class="two">二区</div>
      </div>
      <div class="total">
        <div class="top">
          <div>
            <p>今日车场停车总时间</p>
            <p>
              <img src="../top1.png" alt="">
              {{alltime}}h
            </p>
          </div>
          <div>
            <p>本周车场停车总时间</p>
            <p>
              <img src="../top2.png" alt="">
              {{alltime*7}}h
            </p>
          </div>
          <div>
            <p>本月车场停车总时间</p>
            <p>
              <img src="../top3.png" alt="">
              {{alltime*30}}h
            </p>
          </div>
        </div>
        <div class="bottom">
          <p>使用占比</p>
          <div class="pie" id="mychart" :style="{width: '160px', height: '160px'}"></div>
          <div class="pie" id="mycharts" :style="{width: '160px', height: '160px'}"></div>
          <!-- <div>
            <img src="../circle1.png" alt="">
            <p>一区</p>
            <p>62%</p>
          </div> -->
          <!-- <div>
            <img src="../circle2.png" alt="" style="margin-left:0px;">
            <p>二区</p>
            <p>75%</p>
          </div> -->
        </div>
      </div>
    </div>
    <!-- 右 -->
    <div>
      <!-- 剩余 -->
      <div class="rest">
        <div class="rest1">
          <div>
            <p>车位剩余</p>
            <p>{{clear.length}}</p>
          </div>
        </div>
        <div class="rest2">
          <div>
            <p>一区剩余</p>
            <p>{{rest.length}}</p>
          </div>
          <div>
            <p>二区剩余</p>
            <p>{{clear.length-rest.length}}</p>
          </div>
        </div>
      </div>
      <!-- tips -->
      <div class="pic">    
        <div id="chart" :style="{width: '450px', height: '340px',margin:'30px'}"></div> 
      </div>
    </div>
  </div>
</template>

<script>
// import { Meteor } from 'meteor/meteor'
export default {
  data () {
    return {
      clear:[
        // {position:'position:absolute;left:221px;top:76px;',state:false,no:'A001'},
        // {position:'position:absolute;left:217px;top:200px;',state:false,no:'A003'},
      ],
      rest:[],
      all:[],
      alltime:100,
      echartData:[
        [20,22,35,9,38,42,23,37,7,28,22,20,9],
        [10,3,24,50,32,6,35,13,11,8,24,33,20],
        [3,25,19,22,36,13,45,17,6,25,9,26,35]
      ],
      allma: [20,22,35,9,38,42,23,37,7,28,22,20,9],
      num:0,
      percent1:50,
      percent2:50,
      data:[
        {position:'position:absolute;left:75px;top:150px;',positions:'position:absolute;left:85px;top:-20px;',state:'true',no:'豫A888888',isshow:false,time:'08:23',hour:3,area:1},
        {position:'position:absolute;left:106px;top:150px;',positions:'position:absolute;left:116px;top:-20px;',state:'true',no:'宁D985647',isshow:false,time:'08:00',hour:4,area:1},
        {position:'position:absolute;left:137px;top:150px;',positions:'position:absolute;left:147px;top:-20px;',state:'true',no:'粤F346890',isshow:false,time:'18:03',hour:16,area:1},
        {position:'position:absolute;left:168px;top:150px;',positions:'position:absolute;left:178px;top:-20px;',state:'false',no:'粤F278964',isshow:false,time:'10:03',hour:2,area:1},
        {position:'position:absolute;left:199px;top:150px;',positions:'position:absolute;left:209px;top:-20px;',state:'true',no:'京AW23456',isshow:false,time:'02:03',hour:10,area:1},
        {position:'position:absolute;left:230px;top:150px;',positions:'position:absolute;left:240px;top:-20px;',state:'false',no:'京A768907',isshow:false,time:'11:03',hour:1,area:1},
        {position:'position:absolute;left:292px;top:150px;',positions:'position:absolute;left:302px;top:-20px;',state:'true',no:'津H098765',isshow:false,time:'10:30',hour:2,area:2},
        {position:'position:absolute;left:323px;top:150px;',positions:'position:absolute;left:333px;top:-20px;',state:'true',no:'津BA39578',isshow:false,time:'7:30',hour:5,area:2},
        {position:'position:absolute;left:354px;top:150px;',positions:'position:absolute;left:364px;top:-20px;',state:'true',no:'沪G278964',isshow:false,time:'9:30',hour:4,area:2},
        {position:'position:absolute;left:385px;top:150px;',positions:'position:absolute;left:395px;top:-20px;',state:'true',no:'渝B907643',isshow:false,time:'19:30',hour:15,area:2},
        {position:'position:absolute;left:416px;top:150px;',positions:'position:absolute;left:426px;top:-20px;',state:'true',no:'川V384Y52',isshow:false,time:'8:30',hour:5,area:2},
        {position:'position:absolute;left:447px;top:150px;',positions:'position:absolute;left:457px;top:-20px;',state:'false',no:'闽JJ39475',isshow:false,time:'10:30',hour:2,area:2},
        {position:'position:absolute;left:50px;top:270px;',positions:'position:absolute;left:60px;top:100px;',state:'true',no:'陕GU89035',isshow:false,time:'10:30',hour:2,area:1},
        {position:'position:absolute;left:81px;top:270px;',positions:'position:absolute;left:91px;top:100px;',state:'false',no:'晋LD63838',isshow:false,time:'6:08',hour:6,area:1},
        {position:'position:absolute;left:112px;top:270px;',positions:'position:absolute;left:122px;top:100px;',state:'true',no:'蒙B382Q35',isshow:false,time:'2:00',hour:10,area:1},
        {position:'position:absolute;left:143px;top:270px;',positions:'position:absolute;left:153px;top:100px;',state:'true',no:'蒙A098L76',isshow:false,time:'4:13',hour:8,area:1},
        {position:'position:absolute;left:174px;top:270px;',positions:'position:absolute;left:184px;top:100px;',state:'true',no:'鄂E7056A2',isshow:false,time:'5:37',hour:6,area:1},
        {position:'position:absolute;left:205px;top:270px;',positions:'position:absolute;left:215px;top:100px;',state:'true',no:'鲁L432J09',isshow:false,time:'10:20',hour:2,area:1},
        {position:'position:absolute;left:326px;top:270px;',positions:'position:absolute;left:336px;top:100px;',state:'false',no:'鲁BU89035',isshow:false,time:'11:30',hour:1,area:2},
        {position:'position:absolute;left:357px;top:270px;',positions:'position:absolute;left:367px;top:100px;',state:'true',no:'黑GD63838',isshow:false,time:'7:08',hour:5,area:2},
        {position:'position:absolute;left:388px;top:270px;',positions:'position:absolute;left:398px;top:100px;',state:'true',no:'辽B382Q35',isshow:false,time:'3:00',hour:9,area:2},
        {position:'position:absolute;left:419px;top:270px;',positions:'position:absolute;left:429px;top:100px;',state:'false',no:'云P098L76',isshow:false,time:'9:32',hour:3,area:2},
        {position:'position:absolute;left:450px;top:270px;',positions:'position:absolute;left:460px;top:100px;',state:'true',no:'冀A7056A2',isshow:false,time:'8:37',hour:4,area:2},
        {position:'position:absolute;left:481px;top:270px;',positions:'position:absolute;left:491px;top:100px;',state:'true',no:'皖G432J09',isshow:false,time:'5:20',hour:7,area:2},
      ]
    }
  },
  mounted(){
    this.echarts = require('echarts');
    this.draw();
    setInterval(()=>{  
      this.data=[
        {position:'position:absolute;left:75px;top:150px;',positions:'position:absolute;left:85px;top:-20px;',state:Math.random()>0.5?'true':'false',no:'豫A888888',isshow:false,time:'08:23',hour:3,area:1},
        {position:'position:absolute;left:106px;top:150px;',positions:'position:absolute;left:116px;top:-20px;',state:Math.random()>0.5?'true':'false',no:'宁D985647',isshow:false,time:'08:00',hour:4,area:1},
        {position:'position:absolute;left:137px;top:150px;',positions:'position:absolute;left:147px;top:-20px;',state:Math.random()>0.5?'true':'false',no:'粤F346890',isshow:false,time:'18:03',hour:16,area:1},
        {position:'position:absolute;left:168px;top:150px;',positions:'position:absolute;left:178px;top:-20px;',state:Math.random()>0.5?'true':'false',no:'粤F278964',isshow:false,time:'10:03',hour:2,area:1},
        {position:'position:absolute;left:199px;top:150px;',positions:'position:absolute;left:209px;top:-20px;',state:Math.random()>0.5?'true':'false',no:'京AW23456',isshow:false,time:'02:03',hour:10,area:1},
        {position:'position:absolute;left:230px;top:150px;',positions:'position:absolute;left:240px;top:-20px;',state:Math.random()>0.5?'true':'false',no:'京A768907',isshow:false,time:'11:03',hour:1,area:1},
        {position:'position:absolute;left:292px;top:150px;',positions:'position:absolute;left:302px;top:-20px;',state:Math.random()>0.5?'true':'false',no:'津H098765',isshow:false,time:'10:30',hour:2,area:2},
        {position:'position:absolute;left:323px;top:150px;',positions:'position:absolute;left:333px;top:-20px;',state:Math.random()>0.5?'true':'false',no:'津BA39578',isshow:false,time:'7:30',hour:5,area:2},
        {position:'position:absolute;left:354px;top:150px;',positions:'position:absolute;left:364px;top:-20px;',state:Math.random()>0.5?'true':'false',no:'沪G278964',isshow:false,time:'9:30',hour:4,area:2},
        {position:'position:absolute;left:385px;top:150px;',positions:'position:absolute;left:395px;top:-20px;',state:Math.random()>0.5?'true':'false',no:'渝B907643',isshow:false,time:'19:30',hour:15,area:2},
        {position:'position:absolute;left:416px;top:150px;',positions:'position:absolute;left:426px;top:-20px;',state:Math.random()>0.5?'true':'false',no:'川V384Y52',isshow:false,time:'8:30',hour:5,area:2},
        {position:'position:absolute;left:447px;top:150px;',positions:'position:absolute;left:457px;top:-20px;',state:Math.random()>0.5?'true':'false',no:'闽JJ39475',isshow:false,time:'10:30',hour:2,area:2},
        {position:'position:absolute;left:50px;top:270px;',positions:'position:absolute;left:60px;top:100px;',state:Math.random()>0.5?'true':'false',no:'陕GU89035',isshow:false,time:'10:30',hour:2,area:1},
        {position:'position:absolute;left:81px;top:270px;',positions:'position:absolute;left:91px;top:100px;',state:Math.random()>0.5?'true':'false',no:'晋LD63838',isshow:false,time:'6:08',hour:6,area:1},
        {position:'position:absolute;left:112px;top:270px;',positions:'position:absolute;left:122px;top:100px;',state:Math.random()>0.5?'true':'false',no:'蒙B382Q35',isshow:false,time:'2:00',hour:10,area:1},
        {position:'position:absolute;left:143px;top:270px;',positions:'position:absolute;left:153px;top:100px;',state:Math.random()>0.5?'true':'false',no:'蒙A098L76',isshow:false,time:'4:13',hour:8,area:1},
        {position:'position:absolute;left:174px;top:270px;',positions:'position:absolute;left:184px;top:100px;',state:Math.random()>0.5?'true':'false',no:'鄂E7056A2',isshow:false,time:'5:37',hour:6,area:1},
        {position:'position:absolute;left:205px;top:270px;',positions:'position:absolute;left:215px;top:100px;',state:Math.random()>0.5?'true':'false',no:'鲁L432J09',isshow:false,time:'10:20',hour:2,area:1},
        {position:'position:absolute;left:326px;top:270px;',positions:'position:absolute;left:336px;top:100px;',state:Math.random()>0.5?'true':'false',no:'鲁BU89035',isshow:false,time:'11:30',hour:1,area:2},
        {position:'position:absolute;left:357px;top:270px;',positions:'position:absolute;left:367px;top:100px;',state:Math.random()>0.5?'true':'false',no:'黑GD63838',isshow:false,time:'7:08',hour:5,area:2},
        {position:'position:absolute;left:388px;top:270px;',positions:'position:absolute;left:398px;top:100px;',state:Math.random()>0.5?'true':'false',no:'辽B382Q35',isshow:false,time:'3:00',hour:9,area:2},
        {position:'position:absolute;left:419px;top:270px;',positions:'position:absolute;left:429px;top:100px;',state:Math.random()>0.5?'true':'false',no:'云P098L76',isshow:false,time:'9:32',hour:3,area:2},
        {position:'position:absolute;left:450px;top:270px;',positions:'position:absolute;left:460px;top:100px;',state:Math.random()>0.5?'true':'false',no:'冀A7056A2',isshow:false,time:'8:37',hour:4,area:2},
        {position:'position:absolute;left:481px;top:270px;',positions:'position:absolute;left:491px;top:100px;',state:Math.random()>0.5?'true':'false',no:'皖G432J09',isshow:false,time:'5:20',hour:7,area:2},
      ],
      this.num<2?this.num++:this.num=0;
      this.allma=this.echartData[this.num];
      this.clear=[];
      this.all=[];
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].state=='false'){
          if(this.clear.indexOf(this.data[i]) == -1){
            this.clear.push(this.data[i]);
          }
        }else{
          this.all.push(this.data[i]);
        }
      }
      this.rest=[];
      this.alltime=0;
      for(let j=0;j<this.clear.length;j++){
        if(this.clear[j].area==1){
          this.rest.push(this.clear[j]);
        }
      }
      for(let k=0;k<this.all.length;k++){
        this.alltime+=this.all[k].hour;
      }
      this.percent1=(((12-this.rest.length)/12)*100).toFixed(0);
      this.percent2=(((12-this.clear.length+this.rest.length)/12)*100).toFixed(0);
      this.draw();
    },6000);
    this.getRest();
  },
  watch:{
    
  },
  methods: {
    draw(){
      this.chart =  this.echarts.init(document.getElementById('chart'))
        // 绘制图表
        this.option={
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['0:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00','12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
              axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#09D1C9'
                    }
              },
              name:'时间',
              axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#09D1C9',
                   }
               },
          },
          yAxis: {
              min: 0,
              max: 50,
              type: 'value',
              axisLabel: {
                  show: true,
                  textStyle: {
                      color: '#09D1C9'
                  }
              },
              name:'车辆',
              axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#09D1C9',
                   }
               },
          },
          series: [{
              data: this.allma,
              type: 'line',
              areaStyle: {},
              itemStyle : {
                normal : {
                  color:'#09D1C9',
                  lineStyle:{
                    color:'#09D1C9'
                  }
                }
              },
          }]
        };
        this.chart.setOption(this.option);

        // pie
        this.mychart = this.echarts.init(document.getElementById('mychart'));
        let options = {
            grid: {
                top: 5,
                bottom: 5,
            },
            color: ['#FF0391', 'rgba(28,80,78,.8)'],
            series: [{
                name: 'valueOfMarket',
                type: 'pie',
                center: ['50%', '50%'], // 饼图的圆心坐标
                radius: [40, 52],
                avoidLabelOverlap: false,
                hoverAnimation: false,
                label: { //  饼图图形上的文本标签
                    normal: { // normal 是图形在默认状态下的样式
                        show: true,
                        position: 'center',
                        color: '#09D1C9',
                        fontSize: 14,
                        fontWeight: 'bold',
                        formatter: '{b}\n{c}%' // {b}:数据名； {c}：数据值； {d}：百分比
                    }
                },
                data: [
                    {
                        value: this.percent1,
                        name: '一区',
                        label: {
                            normal: {
                                show: true
                            }
                        }
                    },
                    {
                        value: 100 - this.percent1,
                        name: '',
                        label: {
                            normal: {
                            show: false
                            }
                        }
                    }
                ]
            }]
        }
        this.mychart.setOption(options);
        // 二区
        this.mycharts = this.echarts.init(document.getElementById('mycharts'));
        let optionss = {
            grid: {
                top: 5,
                bottom: 5,
            },
            color: ['#FF035C', 'rgba(28,80,78,.8)'],
            series: [{
                name: 'valueOfMarket',
                type: 'pie',
                center: ['50%', '50%'], // 饼图的圆心坐标
                radius: [40, 52],
                avoidLabelOverlap: false,
                hoverAnimation: false,
                label: { //  饼图图形上的文本标签
                    normal: { // normal 是图形在默认状态下的样式
                        show: true,
                        position: 'center',
                        color: '#09D1C9',
                        fontSize: 14,
                        fontWeight: 'bold',
                        formatter: '{b}\n{c}%' // {b}:数据名； {c}：数据值； {d}：百分比
                    }
                },
                data: [
                    {
                        value: this.percent2,
                        name: '二区',
                        label: {
                            normal: {
                                show: true
                            }
                        }
                    },
                    {
                        value: 100 - this.percent2,
                        name: '',
                        label: {
                            normal: {
                            show: false
                            }
                        }
                    }
                ]
            }]
        }
        this.mycharts.setOption(optionss);
    },
    getRest(){
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].state=='false'){
          if(this.clear.indexOf(this.data[i]) == -1){
            this.clear.push(this.data[i]);
          }else{
            this.all.push(this.data[i]);
          }
        }
      };
      for(let j=0;j<this.clear.length;j++){
        if(this.clear[j].area==1){
          this.rest.push(this.clear[j]);
        }
      };
      for(let k=0;k<this.all.length;k++){
        this.alltime+=this.all[k].hour;
      }
      this.percent1=(((12-this.rest.length)/12)*100).toFixed(0);
      this.percent2=(((12-this.clear.length+this.rest.length)/12)*100).toFixed(0);
    },
    // 显示状态
    showLog(index){
      this.data[index].isshow=true;
      setTimeout(()=>{
        this.data[index].isshow=false;
      },3000);
    },
  },
}
</script>


<style lang="less">
body{
  background-color: #212121;
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
  background-image: url(../map.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 650px;
  height: 339px;
}
.rest{
  margin-left: 50px;
  position: relative;
  top: -20px;
}
.rest div{
  color: #09D1C9;
}
.rest1{
  background-image: url(../loop_1.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 426px;
  height: 154px;
  font-size:24px;
  margin: 40px 0 0 10px;
}
.rest1>div{
  padding:22px 0 0 110px;
}
.rest1>div>p:first-child{
  margin-bottom: 10px;
}
.rest1>div>p:last-child{
  margin-top: 10px;
}
.rest2{
  width: 468px;
  margin-top: 60px;
}
.rest2>div{
  display: inline-block;
  background-image: url(../loop_2.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 183px;
  height: 80px;
  margin: 0 15px;
}
.rest2>div>p{
  text-indent:50px;
  margin: 5px 0;
}
.rest2>div>p:first-child{
  margin-top: 18px;
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
  width: 20px;
  height: 46px;
  background-image: url(../car.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.green{
color:#03A0E6;
}

.lightgrey{ /*浅灰色显示过去的日期*/
color:#a8a8a8;
}   
.darkgrey{ /*深灰色显示将来的日期*/
color:#565656;
}

.tips{
  width: 471px;
  height: 363px;
  background-image: url(../news.png);
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: 62px;
  text-align: left;
  padding: 10px 0 0 30px;
  color: #fff;
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
.tips img{
  position: relative;
  top: 2px;
  margin-right: 5px;
}
.tips>div{
  margin-top: 10px;
}
.tips>div>span{
  color: red;
  margin: 0 20px 0 0px;
}
.cimg{
  margin-left: 150px;
}
.cimg:hover{
  filter: grayscale(100%); 
  opacity: 0.6;
}
.tt{
  width: 181px;
  height: 167px;
  background: url(../tt.png) no-repeat;
  color: #fff;
  padding-left: 30px;
}
.ttt{
  width: 181px;
  height: 167px;
  background: url(../tt.png) no-repeat;
  color: #fff;
  padding-left: 30px;
}
.ttt>p{
  font-size: 13px;
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
.one{
  color:#393939;
  position: absolute;
  top: 210px;
  font-size: 35px;
  left: 140px;
}
.two{
  color:#393939;
  position: absolute;
  top: 210px;
  font-size: 35px;
  left: 380px;
}
.pie {
    width:100px;
    height:100px;
    margin: 0 auto;
}

</style>
