<template>
  
  <div class="home">
    <h1><span>云终端温度控制系统</span><span></span></h1>
    <div><img :src="img" height="300px" id="img"></div>
    <div id="echarts"></div>
    <div><button class="btn" @click="click" v-if="ok">开始</button>
    <button class="btn" @click="stop" v-else>停止</button></div>
    <div>
      机器人在工业中应用广泛，很多工业场景中机器人都有用武之地，如原料的拾取和放置、设备看护和质量检测等，本应用展示了云终端+机器人+物联网模式，实现了远程监控和反控，应用通过API采集远程环境温度，当温度超出设定上限值时，自动控制机器人采取措施进行降温，当温度下降到设定下限值时，机器人自动停止降温动作，采集的温度将实时显示到折线图中，同时保存到数据库，用于以后可能的数据加工和分析。
    </div>
  </div>
</template>

<script>
import { Meteor } from 'meteor/meteor'
import { EdgeData , DeviceData } from '../api/collections'
export default {
  data () {
    return {
      echarts:null,
      myEcharts:null,
      bigData:[],
      options:{},
      xhr:null,
      ok:true,
      time:null,
      img:'/mone.jpeg',
      length:[]
    }
  },
  created(){
    this.echarts = require('echarts');
  },
  mounted(){
    for(var i = -400;i<=0;i++){
      this.length.push(i);
    }
    window.addEventListener('load',this.init);
  },
  methods: {
    init(){
      this.myEcharts = this.echarts.init(document.getElementById('echarts'));
      this.options = {
          title: {
              text: '温控状态参数',
              subtext: '设备端各传感器上传的数值',
              textStyle:{
                height:100
              }
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['历史温度']
          },
          toolbox: {
              show: false,
              feature: {
                  dataZoom: {
                      yAxisIndex: 'none'
                  },
                  dataView: {readOnly: false},
                  magicType: {type: ['line', 'bar']},
                  restore: {},
                  saveAsImage: {}
              }
          },
          xAxis:  {
              type: 'category',
              boundaryGap: false,
              splitNumber:20,
              axisTick:{
                interval:0,
                length:4
              },
              data: this.length
          },
          yAxis: {
              type:'value',
              boundaryGap: false,
              min:30,
              max:60,
              axisLabel:{
                formatter:'{value}°C'
              },
              data: []
          },
          series: [
              {
                  name:'历史温度',
                  type:'line',
                  data:this.bigData,
                  markPoint: {
                      data: [
                          {type: 'max', name: '最大值'},
                          {type: 'min', name: '最小值'}
                      ]
                  }
              },
          ]
      }
      this.myEcharts.setOption(this.options)
    },
    click(){
      this.init()
      this.time = setInterval(()=>{
        this.init()
      },2000)
      this.ok=false;
    },
    stop(){
      clearInterval(this.time);
      this.ok=true;
    }
  },
  meteor: {
    $subscribe: {
      'edgedata' () {
        return [401]
      },
      'devicedata' (){
        return [1]
      }
    },
    updateData () {
        var edgedata = EdgeData.find({}, {
          sort: {ts: -1}, 
          limit: 401
        }).fetch();
        let arr = [];
        for(var i = edgedata.length-1;i>=0;i--){
          arr.push(edgedata[i].cpu_tempreture);
        }
        if(arr.length>0&&this.options.series){
          this.bigData = arr;
        }
        var devicedata = DeviceData.find({}, {
          sort:{},
          limit : 1,
          query: name="Alert"
        }).fetch();
        if(devicedata[0]&&devicedata[0].connected){
          this.img = '/mtwo.jpeg'
        }else{
          this.img= '/mone.jpeg'
        }
    }
  }
}
</script>


<style lang="less">
body{
  height: 100% !important;
  background-color: rgba(39, 32, 29, 0.158);
}
h1{
  width: 90%;
  margin: 0 auto;
  height: 80px;
}
h1 span:first-child{
  float: left;
}
h1 span:last-child{
  float: right;
  font-size: 16px;
}
.home {
  text-align: center;
  padding-top: 20px;
}
main{
  padding: 0 !important;
  margin:  auto  !important;
  min-width: 1200px !important;
}
.home div{
  float: left;
  width: 600px;
}
.home div:nth-child(2){
  width: 400px;
  padding-top: 50px;
  box-sizing: border-box;
}
.home #echarts{
  width: 800px;
  height: 400px;
  margin: 0 auto;
}
.home div:nth-child(4){
  height: 250px;
  width:400px;
}
.home div:nth-child(5){
  height: 250px;
  width: 700px;
  padding: 20px;
  text-align: center;
}
.btn{
  margin-top: 80px;
  width: 80px;
  height: 50px;
  font-size: 22px;
}
.home div:nth-child(5){
  width: 610px;
  text-align: left;
  line-height: 26px;
  margin-left: 90px;
  margin-top: 20px;
}
</style>
