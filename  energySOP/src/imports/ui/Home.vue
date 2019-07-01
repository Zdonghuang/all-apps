<template>
<div class="home">
  <h1>能源SOP</h1>
  <div class="box">
    <div class="left_box">
      <div></div>
    </div>
    <div class="right_box">
      <ul>
        <li v-for="(item,index) in newdatalist " :key="index">
          <span>{{item.name}}</span>
          <span>{{index==15?Math.abs((item.val-0+1).toFixed(0)):item.val}}</span>
        </li>
      </ul>
    </div>
  </div>

</div>

</template>

<script>


import { Meteor } from 'meteor/meteor'
import { Metrics } from '../api/collections'
export default {
  data () {
    return {
      dataList:[
          {name:'发电机绕组温度', val:43.2},
          {name:'发电机轴承润滑周期手动仪表', val:14},
          {name:'主动锚轴承温度',val:56},
          {name:'非主动锚轴承温度',val:64},
          {name:'定子P设定点',val:1000},
          {name:'定子Q设定点',val:500},
          {name:'定子电流',val:1490.7},
          {name:'转子电流',val:620.4},
          {name:'定子有功功率可用性限制',val:2208.1},
          {name:'发电机轴承润滑箱油耗比例',val:100},
          {name:'定子功率',val:1751.5},
          {name:'定子无功功率',val:-9.7},
          {name:'放电机绕组1温度',val:117.4},
          {name:'放电机绕组2温度',val:116.4},
          {name:'放电机绕组3温度',val:118},
          {name:'发电机类型',val:4}
      ],
      numlist:[10,5,10,5,20,30,25,15,100,35,90,3,10,10,10,10],
      timer:null,
      newdatalist:[]
    }
  },
  destroyed(){
    clearInterval(this.timer);
  },
  mounted(){
    clearInterval(this.timer);
    this.timer = setInterval(()=>{
      this.setData();
    },8000)
  },
  methods: {
    setData(){
      this.newdatalist = [];
      for(var i=0;i<this.dataList.length;i++){
        var data = this.dataList[i].val;
        this.dataList[i].val = (Math.random()*this.numlist[i]+(this.dataList[i].val-0)).toFixed(1);
        if(this.dataList[i].val>data){
          this.dataList[i].val = ((this.dataList[i].val-0)-Math.random()*this.numlist[i]).toFixed(1);
        }
        this.newdatalist.push(this.dataList[i]);
      }
    }
  },
}
</script>


<style lang="less">
body{
  background: #000;
}
.home{
  background: #000;
  max-height: 900px;
  height: 100%;
  color: #fff;
}
.home h1{
  text-align: center;
  font-weight:700;
  font-size: 34px;
  padding: 40px 0 59px 0;
}
.box{
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.box .left_box{
  float: left;
  width: 545px;
  height: 515px;
  background-image: url('/bg_low.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 80px 26px;
}
.left_box>div{
  width: 100%;
  height: 100%;
  background: url('/dynamo.png');
  background-repeat: no-repeat;
  background-size: contain;
}
.right_box{
  float: right;
  background-image: url('/data.png');
  background-repeat: no-repeat;
  background-size: contain;
  width: 507px;
  height: 517px;
}
.right_box >ul{
  overflow: hidden;
  margin: 8px;
  padding: 0;
  margin-bottom: 0;
}
.right_box li{
  float: left;
  width: 100%;
  height: 31px;
  background: #313131;
  padding: 0 15px;
  line-height: 31px;
  font-weight: 400;
  font-size: 14px;
  overflow: hidden;
}
.right_box li:nth-child(even){
  background: #1E1E1E;
}
.right_box li:last-child,.right_box li:first-child{
  height: 33px;
}
.right_box li span:nth-child(1){
  float: left;
}
.right_box li span:nth-child(2){
  float: right;
}
</style>
