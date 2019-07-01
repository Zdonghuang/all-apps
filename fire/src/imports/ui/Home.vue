<template>
  <div class="home clearfloat">
    <!-- 左 -->
    <div class="map">
      <div class="line">
        <p>
          <img src="../line.png" alt="">
          <span style="color:#50E83C;">灭火线线路</span>
        </p>
        <p>
          <img src="../line2.png" alt="">
          <span style="color:#fff;">逃生</span>
        </p>
      </div>
      <div class="fire" v-if="fireNum==1">     
        <img src="../fire.png" alt="" v-show="fireShow">
        <transition name='fade'>
          <img src="../l.png" alt="" style="position: absolute;left: 23px;top: -26px;width: 52px;" v-show="lineShow">
        </transition>
        <transition name='fade'>
          <img src="../g.png" alt="" style="position:absolute;left:38px;top:-8px;width:8px;" v-show="lineShow && line1">
        </transition>
        <transition name='fade'>
          <img src="../l1.png" alt="" style="position: absolute;left: -200px;top: 39px;width: 222px;" v-show="lineShow">
        </transition>
        <transition name='fade'>
          <img src="../f.png" alt="" style="position:absolute;left:-80px;top:70px;width:8px;transform:rotate(60deg)" v-show="lineShow && line1">
        </transition>
        <transition name='fade'>
          <img src="../f.png" alt="" style="position:absolute;left:-133px;top:135px;width:8px;transform:rotate(78deg)" v-show="lineShow && line2">
        </transition>
        <transition name='fade'>
          <img src="../l2.png" alt="" style="position: absolute;left: 18px;top: 37px;width: 220px;" v-show="lineShow">
        </transition>
        <transition name='fade'>
          <img src="../f.png" alt="" style="position:absolute;left:45px;top:112px;width:8px;" v-show="lineShow && line1">
        </transition>
        <transition name='fade'>
          <img src="../f.png" alt="" style="position:absolute;left:160px;top:152px;width:8px;transform:rotate(-104deg)" v-show="lineShow && line2">
        </transition>
      </div>
      <div class="fire2" v-if="fireNum==2">
          <img src="../fire.png" alt="" v-show="fireShow">
          <transition name='fade'>
            <img src="../b.png" alt="" style="position: absolute;left: -147px;top: -133px;width: 146px;" v-show="lineShow">
          </transition>
          <transition name='fade'>
            <img src="../g.png" alt="" style="position:absolute;left:-60px;top:-101px;width:8px;transform:rotate(-105deg)" v-show="lineShow && line2">
          </transition>
          <transition name='fade'>
            <img src="../g.png" alt="" style="position:absolute;left:-16px;top:-44px;width:8px;transform:rotate(-77deg)" v-show="lineShow && line1">
          </transition>
          <transition name='fade'>
            <img src="../b1.png" alt="" style="position: absolute;left: -14px;top: -27px;width: 374px;" v-show="lineShow">
          </transition>
          <transition name='fade'>
            <img src="../f.png" alt="" style="position:absolute;left:8px;top:-28px;width:8px;transform:rotate(-34deg)" v-show="lineShow && line1">
          </transition>
          <transition name='fade'>
            <img src="../f.png" alt="" style="position:absolute;left:82px;top:84px;width:8px;transform:rotate(12deg)" v-show="lineShow && line2">
          </transition>
          <transition name='fade'>
            <img src="../f.png" alt="" style="position:absolute;left:282px;top:78px;width:8px;transform:rotate(-68deg)" v-show="lineShow && line3">
          </transition>
      </div>
      <div v-for="(item,index) in data" :key='index'>
        <!-- <div  class="point" :style="item.position">{{item.state}}</div> -->
        <div  :class="item.state=='true'?'points':'point'" :style="item.position" @click="showLog(index)"></div>
        <div :style="item.positions" :class="item.state=='true'?'ttt':'tt'" v-if="item.isshow">
          <p>编号：{{item.no}}</p>
          <p>状态：{{item.state=='true'?'正常':'损坏'}}</p>
        </div>
      </div>
    </div>
    <!-- 右 -->
    <div>
      <!-- tips -->
      <div class="tips">
        <img src="../news.png" alt="">
        <p>状态总览</p>
        <ul class="list">
          <li>
            <img src="../all.png" alt="">
            <div>
              <p>一层灭火器总数</p>
              <p>{{data.length}}</p>
            </div>
          </li>
          <li>
            <img src="../good.png" alt="">
            <div>
              <p>正常灭火器</p>
              <p>{{data.length-clear.length}}</p>
            </div>
          </li>
          <li>
            <img src="../bad.png" alt="">
            <div>
              <p>损坏灭火器</p>
              <p>{{clear.length}}</p>
            </div>
          </li>
        </ul>
        <div class="msg">
          损坏灭火器编号:
          <div>
            <span v-for="(num,index) in clear" :key="index"> {{num.no}}</span>        
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      line1:false,
      line2:false,
      line3:false,
      fireNum:0,
      fireShow:false,
      lineShow:false,
      clear:[
      ],
      data:[
        {position:'position:absolute;left:352px;top:35px;',positions:'position:absolute;left:364px;top:-69px;',state:'true',no:'S1-001',isshow:false},
        {position:'position:absolute;left:330px;top:118px;',positions:'position:absolute;left:342px;top:14px;',state:'false',no:'S1-002',isshow:false},
        {position:'position:absolute;left:134px;top:160px;',positions:'position:absolute;left:145px;top:45px;',state:'false',no:'S1-003',isshow:false},
        {position:'position:absolute;left:312px;top:246px;',positions:'position:absolute;left:324px;top:142px;',state:'true',no:'S1-004',isshow:false},
        {position:'position:absolute;left:114px;top:240px;',positions:'position:absolute;left:126px;top:136px;',state:'true',no:'S1-005',isshow:false},
        {position:'position:absolute;left:136px;top:338px;',positions:'position:absolute;left:148px;top:234px;',state:'true',no:'S1-006',isshow:false},
        {position:'position:absolute;left:172px;top:302px;',positions:'position:absolute;left:184px;top:198px;',state:'true',no:'S1-007',isshow:false},
        {position:'position:absolute;left:402px;top:275px;',positions:'position:absolute;left:414px;top:171px;',state:'true',no:'S1-008',isshow:false},
        {position:'position:absolute;left:390px;top:362px;',positions:'position:absolute;left:402px;top:258px;',state:'true',no:'S1-009',isshow:false},
        {position:'position:absolute;left:472px;top:372px;',positions:'position:absolute;left:484px;top:268px;',state:'true',no:'S1-010',isshow:false},
        {position:'position:absolute;left:555px;top:484px;',positions:'position:absolute;left:567px;top:380px;',state:'true',no:'S1-011',isshow:false},
        {position:'position:absolute;left:144px;top:536px;',positions:'position:absolute;left:156px;top:432px;',state:'false',no:'S1-012',isshow:false},
        {position:'position:absolute;left:250px;top:536px;',positions:'position:absolute;left:264px;top:432px;',state:'false',no:'S1-013',isshow:false},
        {position:'position:absolute;left:616px;top:550px;',positions:'position:absolute;left:628px;top:446px;',state:'true',no:'S1-014',isshow:false},
        {position:'position:absolute;left:552px;top:550px;',positions:'position:absolute;left:564px;top:446px;',state:'true',no:'S1-015',isshow:false},
        {position:'position:absolute;left:150px;top:572px;',positions:'position:absolute;left:162px;top:468px;',state:'true',no:'S1-016',isshow:false},
        {position:'position:absolute;left:264px;top:598px;',positions:'position:absolute;left:276px;top:494px;',state:'true',no:'S1-017',isshow:false},
        {position:'position:absolute;left:330px;top:596px;',positions:'position:absolute;left:342px;top:492px;',state:'true',no:'S1-018',isshow:false},
        {position:'position:absolute;left:366px;top:510px;',positions:'position:absolute;left:378px;top:406px;',state:'false',no:'S1-019',isshow:false},
      ]
    }
  },
  mounted(){
    this.getNeedClear();
    setInterval(()=>{  
      this.data=[
        {position:'position:absolute;left:352px;top:35px;',positions:'position:absolute;left:364px;top:-69px;',state:'true',no:'S1-001',isshow:false},
        {position:'position:absolute;left:330px;top:118px;',positions:'position:absolute;left:342px;top:14px;',state:'false',no:'S1-002',isshow:false},
        {position:'position:absolute;left:134px;top:160px;',positions:'position:absolute;left:145px;top:45px;',state:Math.random()>0.5?'true':'false',no:'S1-003',isshow:false},
        {position:'position:absolute;left:312px;top:246px;',positions:'position:absolute;left:324px;top:142px;',state:Math.random()>0.5?'true':'false',no:'S1-004',isshow:false},
        {position:'position:absolute;left:114px;top:240px;',positions:'position:absolute;left:126px;top:136px;',state:Math.random()>0.5?'true':'false',no:'S1-005',isshow:false},
        {position:'position:absolute;left:136px;top:338px;',positions:'position:absolute;left:148px;top:234px;',state:'true',no:'S1-005',isshow:false},
        {position:'position:absolute;left:172px;top:302px;',positions:'position:absolute;left:184px;top:198px;',state:Math.random()>0.5?'true':'false',no:'S1-007',isshow:false},
        {position:'position:absolute;left:402px;top:275px;',positions:'position:absolute;left:414px;top:171px;',state:Math.random()>0.5?'true':'false',no:'S1-008',isshow:false},
        {position:'position:absolute;left:390px;top:362px;',positions:'position:absolute;left:402px;top:258px;',state:Math.random()>0.5?'true':'false',no:'S1-009',isshow:false},
        {position:'position:absolute;left:472px;top:372px;',positions:'position:absolute;left:484px;top:268px;',state:Math.random()>0.5?'true':'false',no:'S1-010',isshow:false},
        {position:'position:absolute;left:555px;top:484px;',positions:'position:absolute;left:567px;top:380px;',state:Math.random()>0.5?'true':'false',no:'S1-011',isshow:false},
        {position:'position:absolute;left:144px;top:536px;',positions:'position:absolute;left:156px;top:432px;',state:Math.random()>0.5?'true':'false',no:'S1-012',isshow:false},
        {position:'position:absolute;left:250px;top:536px;',positions:'position:absolute;left:264px;top:432px;',state:Math.random()>0.5?'true':'false',no:'S1-013',isshow:false},
        {position:'position:absolute;left:616px;top:550px;',positions:'position:absolute;left:628px;top:446px;',state:Math.random()>0.5?'true':'false',no:'S1-014',isshow:false},
        {position:'position:absolute;left:552px;top:550px;',positions:'position:absolute;left:564px;top:446px;',state:Math.random()>0.5?'true':'false',no:'S1-015',isshow:false},
        {position:'position:absolute;left:150px;top:572px;',positions:'position:absolute;left:162px;top:468px;',state:Math.random()>0.5?'true':'false',no:'S1-016',isshow:false},
        {position:'position:absolute;left:264px;top:598px;',positions:'position:absolute;left:276px;top:494px;',state:Math.random()>0.5?'true':'false',no:'S1-017',isshow:false},
        {position:'position:absolute;left:330px;top:596px;',positions:'position:absolute;left:342px;top:492px;',state:Math.random()>0.5?'true':'false',no:'S1-018',isshow:false},
        {position:'position:absolute;left:366px;top:510px;',positions:'position:absolute;left:378px;top:406px;',state:'false',no:'S1-019',isshow:false},
      ]
    },40000);  
    this.fire();
  },
  watch:{
    'data':function getNeedClear(){
      this.clear=[];
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].state=='false'){
          if(!~this.clear.indexOf(this.data[i])){
            this.clear.push(this.data[i]);
          }
        }
      }
    },
    'clear':function deleteIt(no){

    }
  },
  methods: {
    fire(){
      setInterval(()=>{
        this.lineShow=false;
        // 火花
        setInterval(()=>{
          this.fireShow=true;
        },500);
        setInterval(()=>{
          this.fireShow=false;
        },1000);
        setTimeout(()=>{
          this.fireNum=1;
        },1000)
        setTimeout(()=>{
          this.lineShow=true;
          this.threeLine();
        },5000)
        // 第二个火源
        setTimeout(()=>{
          this.fireNum=2;
          this.lineShow=false;
          setTimeout(()=>{
            this.lineShow=true;
            this.threeLine();
          },5000)
          // 第一个
          setTimeout(()=>{
            this.fireNum=0;
          },10000)
        },10000);
      },20000)
    },
    threeLine(){
      this.line1=false;
      this.line2=false;
      this.line3=false;
      setTimeout(()=>{
        this.line1=true;
      },1000)
      setTimeout(()=>{
        this.line2=true;
      },2000)         
      setTimeout(()=>{
        this.line3=true;
      },3000)      
    },
    getNeedClear(){
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].state=='false'){
          if(!~this.clear.indexOf(this.data[i])){
            this.clear.push(this.data[i]);
          }
        }
      }
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
  width: 634px;
  height: 650px;
  margin-left: 80px;
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
  width: 20px;
  height: 20px;
  background-image: url(../red.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.points{
  width: 13px;
  height: 20px;
  background-image: url(../green.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.tips{
  width: 471px;
  height: 363px;
  background-size: cover;
  background-repeat: no-repeat;
  // margin-left: 62px;
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
  top: 24px;
  margin-right: 10px;
}
.tips>img{
  margin-left: -80px;
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
  width: 306px;
  height: 106px;
  background: url(../detailb.png) no-repeat;
  color: #fff;
  padding-left: 160px;
}
.ttt{
  width: 306px;
  height: 106px;
  background: url(../detailg.png) no-repeat;
  color: #fff;
  padding-left: 160px;
}
ul{
  list-style: none;
  padding: 0;
  margin-top:-50px;
  font-size: 16px;
}
ul>li{
  width: 180px;
  display: inline-block;
}
ul>li:nth-child(2){
  margin-left: 55px;
}
ul>li>div{
  display: inline-block;
}
li>div>p:first-child{
  color: #03A0E6;
  font-size: 14px;
}
.tips > div.msg{
  margin-top: 26px;
  color: #03A0E6;
}
.msg>div{
  width: 280px;
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
}
.msg>div>span{
  margin-right: 80px;
}
.tips>p{
  position: relative;
  top: -54px;
  left: 10px;
  color: #03A0E6;
}
.line{
  text-align: left;
  position: relative;
  top: -16px;
}
.line>p>span{
  margin-left: 9px;
}
.fire{
  display: inline-block;
  position: absolute;
  top: 73px;
  left: 272px;
}
.fire2{
  display: inline-block;
  position: absolute;
  top: 470px;
  left: 296px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
