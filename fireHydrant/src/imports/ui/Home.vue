<template>
import func from './vue-temp/vue-editor-bridge';
  <div class="home">
    <h1>W区消防栓实时监控</h1>
    <div class="box">
      <div class="box_img" v-for="(item,index) in newPlugs" :key="index" :style="item.boxtStyle" v-if="item.boxshow">
        <h4>编号: {{item.code}}</h4>
        <h3>状态</h3>
        <p class="facility">设备:&nbsp;&nbsp;<span :class="item.facility>=2? '':'red'">{{item.facility >= 2?'正常':'损坏'}}</span></p>
        <p class="pressure">水压:&nbsp;&nbsp;<span :class="item.num>0.5?'':'yellow'">{{item.num>0.5?'充足':'不足'}}</span></p>
        <p class="time">上次检查时间：{{item.time}}</p>
      </div>
    </div>
    <div>
        <div class="area">
          <ul>
              <li><img src="/hydrant_normal_d.png" width="21"> <span>正常</span></li>
              <li><img src="/damage_hydraulicpressure_x.png" width="21"><span style="color:#FFEE5A;">水压不足</span></li>
              <li><img src="/damage_hydraulicpressure_d.png" width="21"><span style="color:#FF5959;">设备损坏</span></li>
          </ul>
          <div class="w_area">
            <img :src="item.facility<=1?'/damage_hydraulicpressure_d.png':(item.num>0.5?'/hydrant_normal_d.png':'/damage_hydraulicpressure_x.png')" 
                  width="30" class="plug" v-for="(item,index) in plugs" :key="index" :style="item.style" @click="plugShow(item)">
          </div>
        </div>
        <div class="area_num">
          <div class="all_num">
            <h4>W区消防栓总数</h4>
            <p>{{plugs.length}}</p>
          </div>
          <div class="normal_num">
            <h4>正常设备数</h4>
            <p>{{normal.length}}</p>
          </div>
          <div class="tools">
            <div>
              <p>设备水压不足数</p>
              <img src="/equipment_hydraulicpressure.png" width="113">
              <span>{{pressure.length}}</span>
            </div>
            <div>
              <p>设备损坏数</p>
              <img src="/equipment_damage.png" width="113">
              <span>{{damage.length}}</span>
            </div>
          </div>
        </div>
    </div>
    <div>
      <div id="myChart" :style="{width: '623px', height: '300px',float:'left',overflow:'hidden'}"></div>
      <div class="card">
        <h4>设备水压不足编号</h4>
        <div class="unpressure">
          <span v-for="(item,index) in pressure" :key="index" class="yellow">{{item.code}}</span>
        </div>
        <h4>设备损坏编号</h4>
        <div class="unpressure">
          <span v-for="(item,index) in damage" :key="index" class="red">{{item.code}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'home',
  data(){
    return{
      options:{},
      plugs:[{code:'wtf010',style:"top: 20px;left:40px;",num:0.5,boxtStyle:'top:79px;left:53px;',boxshow:false,facility:1,time:'2018-10-7'},
        {code:'wtf011',style:"top: 20px;left:277px;",num:0.25,boxtStyle:'top:79px;left:292px;',boxshow:false,facility:1,time:'2018-10-9'},
        {code:'wtf012',style:"top: 0;left:381px;",num:0.75,boxtStyle:'top:61px;left:395px;',boxshow:false,facility:2,time:'2018-10-14'},
        {code:'wtf013',style:"top: 2px;left:550px;",num:1,boxtStyle:'top:61px;left:565px;',boxshow:false,facility:1,time:'2018-10-7'},
        {code:'wtf014',style:"top: 91px;left:625px;",num:0.5,boxtStyle:'top: 153px;left: 641px;',boxshow:false,facility:2,time:'2018-10-17'},
        {code:'wtf015',style:"top: 131px;left:505px;",num:0.25,boxtStyle:'top: 191px;left: 521px;',boxshow:false,facility:1,time:'2018-10-12'},
        {code:'wtf016',style:"top: 91px;left:380px;",num:0.6,boxtStyle:'top: 151px;left: 395px;',boxshow:false,facility:2,time:'2018-10-13'},
        {code:'wtf017',style:"top: 93px;left:278px;",num:0.34,boxtStyle:'top: 151px;left: 293px;',boxshow:false,facility:1,time:'2018-10-15'},
        {code:'wtf018',style:"top: 82px;left:88px;",num:1,boxtStyle:'top: 147px;left: 102px;',boxshow:false,facility:1,time:'2018-10-23'},
        {code:'wtf019',style:"top: 160px;left:32px;",num:0.8,boxtStyle:'top: 222px;left: 48px;',boxshow:false,facility:2,time:'2018-10-30'},
        {code:'wtf020',style:"top: 160px;left:272px;",num:0.9,boxtStyle:'top: 219px;left: 287px;',boxshow:false,facility:1,time:'2018-10-22'},
        {code:'wtf021',style:"top: 190px;left:436px;",num:0.45,boxtStyle:'top: 251px;left: 450px;',boxshow:false,facility:1,time:'2018-10-18'},
        {code:'wtf022',style:"top: 170px;left:606px;",num:0.25,boxtStyle:'top: 229px; left: 620px;',boxshow:false,facility:2,time:'2018-10-25'},
        {code:'wtf023',style:"top: 248px;left:378px;",num:0.15,boxtStyle:'top: 310px;left: 391px;',boxshow:false,facility:1,time:'2018-11-1'},
        {code:'wtf024',style:"top: 244px;left:148px;",num:0.85,boxtStyle:'top: 303px;left: 162px;',boxshow:false,facility:2,time:'2018-10-8'},
        {code:'wtf025',style:"top: 244px;left:32px;",num:0.85,boxtStyle:'top: 303px;left: 46px;',boxshow:false,facility:1,time:'2018-11-7'},
        {code:'wtf026',style:"top: 308px;left:212px;",num:0.35,boxtStyle:'top: 369px;left: 227px;',boxshow:false,facility:2,time:'2018-11-4'},
        {code:'wtf027',style:"top: 308px;left:452px;",num:0.15,boxtStyle:'top: 369px;left: 467px;',boxshow:false,facility:2,time:'2018-10-5'},
        {code:'wtf028',style:"top: 308px;left:622px;",num:0.65,boxtStyle:'top: 369px;left: 637px;',boxshow:false,facility:1,time:'2018-10-20'},
        {code:'wtf029',style:"top: 390px;left:536px;",num:0.75,boxtStyle:'top:450px;left:551px',boxshow:false,facility:1,time:'2018-11-12'},
        {code:'wtf030',style:"top: 390px;left:384px;",num:0.35,boxtStyle:'top: 450px;left: 400px;',boxshow:false,facility:2,time:'2018-10-27'},
        {code:'wtf031',style:"top: 390px;left:280px;",num:0.35,boxtStyle:'top: 450px;left: 296px;',boxshow:false,facility:1,time:'2018-11-2'},
        {code:'wtf032',style:"top: 390px;left:180px;",num:0.5,boxtStyle:'top:454px;left: 194px;',boxshow:false,facility:2,time:'2018-11-3'},
        {code:'wtf033',style:"top: 390px;left:35px;",num:0.58,boxtStyle:'top:452px;left: 50px;',boxshow:false,facility:1,time:'2018-10-18'},
      ],
      //❤️的消防栓
      newPlugs:[],
      normal:[],
      damage:[],
      pressure:[],
      sum:0,
      lineSum:[0.4,0.75,0.6,0,1,0.9,0.84,0.35,0.65,0.2,0.1,0.5,0.74],
      newLineSum:[],
      lineInterval:null
    }
  },
  mounted(){
    // this.drawLine();
    this.normalPlugs();
    clearInterval(this.lineInterval);
    this.lineInterval = setInterval(()=>{
        this.newLineSum = [];
        for(var i =0; i<this.lineSum.length; i++){
            this.lineSum[i] = Math.random(this.lineSum[i]).toFixed(1);
            this.newLineSum.push(this.lineSum[i]);
        }
        this.drawLine();
      },7000)
    
  },
  methods:{
    drawLine(){
      
      this.myChart =  this.$echarts.init(document.getElementById('myChart'))
      
      this.options = {
        xAxis: {
            type: 'category',
            data: ['0:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00','14:00','16:00','18:00','20:00','22:00'],
            name:'时间',
            axisLabel: {
              show: true,
              textStyle: {
                  color: '#09D2C9'
              },
              rotate:40
            },
            axisLine: {
              lineStyle: {
                  type: 'solid',
                  color:'#09D2C9',
              }
            },
            //除去刻度
            axisTick: {
                show: false
            },
        },
        yAxis: {
            type: 'value',
            minInterval : 0.25,
            boundaryGap : [ 0, 0 ],
            name:'水压（MPa）',
            splitLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                  color: '#09D2C9'
              },
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                  type: 'solid',
                  color:'#09D2C9',
              }
            },
            axisTick: {
              show: false
            },
            
        },
        series: [{
            data: this.newLineSum,
            type: 'line',
            smooth: true,
            symbolSize: 8,
            lineStyle: {
                normal: {
                    color: '#09D2C9',
                    width: 1,
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#09D2C9',
                    color: '#fff'
                }
            }
        }]
      };
      this.myChart.setOption(this.options);
    },

    numDo(){
      // clearInterval(this.lineInterval)
      let _this = this;

      // this.lineInterval = setInterval(function(){
      //   this.newLineSum = [];
        
      // //  console.log(this.newLineSum);
      // },2000)
      console.log(this.newLineSum);
    },
    plugShow(bs){
      bs.boxshow = true;
      setTimeout(()=>{
        bs.boxshow = false;
      },3000)
    },
    
    normalPlugs(){
      setInterval(()=>{
          this.newPlugs = [];
          this.normal = [];
          this.damage = [];
          this.pressure = [];
          // this.sum = 0
          for(var i =0 ; i< this.plugs.length; i++){
            //水压
              this.plugs[i].num = Math.random(this.plugs[i].num).toFixed(1);
              // 计算平均值
              // this.sum+=(this.plugs[i].num-0);
              // this.sum = (this.sum/12).toFixed(1)
              // if(this.sum<0.1){
              //   this.sum = this.sum-0+0.1
              // }else if(this.sum>1){
              //   this.sum = this.sum-0+1;
              // }
              //损坏的随机数
              var count = Math.floor(Math.random()*2)
              if(this.plugs[i].facility==2){
                this.plugs[i].facility -= count;
              }else{
                this.plugs[i].facility += count;
              }
              this.newPlugs.push(this.plugs[i]);
            //损坏
              if(this.plugs[i].facility>1) {
                  this.normal.push(this.plugs[i])
              }
              if(this.plugs[i].facility<=1){
                this.damage.push(this.plugs[i])
              }
              if(this.plugs[i].num<=0.5){
                this.pressure.push(this.plugs[i]);
              }
          }
      },6000)

    }

  }
}
</script>


<style lang="less" scoped>
  .home{
    width:1200px;
    margin: 0 auto;
    background-color: #000;
    color: #fff;
    overflow: hidden;
    position: relative;
  }
  .home>h1{
    padding-top: 1.5rem;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: 500;
    color: #fff;
  }
  .home>div{
    overflow: hidden;
  }
  // .home>div:last-child{
  //   margin-top: 28px;
  // }
  .area {
    float: left;
    width: 672px;
    margin-right: 123px;
  }
  .area ul{
    list-style: none;
    padding: 0;
    overflow: hidden;
    width: 288px;
    margin: 0 auto;
  }
  .area ul li{
    float: left;
    margin-right: 2rem;
    margin-bottom: 1rem;
  }
  .area li>span{
    width: 33px;
    display: inline-block;
    font-size: 0.8rem;
    vertical-align: baseline;
    margin-left: 10px;
  }
  .area li:nth-child(1) span{
    font-size: 1rem;
    margin-left: 5px;
  }
  .w_area {
    background-image: url("/WArea.png");
    background-size: cover;
    width: 100%;
    height: 474px;
    position: relative;
  }
  // 消防栓
  .plug {
    position: absolute;
    top:0;
    left: 0;
    cursor: pointer;
  }
  .area_num{
    float: right;
    overflow: hidden;
    padding-top: 6rem;
  }
  .all_num{
    background-image: url("/Thetotalequipment_bg.png");
    background-size: cover;
    width: 371px;
    height: 93px;
    margin-bottom: 30px;
  }
  .all_num h4, .normal_num h4{
    text-align: center;
    font-weight: 400;
    margin: 0;
    padding: 18px 0 10px 80px;
  }
  .all_num p, .normal_num p{
    text-align: center;
    margin: 0;
    font-size: 18px;
    padding-left: 80px;
  }
  .normal_num{
    background-image: url("/equipment_normal.png");
    background-size: cover;
    width: 371px;
    height: 103px;
    margin-bottom: 25px;
  }
  .tools{
    overflow: hidden;
    padding: 0 10px;
  }
  .tools div p{
    text-align: center;
    margin: 0;
    margin-bottom: 10px;
  }
  .tools div {
    position: relative;
    float: left;
  }
  .tools div>span{
    position: absolute;
    top: 78px;
    left: 48px;
  }
  .tools div:last-child{
    float:right;
  }
  .card{
    float:right;
    background-image: url("/Detailsontheproblem_box.png");
    background-size:cover;
    width: 391px;
    height: 277px;
  }
  .card h4{
    text-align: center;
    font-weight: 400;
  }
  .box .box_img{
    position: absolute;
    top:0;
    left:0;
    z-index: 1;
    width: 300px;
    height: 194px;
    background-image: url('/detailsbox.png');
    background-size:cover;
  }
  .box .time{
    font-size: 14px;
    margin-top: 12px;
  }
  .box_img h4{
    text-align: center;
    padding-left: 108px;
    margin-bottom: 10px;
  }
  .box_img h3{
    text-align: center;
    padding-left: 100px;
    margin: 10px 0;
  }
  .box_img p{
    text-align: center;
    font-size: 18px;
    padding-left: 100px;
    margin: 0;
  }
  .box_img span{
    font-size: 18px;
  }
  .unpressure{
    padding: 0 30px;
    height: 60px;
    overflow: hidden;
  }
  .unpressure span{
    display: inline-block;
    padding: 0 15px;
    padding-bottom: 10px;
  }
  .red{
    color:#FF5959;
  }
  .yellow{
    color: #FFEE5A;
  }
</style>
