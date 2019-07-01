<template>
  <div class="home clearfloat">
    <!-- 左 -->
    <div class="map">
      <div v-for="(item,index) in data" :key='index'>
        <div :style="item.position" @click="showLog(index)">
          <img :src="item.state?item.pic:item.bpic">
        </div>
      </div>
      <!-- 浇水gif -->
      <div v-if="plants.length>0" >
        <div v-for="(item,index) in plants" :key='index'>
          <img :src="picurl" alt="" :style="item.waterPosition">
        </div>
      </div>
    </div>
    <!-- 右 -->
    <div class="right">
      <!-- time -->
      <div class="time">
        <p>{{year}}-{{month}}-{{day}}</p>
        <div class="wOne">
          <img src="../weather.png" alt="">
          <span style="vertical-align:super;">15°</span>
          <img src="../pm.png" alt="" style="margin-left:100px;">
          <span style="position:relative;left: -72px;top: -7px;color:#2D6E86;">PM2.5</span>
          <span style="position:relative;left: -50px;top: -7px;font-size:16px;">良</span>
        </div>
        <div class="wTip">
          <span>空气温度：13°</span>
          <span style="margin-left:87px;">空气湿度：43 %RH</span>
        </div>
      </div>
      <!-- tips -->
      <div class="tips">
        <img :src="pic" alt="" :style="positions">
        <p>植物状态：{{state?'健康':'不健康'}}</p>
        <p>
          <span>土壤温度：{{tp}}°</span>
          <span style="margin-left:50px;">土壤湿度：{{hy}}%</span>
        </p>
        <div class="watering">
          <img :src="state?'../wateringd.png':'../watering.png'" alt="" :class="state?'':'imgs'" @click="waterPlant()">
          <p>浇水</p>
        </div>
      </div>
      <!-- water -->
      <div class="water">
        <span>一键浇水:</span>
        <img :src="clear.length>0?'../wateringbh.png':'../wateringb.png'" :class="clear.length>0?'imgs':''" alt="" @click="waterAll()">
      </div>
    </div>
    <!-- 表格 -->
    <div class="tb">    
      <div id="chart" :style="{width: '1150px', height: '300px',margin:'30px'}"></div> 
      <div id="charts" :style="{width: '1150px', height: '300px',margin:'30px'}"></div> 
    </div>
  </div>
</template>

<script>
// import { Meteor } from 'meteor/meteor'
export default {
  data () {
    return {
      clear:[
        {position:'position:absolute;left:590px;top:74px;',waterPosition:'position:absolute;left:570px;top:24px;',positions:'position:absolute;top:0px;left:-13px;',state:false,isshow:false,pic:'../1.png',bpic:'../1h.png',tp:10,hy:17},
        {position:'position:absolute;left:630px;top:130px;',waterPosition:'position:absolute;left:610px;top:80px;',positions:'position:absolute;top:6px;left:-16px;',state:false,isshow:false,pic:'../3.png',bpic:'../3h.png',tp:11,hy:16},
        {position:'position:absolute;left:625px;top:308px;',waterPosition:'position:absolute;left:605px;top:258px;',positions:'position:absolute;top:6px;left:-16px;',state:false,isshow:false,pic:'../3.png',bpic:'../3h.png',tp:11,hy:16},
        {position:'position:absolute;left:300px;top:422px;',waterPosition:'position:absolute;left:280px;top:372px;',positions:'position:absolute;top:6px;left:-16px;',state:false,isshow:false,pic:'../3.png',bpic:'../3h.png',tp:12,hy:16},
      ],
      data:[
        {position:'position:absolute;left:590px;top:74px;',waterPosition:'position:absolute;left:570px;top:24px;',positions:'position:absolute;top:0px;left:-13px;',state:false,isshow:false,pic:'../1.png',bpic:'../1h.png',tp:10,hy:17},
        {position:'position:absolute;left:630px;top:70px;',waterPosition:'position:absolute;left:610px;top:20px;',positions:'position:absolute;top:0px;left:-14px;',state:true,isshow:false,pic:'../2.png',bpic:'../2h.png',tp:12,hy:15},
        {position:'position:absolute;left:630px;top:130px;',waterPosition:'position:absolute;left:610px;top:80px;',positions:'position:absolute;top:6px;left:-16px;',state:false,isshow:false,pic:'../3.png',bpic:'../3h.png',tp:11,hy:16},
        {position:'position:absolute;left:615px;top:180px;',waterPosition:'position:absolute;left:595px;top:130px;',positions:'position:absolute;top:0px;left:-26px;',state:true,isshow:false,pic:'../4.png',bpic:'../4h.png',tp:10,hy:17},
        {position:'position:absolute;left:620px;top:230px;',waterPosition:'position:absolute;left:600px;top:180px;',positions:'position:absolute;top:-10px;left:-22px;',state:true,isshow:false,pic:'../5.png',bpic:'../5h.png',tp:12,hy:18},
        {position:'position:absolute;left:625px;top:308px;',waterPosition:'position:absolute;left:605px;top:258px;',positions:'position:absolute;top:6px;left:-16px;',state:false,isshow:false,pic:'../3.png',bpic:'../3h.png',tp:11,hy:16},
        {position:'position:absolute;left:574px;top:250px;',waterPosition:'position:absolute;left:554px;top:200px;',positions:'position:absolute;top:-34px;left:-18px;',state:true,isshow:false,pic:'../6.png',bpic:'../6h.png',tp:10,hy:13},
        {position:'position:absolute;left:66px;top:125px;',waterPosition:'position:absolute;left:46px;top:75px;',positions:'position:absolute;top:-12px;left:-26px;',state:true,isshow:false,pic:'../7.png',bpic:'../7h.png',tp:12,hy:15},
        {position:'position:absolute;left:70px;top:20px;',waterPosition:'position:absolute;left:50px;top:-30px;',positions:'position:absolute;top:-33px;left:-22px;',state:true,isshow:false,pic:'../8.png',bpic:'../8h.png',tp:11,hy:14},
        {position:'position:absolute;left:260px;top:410px;',waterPosition:'position:absolute;left:240px;top:360px;',positions:'position:absolute;top:0px;left:-14px;',state:true,isshow:false,pic:'../2.png',bpic:'../2h.png',tp:10,hy:17},
        {position:'position:absolute;left:300px;top:422px;',waterPosition:'position:absolute;left:280px;top:372px;',positions:'position:absolute;top:6px;left:-16px;',state:false,isshow:false,pic:'../3.png',bpic:'../3h.png',tp:12,hy:16},
        {position:'position:absolute;left:346px;top:416px;',waterPosition:'position:absolute;left:326px;top:366px;',positions:'position:absolute;top:0px;left:-26px;',state:true,isshow:false,pic:'../4.png',bpic:'../4h.png',tp:11,hy:14},
        {position:'position:absolute;left:410px;top:386px;',waterPosition:'position:absolute;left:390px;top:336px;',positions:'position:absolute;top:-10px;left:-22px;',state:true,isshow:false,pic:'../5.png',bpic:'../5h.png',tp:12,hy:17},
      ],
      year:'',
      month:'',
      day:'',
      daysOfMonth:[],
      tmp:[],
      hyy:[],
      tp:11,
      hy:14,
      no:8,
      state:true,
      pic:'../8.png',
      positions:'position:absolute;top:-33px;left:-22px;',
      plants:[],
      picurl:'../gif.gif',
      changeData:false
    }
  },
  mounted(){
    this.createMonthDay();
    this.echarts = require('echarts');
    this.buildData();
    this.draw();
    this.getNeedClear();
  },
  watch:{
    'data':function getNeedClear(){
      this.clear=[];
      for(let i=0;i<this.data.length;i++){
        if(!this.data[i].state){
          if(this.clear.indexOf(this.data[i]) == -1){
            this.clear.push(this.data[i]);
          }
        }
      }
    },
    'plants':{
      handler(){
        this.picurl='../gif.gif?'+new Date().getTime();
        this.clear=[];
        for(let i=0;i<this.data.length;i++){
          if(!this.data[i].state){
            if(this.clear.indexOf(this.data[i]) == -1){
              this.clear.push(this.data[i]);
            }
          }
        }
      },
      // 页面加载之初先执行一次handle
      immediate: true,
      // 深度检查属性,即使对象内部的属性值改变, 也能检测到(比较消耗性能)
      deep: true
    },
    'clear':{
      handler(){
        this.changeData=this.data.every( item => item.state === true);
        if(this.changeData){
          setTimeout(()=>{
            this.data=[
              {position:'position:absolute;left:590px;top:74px;',waterPosition:'position:absolute;left:570px;top:24px;',positions:'position:absolute;top:0px;left:-13px;',state:Math.random()>0.5,isshow:false,pic:'../1.png',bpic:'../1h.png',tp:Math.ceil(Math.random()*15),hy:Math.ceil(Math.random()*30)},
              {position:'position:absolute;left:630px;top:70px;',waterPosition:'position:absolute;left:610px;top:20px;',positions:'position:absolute;top:0px;left:-14px;',state:Math.random()>0.5,isshow:false,pic:'../2.png',bpic:'../2h.png',tp:Math.ceil(Math.random()*15),hy:Math.ceil(Math.random()*30)},
              {position:'position:absolute;left:630px;top:130px;',waterPosition:'position:absolute;left:610px;top:80px;',positions:'position:absolute;top:6px;left:-16px;',state:Math.random()>0.5,isshow:false,pic:'../3.png',bpic:'../3h.png',tp:Math.ceil(Math.random()*15),hy:Math.ceil(Math.random()*30)},
              {position:'position:absolute;left:615px;top:180px;',waterPosition:'position:absolute;left:595px;top:130px;',positions:'position:absolute;top:0px;left:-26px;',state:Math.random()>0.5,isshow:false,pic:'../4.png',bpic:'../4h.png',tp:Math.ceil(Math.random()*15),hy:Math.ceil(Math.random()*30)},
              {position:'position:absolute;left:620px;top:230px;',waterPosition:'position:absolute;left:600px;top:180px;',positions:'position:absolute;top:-10px;left:-22px;',state:Math.random()>0.5,isshow:false,pic:'../5.png',bpic:'../5h.png',tp:Math.ceil(Math.random()*15),hy:Math.ceil(Math.random()*30)},
              {position:'position:absolute;left:625px;top:308px;',waterPosition:'position:absolute;left:605px;top:258px;',positions:'position:absolute;top:6px;left:-16px;',state:Math.random()>0.5,isshow:false,pic:'../3.png',bpic:'../3h.png',tp:Math.ceil(Math.random()*15),hy:Math.ceil(Math.random()*30)},
              {position:'position:absolute;left:574px;top:250px;',waterPosition:'position:absolute;left:554px;top:200px;',positions:'position:absolute;top:-34px;left:-18px;',state:Math.random()>0.5,isshow:false,pic:'../6.png',bpic:'../6h.png',tp:Math.ceil(Math.random()*15),hy:Math.ceil(Math.random()*30)},
              {position:'position:absolute;left:66px;top:125px;',waterPosition:'position:absolute;left:46px;top:75px;',positions:'position:absolute;top:-12px;left:-26px;',state:Math.random()>0.5,isshow:false,pic:'../7.png',bpic:'../7h.png',tp:Math.ceil(Math.random()*15),hy:Math.ceil(Math.random()*30)},
              {position:'position:absolute;left:70px;top:20px;',waterPosition:'position:absolute;left:50px;top:-30px;',positions:'position:absolute;top:-33px;left:-22px;',state:Math.random()>0.5,isshow:false,pic:'../8.png',bpic:'../8h.png',tp:Math.ceil(Math.random()*15),hy:Math.ceil(Math.random()*30)},
              {position:'position:absolute;left:260px;top:410px;',waterPosition:'position:absolute;left:240px;top:360px;',positions:'position:absolute;top:0px;left:-14px;',state:Math.random()>0.5,isshow:false,pic:'../2.png',bpic:'../2h.png',tp:Math.ceil(Math.random()*15),hy:Math.ceil(Math.random()*30)},
              {position:'position:absolute;left:300px;top:422px;',waterPosition:'position:absolute;left:280px;top:372px;',positions:'position:absolute;top:6px;left:-16px;',state:Math.random()>0.5,isshow:false,pic:'../3.png',bpic:'../3h.png',tp:Math.ceil(Math.random()*15),hy:Math.ceil(Math.random()*30)},
              {position:'position:absolute;left:346px;top:416px;',waterPosition:'position:absolute;left:326px;top:366px;',positions:'position:absolute;top:0px;left:-26px;',state:Math.random()>0.5,isshow:false,pic:'../4.png',bpic:'../4h.png',tp:Math.ceil(Math.random()*15),hy:Math.ceil(Math.random()*30)},
              {position:'position:absolute;left:410px;top:386px;',waterPosition:'position:absolute;left:390px;top:336px;',positions:'position:absolute;top:-10px;left:-22px;',state:Math.random()>0.5,isshow:false,pic:'../5.png',bpic:'../5h.png',tp:Math.ceil(Math.random()*15),hy:Math.ceil(Math.random()*30)},
            ],
            this.state=this.data[this.no].state;
            this.tp=this.data[this.no].tp;
            this.hy=this.data[this.no].hy;
            this.buildData();
            this.draw();
          },5000)
        }
      },
      // 页面加载之初先执行一次handle
      immediate: true,
      // 深度检查属性,即使对象内部的属性值改变, 也能检测到(比较消耗性能)
      deep: true
    }
  },
  methods: {
    // 生成表格数据
    buildData(){
      // 温度
      this.tmp = [];
      while (this.tmp.length < this.daysOfMonth.length)
      {
        var random = Math.ceil(Math.random() * 15);
        this.tmp.push(random);
      }
      // 湿度
      this.hyy = [];
      while (this.hyy.length < this.daysOfMonth.length)
      {
        var randoms = Math.ceil(Math.random() * 40);
        this.hyy.push(randoms);
      }
    },
    // 浇所有
    waterAll(){
      if(this.clear.length>0){
        this.plants=[];
        this.plants=this.clear;
        setTimeout(()=>{
          this.plants=[];
          this.data.map((v)=>{
            v.state=true;
          });
          if(!this.state){
            this.state=true;
            this.tp+=2;
            this.hy+=8;
          }
          this.clear.map((c)=>{
            c.tp+=2;
            c.hy+=8;
          });
        },2000);
      }
    },
    // 浇水
    waterPlant(){
      if(!this.state){
        this.plants=[];
        this.plants.push(this.data[this.no]);
        setTimeout(()=>{
          this.state=true;
          this.tp+=2;
          this.hy+=8;
          this.data[this.no].state=true;
          this.data[this.no].tp+=2;
          this.data[this.no].hy+=8;
          this.plants=[];
        },2000);
      }
    },
    draw(){
      this.chart =  this.echarts.init(document.getElementById('chart'))
      // 绘制图表
      this.option={
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.daysOfMonth,
            axisLabel: {
              show: true,
              // interval: 0,
              textStyle: {
                  color: '#fff'
              }
            },
            name:'',
            axisLine: {
              lineStyle: {
                  type: 'solid',
                  color:'#fff',
              }
              },
        },
        yAxis: {
            min: 0,
            max: 40,
            type: 'value',
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff'
                }
            },
            name:'温度（°）',
            axisLine: {
                  lineStyle: {
                      type: 'solid',
                      color:'#fff',
                  }
              },
        },
        series: [{
            data: this.tmp,
            type: 'line',
            smooth: true,
            itemStyle : {
              normal : {
                color:'#fff',
                lineStyle:{
                  color:'#FEF565'
                }
              }
            },
        }]
      };
      this.chart.setOption(this.option);
      this.charts =  this.echarts.init(document.getElementById('charts'))
      // 绘制图表
      this.options={
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.daysOfMonth,
            axisLabel: {
              show: true,
              // interval: 0,
              textStyle: {
                  color: '#fff'
              }
            },
            name:'',
            axisLine: {
              lineStyle: {
                  type: 'solid',
                  color:'#fff',
              }
              },
        },
        yAxis: {
            min: 0,
            max: 80,
            type: 'value',
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff'
                }
            },
            name:'空气湿度（%RH）',
            axisLine: {
                  lineStyle: {
                      type: 'solid',
                      color:'#fff',
                  }
              },
        },
        series: [{
            data: this.hyy,
            type: 'line',
            smooth: true,
            itemStyle : {
              normal : {
                color:'#fff',
                lineStyle:{
                  color:'#FA324F'
                }
              }
            },
        }]
      };
      this.charts.setOption(this.options);
    },
    getNeedClear(){
      for(let i=0;i<this.data.length;i++){
        if(!this.data[i].state){
          if(this.clear.indexOf(this.data[i]) == -1){
            this.clear.push(this.data[i]);
          }
        }
      }
    },
    // 显示状态
    showLog(index){
      this.no=index;
      this.tp=this.data[index].tp;
      this.hy=this.data[index].hy;
      this.state=this.data[index].state;
      this.pic=this.data[index].pic;
      this.positions=this.data[index].positions;
      // this.data[index].isshow=true;
      // setTimeout(()=>{
      //   this.data[index].isshow=false;
      // },3000);
    },
    // 删除
    deleteIt(no){
      for(let j=0;j<this.clear.length;j++){
        if(this.clear[j].no==no){
          this.clear.splice(j,1);
        }
      }
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].no==no){
          this.data[i].state='true';
        }
      }
    },
    // 获取当月时间
    createMonthDay() {
        this.year=new Date().getFullYear();
        this.month=new Date().getMonth();
        this.day=new Date().getDate();
        let fullYear = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let lastDayOfMonth = new Date(fullYear, month, 0).getDate();
        for (var i = 1; i <= lastDayOfMonth; i++) {
            this.daysOfMonth.push(fullYear + '/' + month + '/' + i);
        };
    }
  },
}
</script>


<style lang="less">
body{
  background-image: url(../bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
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
  width: 676px;
  height: 476px;
  margin: 0;
}
.time{
  color: #fff;
  font-size: 20px;
}
.time>p{
  margin:0;
}
.wOne{
  margin-top: 16px;
}
.wTip{
  font-size: 18px;
  margin: 20px auto 50px;
}
main{
  background-color: transparent;
  width: 1200px !important;
  padding: 0 !important;
  min-width: 1200px !important;
  margin: 10px auto 0 !important;
  height: 670px;
}
.tips{
  width: 406px;
  height: 178px;
  background-image: url(../news.png);
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: 50px;
  text-align: left;
  padding: 10px 0 0 30px;
  color: #fff;
  position: relative;
  font-size: 18px;
}
.watering{
  text-align: center;
}
.watering>p{
  margin-top: 0px;
  font-size: 15px;
}
.imgs{
  -webkit-transition: -webkit-transform 1s;
  -moz-transition: -moz-transform 1s;
  -o-transition: -o-transform 1s;
  transition: transform 1s;
}
.imgs:hover{
   -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -ms-transform: scale(1.2);
  -o-transform: scale(1.2);
  transform: scale(1.2);
}
.imgs:active{
  transform:rotate(-45deg);
  -ms-transform:rotate(-45deg);
  -moz-transform:rotate(-45deg);
  -webkit-transform:rotate(-45deg);
  -o-transform:rotate(-45deg);
}
.water{
  margin-top: 40px;
  font-size: 24px;
  color: #fff;
  text-align: left;
  padding-left: 52px;
}
.water>img{
  vertical-align: middle;
  margin-left: 5px;
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
.right{
  margin-left: 60px;
}
</style>
