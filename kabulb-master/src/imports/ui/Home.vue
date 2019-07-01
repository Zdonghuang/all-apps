<template>
  <div class="home">
    <!-- <p class="status_text"><i v-show="connected" class="fa fa-cog fa-spin fa-fw"></i>设备已工作 {{timeElapsed}} 秒，预测发生故障时间：{{timeToFailText}}</p> -->
   <!-- row1 -->
    <div class="row1 clearfloat">
      <div class="times">
        <div>
          <p>已过时间</p>
          <p>{{timeElapsed}}s</p>
        </div>
        <div>
          <p>故障时间</p>
          <p>{{timeToFailText}}</p>
        </div>
      </div>
      <div class="lamp">
        <img v-show="testStage===0" width="280" height="auto" src="/GreyB.png"/>
        <img v-show="testStage===1" width="280" height="auto" src="/GreenB.png"/>
        <img v-show="testStage===2" width="280" height="auto" src="/YellowB.png"/>
        <img v-show="testStage===3" width="280" height="auto" src="/RedB.png"/>
      </div>
      <div class="pic">    
        <div id="chart" :style="{width: '500px', height: '350px',margin:'30px'}"></div> 
      </div>
    </div>
  <!-- row2 -->
    <div class="row2 clearfloat">
      <div class="a">
        <div>
          <p>次新电流度数</p>
          <p>{{lastCurrent}}mA</p>
        </div>
        <div>
          <p>最新电流度数</p>
          <p>{{current}}mA</p>
        </div>
      </div>
      <div class="point">
        <p>实时监控</p>
        <div class="middle">  
          <div>
            <p>温度(°C)</p>
            <p>{{temperature}}</p>
          </div> 
          <div>
            <p>亮度(cd/m²)</p>
            <p>{{lumination}}</p>
          </div> 
          <div>
            <p>电流( mA )</p>
            <p>{{current}}</p>
          </div> 
        </div>
      </div>
      <div class="pic">     
        <div id="myChart" :style="{width: '500px', height: '350px',margin:'-50px 0 0 50px'}"></div>
      </div>
    </div>

		<!-- <div class="row text-center">
	    <div class="col">
	      <div class="counter">
          <i class="fa fa-thermometer fa-2x"></i>
          <h2 class="timer count-title count-number" data-to="100" data-speed="1500">{{temperature}}</h2>
          <p class="count-text ">灯泡温度(°C)</p>
        </div>
	    </div>
      <div class="col">
        <div class="counter">
          <i class="fa fa-sun-o fa-2x"></i>
          <h2 class="timer count-title count-number" data-to="1700" data-speed="1500">{{lumination}}</h2>
          <p class="count-text ">灯泡亮度(cd/m²)</p>
        </div>
      </div>
		</div> -->

    <h1></h1>
    <p>
      <button @click="startPlay" v-if="istrue">演示</button>
      <button @click="stopPlay" v-if="!istrue">停止演示</button>
      <button @click="onResetClick" :disabled="!istrue">重置运行时间</button>
      &nbsp;<button @click="onStop" :disabled="!istrue">停止</button>
    </p>

  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { Metrics } from "../api/collections";
import { mapActions, mapState, mapGetters } from "vuex";

const Critial_Value = 210;
const Warning_Value = 160;

export default {
  data() {
    return {
      estimations: ["-", "大于3小时", "15分钟～3小时", "小于15分钟"],
      timeToFail: -1,
      lastCurrent:0,
      current: 0,
      power: 0,
      failCount: 0,
      connected: false,
      running: false,
      timeElapsed: 0,
      allma:[],
      allcd:[],
      myChart:null,
      chart:null,
      options:{},
      istrue:true,
      playData:[
        {cur:300,lm:45,pwr:150,tp:120,ttf:120},
        {cur:100,lm:120,pwr:100,tp:100,ttf:120},
        {cur:80,lm:150,pwr:50,tp:80,ttf:120},
        {cur:20,lm:200,pwr:20,tp:60,ttf:120},
        {cur:0,lm:250,pwr:0,tp:30,ttf:0},
        {cur:0,lm:250,pwr:0,tp:30,ttf:0},
      ],
      next:{},
      palyInterval:null,
      intInterval:null,
      demoInterval:null,
      jj:0,
      newdata:{},
      newdatas:{},
      testdata:[
        {cur:306,lm:66,pwr:156,tp:126,ttf:8600},
        {cur:305,lm:65,pwr:155,tp:125,ttf:8500},
        {cur:304,lm:64,pwr:154,tp:124,ttf:8400},
        {cur:303,lm:63,pwr:153,tp:123,ttf:8300},
        {cur:302,lm:62,pwr:152,tp:122,ttf:8200},
        {cur:301,lm:61,pwr:151,tp:121,ttf:8100},
        {cur:300,lm:60,pwr:150,tp:120,ttf:8000}
      ],
      differCur:0,
      differLm:0,
      differPwr:0,
      differTp:0,
      differTtf:0,
      num:1
    }
  },

  created() {

  },

  mounted() {
    //console.log('Home.vue mounted');
    this.echarts = require('echarts');

    let v = localStorage.getItem('kabulb_time_elapsed');
    console.log('Saved kabulb_time_elapsed is: ' + v);
    if (v != null) {
      this.timeElapsed = parseInt(v, 10);
      this.running = true;
    } 
    if(this.istrue){
      // 真实数据
      this.truePlay();
    }else{
      // 模拟数据
      this.demoPlay();
    }    
  },

  watch:{
    'jj'(val, newval){
      if(newval==4){
        this.jj=0;
        clearInterval(this.palyInterval);
        clearInterval(this.intInterval);
        this.demoPlay();
      }
    },
    'timeElapsed':()=>{
      (this.current<2)&&(clearInterval(this.demoInterval));
    },
    'testdata':(val, newval)=>{
        // console.log('###',val)
        // console.log('***',newval)
    }
  },

  beforeDestroy() {
    console.log('Home.vue beforeDestroy');
    clearInterval(this.palyInterval);
    clearInterval(this.intInterval);
    clearInterval(this.interval);
    clearInterval(this.demoInterval)
  },

  computed: {
    ...mapState("config", ["psudoML", "baseline"]),
    ...mapGetters("config", ["testStage", "temperature", "lumination"]),
    timeToFailText: function () {
      if (this.psudoML) {
        return this.estimations[this.testStage];
      } else {
        if (this.timeToFail > 3600) {
          return (this.timeToFail / 3600).toFixed(0) + 'h';
        } else if (this.timeToFail > 60) {
          return (this.timeToFail / 60).toFixed(0) + 'm';
        } else if (this.timeToFail > -1){
          return this.timeToFail + 's';
        }else{
          return this.timeToFail;
        }
      }
    }
  },

  methods: {
    ...mapActions("config", ["setTestStage", "setBottomline", "setBaseline", "setTemperature", "setLumination"]),

    // 开始演示
    startPlay(){
      clearInterval(this.interval);
      clearInterval(this.palyInterval);
      clearInterval(this.intInterval);
      clearInterval(this.demoInterval)
      this.istrue=false;
      this.running=false;
      this.demoPlay();
    },

    // 结束演示
    stopPlay(){
      this.istrue=true;
      clearInterval(this.palyInterval);
      clearInterval(this.intInterval);
      clearInterval(this.demoInterval)
      // 重置
      this.timeElapsed = 0;
      this.setTestStage(0);
      this.running = true;      
      this.failCount = 0;
      this.truePlay();
    },

    onResetClick() {
      if (confirm('确定要重置设备运行时间吗？')) {
        this.timeElapsed = 0;
        this.setTestStage(0);
        this.running = true;      
        this.failCount = 0;
        console.log('Elapsed time was reset! Started data collection...');
      } else {
        // Do nothing!
      }
    },

    onStop() {
      this.running = false;
      this.setTestStage(0);
    },

    tick() {
      if (this.running) {
        this.timeElapsed = this.timeElapsed + 1;
        //console.log('setting localStorage[kabulb_time_elapsed] to ' + this.timeElapsed);
        localStorage.setItem('kabulb_time_elapsed', this.timeElapsed);
        this.getAll();
      }
    },

    psudoPredict: function() {
      console.log('Current Stage=' + this.testStage);
      if (this.lumination > Critial_Value) {
        console.log('');
        this.setTestStage(3);
      } else if (this.lumination > Warning_Value) {
        if (this.testStage < 2) {
          this.setTestStage(2);
        }
      } else if (this.lumination > this.baseline) {
        if (this.testStage < 1) {
          this.setTestStage(1);
        }
      } else {
        this.setTestStage(0);
      }
    },

    adjustBulb: function() {
      if (this.timeElapsed > this.timeToFail) {
        this.setTestStage(3);
      } else if (this.timeElapsed > (this.timeToFail * 0.8)) {
        if (this.testStage < 2) {
          this.setTestStage(2);
        }
      } else if (this.lumination > this.baseline) {
        if (this.testStage < 1) {
          this.setTestStage(1);
        }
      } else {
        this.setTestStage(0);
      }
    },

    predict: function() {
      let url =
        this.$env.apiBase +
        "/mlapi/v1.0/predict?" +
        "p1=" +
        (255 - this.lumination) +
        "&p2=" +
        this.temperature;
      console.log("Calling API, url=" + url);
      this.$http
        .get(url)
        .then(response => {
          console.log('Predicted result:',response);
          let ttfs = response.data / 10000;
          this.timeToFail = ttfs.toFixed(0);
          this.adjustBulb();
          //console.log(ttfs.toFixed(0) + 's');
//          console.dir(ttf.toString('HH 小时 mm 分钟 ss 秒'));
        })
        .catch(error => {
          console.log(error);
        });
    },

    truePlay(){
      clearInterval(this.intInterval);
      clearInterval(this.palyInterval);
      clearInterval(this.demoInterval);
      this.interval = setInterval(() => {
          this.tick();
          this.drawLine();
      }, 1000);
    },

    demoPlay(){
      clearInterval(this.intInterval);
      clearInterval(this.palyInterval);
      clearInterval(this.demoInterval)
      this.jj=0;
      this.testdata=[
        {cur:306,lm:66,pwr:156,tp:126,ttf:8600},
        {cur:305,lm:65,pwr:155,tp:125,ttf:8500},
        {cur:304,lm:64,pwr:154,tp:124,ttf:8400},
        {cur:303,lm:63,pwr:153,tp:123,ttf:8300},
        {cur:302,lm:62,pwr:152,tp:122,ttf:8200},
        {cur:301,lm:61,pwr:151,tp:121,ttf:8100},
        {cur:300,lm:60,pwr:150,tp:120,ttf:8000}
      ];
      this.timeElapsed=0;
      // method1
      this.doFun();
      this.palyInterval=setInterval(this.doFun,31000);
      // method2
      // this.doPlay();
    },

    doFun(){
      clearInterval(this.intInterval);
      this.num=1;
      // console.log('jj',this.jj);
      this.testdata.shift();
      this.testdata.push(this.playData[this.jj]);
      // this.next=this.playData[this.jj+1];
      this.differCur=(this.playData[this.jj+1].cur-this.playData[this.jj].cur)/30;
      this.differLm=(this.playData[this.jj+1].lm-this.playData[this.jj].lm)/30;
      this.differPwr=(this.playData[this.jj+1].pwr-this.playData[this.jj].pwr)/30;
      this.differTp=(this.playData[this.jj+1].tp-this.playData[this.jj].tp)/30;
      this.differTtf=(this.playData[this.jj+1].ttf-this.playData[this.jj].ttf)/30;
      this.newdata=this.playData[this.jj];
      this.intInterval=setInterval(()=>{
        this.newdatas.cur=this.newdata.cur+this.differCur*this.num;
        this.newdatas.lm=this.newdata.lm+this.differLm*this.num;
        this.newdatas.pwr=this.newdata.pwr+this.differPwr*this.num;
        this.newdatas.tp=this.newdata.tp+this.differTp*this.num;
        this.newdatas.ttf=this.newdata.ttf+this.differTtf*this.num;
        this.testdata.shift();
        let data = JSON.parse(JSON.stringify(this.newdatas));
        this.testdata.push(data);
        // 赋值
        this.allma.length=0;
        this.allcd=[];
        let ddata=this.testdata;
        for(let k=0;k<ddata.length;k++){
          this.allma.push(ddata[k].cur.toFixed(0));
          this.allcd.push(255 - ddata[k].lm);
        }
        let s = this.testdata[6];
        let ss= this.testdata[5];
        this.setTemperature(s.tp.toFixed(0));
        this.setLumination(255 - s.lm.toFixed(0));
        this.lastCurrent=ss.cur.toFixed(0);
        this.power = s.pwr.toFixed(0);
        this.timeToFail = s.ttf.toFixed(0);
        this.current = s.cur.toFixed(0);

        if (this.current < 2) {
          console.log('Stop data collection.');
          this.onStop();
          this.timeToFail='-';
        } else {
          console.log('Collecting data...')
          if (this.psudoML) {
            this.psudoPredict();
          } else {
            this.adjustBulb();
          }
        }
        this.drawLine();
        this.timeElapsed++;
        this.num++;
      },1000);
      (this.jj<4)?this.jj++:this.jj=0;
    },

    
    // doPlay(){
    //   let differCur=(this.playData[0].cur-this.playData[4].cur)/120;
    //   let differLm=(this.playData[0].lm-this.playData[4].lm)/120;
    //   let differPwr=(this.playData[0].pwr-this.playData[4].pwr)/120;
    //   let differTp=(this.playData[0].tp-this.playData[4].tp)/120;
    //   let differTtf=(this.playData[0].ttf-this.playData[4].ttf)/120;
    //   console.log(differTtf);
    //   this.newdata=this.testdata[6];
    //   if(this.timeElapsed<120){
    //     this.demoInterval=setInterval(()=>{
    //       this.newdata.cur=this.newdata.cur-differCur;
    //       this.newdata.lm=this.newdata.lm-differLm;
    //       this.newdata.pwr=this.newdata.pwr-differPwr;
    //       this.newdata.tp=this.newdata.tp-differTp;
    //       this.newdata.ttf=this.newdata.ttf-differTtf;
    //       this.testdata.shift();
    //       this.testdata.push(this.newdata);
    //       // 赋值
    //       this.allma=[];
    //       this.allcd=[];
    //       let ddata=this.testdata;
    //       for(let i=0;i<ddata.length;i++){
    //         this.allma.unshift(ddata[i].cur.toFixed(0));
    //         this.allcd.unshift(255 - ddata[i].lm);
    //       }
    //       let m = this.testdata[0];
    //       let mm= this.testdata[1];
    //       this.setTemperature(m.tp.toFixed(0));
    //       this.setLumination(255 - m.lm.toFixed(0));
    //       this.lastCurrent=mm.cur.toFixed(0);
    //       this.power = m.pwr.toFixed(0);
    //       this.timeToFail = m.ttf.toFixed(0);
    //       this.current = m.cur.toFixed(0);

    //       if (this.current < 2) {
    //         console.log('Stop data collection.');
    //         this.onStop();
    //         this.timeToFail='-';
    //       } else {
    //         console.log('Collecting data...')
    //         if (this.psudoML) {
    //           this.psudoPredict();
    //         } else {
    //           this.adjustBulb();
    //         }
    //       }
    //       this.drawLine();
    //       this.timeElapsed++;
    //     },1000);
    //   }else{
    //     clearInterval(this.demoInterval);
    //   }
    // },

    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        this.myChart =  this.echarts.init(document.getElementById('myChart'))
        // 绘制图表
        this.options={
            xAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7'],
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#03A0E6'
                    }
                },
                name:'采样数(个)',
                axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#03A0E6',
                   }
               },
            },
            yAxis: {
                min: 0,
                max: 300,
                type: 'value',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#03A0E6'
                    },
                },
                name:'亮度(cd/m²)',
                axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#03A0E6',
                   }
               },
            },
            series: [{
                data: this.allcd,
                type: 'line',
                smooth: true,
                itemStyle : {
                  normal : {
                    color:'#03A0E6',
                    lineStyle:{
                      color:'#03A0E6'
                    }
                  }
                },
            }]
        };
        this.myChart.setOption(this.options);
        this.chart =  this.echarts.init(document.getElementById('chart'))
        // 绘制图表
        this.option={
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['1', '2', '3', '4', '5', '6', '7'],
              axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#03A0E6'
                    }
              },
              name:'采样数(个)',
              axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#03A0E6',
                   }
               },
          },
          yAxis: {
              min: 0,
              max: 500,
              type: 'value',
              axisLabel: {
                  show: true,
                  textStyle: {
                      color: '#03A0E6'
                  }
              },
              name:'电流( mA )',
              axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#03A0E6',
                   }
               },
          },
          series: [{
              data: this.allma,
              type: 'line',
              areaStyle: {},
              itemStyle : {
                normal : {
                  color:'#03A0E6',
                  lineStyle:{
                    color:'#03A0E6'
                  }
                }
              },
          }]
        };
        this.chart.setOption(this.option);
    },

    getAll(){
      console.log('>>>');

      this.connected = true;

      var mdata = Metrics.find(
        {},
        {
          sort: { created: -1 },
          limit: 7
        }
      ).fetch();

      if (mdata.length > 0) {
        if (this.running) {
          // 给echarts数据
          // console.log('mdata',mdata);
          this.allma=[];
          this.allcd=[];
          for(let i=0;i<mdata.length;i++){
            this.allma.unshift(mdata[i].cur.toFixed(0));
            this.allcd.unshift(255 - mdata[i].lm);
          }
          let m = mdata[0];
          let mm=mdata[1];
          // console.log('Start dumping mdata...');
          // console.dir(mdata);
          // console.log('Finished dumping mdata...');
          this.setTemperature(m.tp);
          this.setLumination(255 - m.lm);
          this.lastCurrent=mm.cur.toFixed(0);
          this.power = m.pwr;
          this.timeToFail = m.ttf;
          this.current = m.cur.toFixed(0);

          if (this.current < 2) {
            console.log('Stop data collection.');
            this.onStop();
            this.timeToFail='-';
          } else {
            console.log('Collecting data...')
            if (this.psudoML) {
              this.psudoPredict();
            } else {
              // Do not use local predict:L this.predict();
              this.adjustBulb();
            }
          }
        }
      }
    }

  },
  meteor: {
    $subscribe: {
      metrics() {
        return [100];
      }
    },
    updateData() {
      // console.log('>>>');

      // this.connected = true;

      // var mdata = Metrics.find(
      //   {},
      //   {
      //     sort: { created: -1 },
      //     limit: 7
      //   }
      // ).fetch();

      // if (mdata.length > 0) {
      //   if (this.running) {
      //     // 给echarts数据
      //     console.log('mdata',mdata);
      //     // this.allma=[0];
      //     // this.allcd=[];
      //     // for(let i=0;i<mdata.length;i++){
      //     //   this.allma.unshift(mdata[i].cur);
      //     //   this.allcd.unshift(mdata[i].tp);
      //     // }
      //     // console.log(this.allma);
      //     let m = mdata[0];
      //     let mm=mdata[1];
      //     // console.log('Start dumping mdata...');
      //     // console.dir(mdata);
      //     // console.log('Finished dumping mdata...');
      //     this.setTemperature(m.tp);
      //     this.setLumination(255 - m.lm);
      //     this.lastCurrent=mm.cur.toFixed(0);
      //     this.current = m.cur.toFixed(0);
      //     this.power = m.pwr;
      //     this.timeToFail = m.ttf;

      //     if (this.current < 2) {
      //       console.log('Stop data collection.');
      //       this.onStop();
      //     } else {
      //       console.log('Collecting data...')
      //       if (this.psudoML) {
      //         this.psudoPredict();
      //       } else {
      //         // Do not use local predict:L this.predict();
      //         this.adjustBulb();
      //       }
      //     }
      //   }
      // }
    }
  }
};
</script>


<style lang="less" scoped>
.home {
  text-align: center;
  max-width: 1920px;
  margin: 0 auto;
  color: #03A0E6;
}

.lamp{
  display: inline-block;
  background-image: url(../light_box.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 381px;
  height: 342px;
}

.lamp>img{
  position: relative;
  top: -16px;
}

.status_text {
  color: aliceblue;
  font-size: 36px;
}

.counter {
  background-color: rgba(245, 245, 245, 0.5);
  padding: 20px 0;
  border-radius: 12px;
}

.count-title {
  font-size: 40px;
  font-weight: normal;
  margin-top: 10px;
  margin-bottom: 0;
  text-align: center;
  color: #2041d5;
}

.count-text {
  color: #2041d5;
  font-size: 13px;
  font-weight: normal;
  margin-top: 10px;
  margin-bottom: 0;
  text-align: center;
}

.fa-2x {
  margin: 0 auto;
  float: none;
  display: table;
  color: #2041d5;
}

.times{
  color: #03A0E6;
  display: inline-block;
  margin-right: 50px;
}
.times>div{
  display: inline-block;
  font-size: 30px;
  // margin-left: 73px;
}
.times>div:first-child{
  margin: 128px 62px 0 52px;
}
.times>div>p:nth-child(2){
  width: 162px;
  height: 162px;
  background-image: url(../already.png);
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 30px;
  line-height: 162px;
}
.pic{
  display: inline-block;
  width: 390px;
  height: 30px;
}
.row1{
  width: 1366px;
  margin: 0 auto;
}
.row2{
  width: 1366px;
  margin: 0 auto;
  margin-top:20px;
}
.row2>div{
  display: inline-block;
  float: left;
}
.row1>div{
  display: inline-block;
  float: left;
}
.a{
  width: 408px;
  height: 189px;
  background-image: url(../box.png);
  background-repeat: no-repeat;
  background-size: cover;
  color: #03A0E6;
  margin: 50px 62px 0 40px;
}
.a>div{
  display: inline-block;
}
.a>div:first-child{
  margin:26px 88px 24px 0px;
}
.a>div>p:nth-child(2){
  width: 91px;
  height: 91px;
  background-image: url(../circle.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  line-height: 91px;
}
.row2>:nth-child(2){
  margin-top: 50px;
}
.middle{
  width: 348px;
  height: 120px;
  background-image: url(../middle.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.middle>div{
  display: inline-block;
  line-height: 30px;
  margin-top: 20px;
}
.middle>div:nth-child(2){
  margin: 0 40px 0 40px;
}
.point>p{
  color: #03A0E6;
  text-align: center;
}
button{
  margin: 0 30px;
}
.clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
.clearfloat{zoom:1}
</style>
