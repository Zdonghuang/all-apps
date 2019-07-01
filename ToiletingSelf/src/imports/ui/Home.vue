<template>
  <div class="home">
    <div class="toilet">
      <h1>L商城入厕指南</h1>
      <ul class="area">
        <li :class="{orange:areaChange}" @click="areaE">E区</li>
        <li :class="{orange:!areaChange}">W区</li>
      </ul>
      <div class="sex">
        <img :src="sexChoose?'/Nan_hover.png':'/Nan_normal.png'" width="35" @click="manChoose">
        <img :src="!sexChoose?'/Nv_hover.png':'/Nv_normal.png'" width="35" @click="womanChoose">
      </div>
      <Map v-show="showMap" :floor="thisFloor" :area="showArea" :sex="sexce"> <p class="this_floor">{{thisFloor}}</p> </Map>
      <p class="guide_info" v-show="!showMap">已为您推荐<span class="orange_font_color">{{thisFloor+showArea}}</span>的 <span >{{sexce}}</span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您还可选择 <span style="color:#01AEF3;" @click="showMapN">导航</span> </p>
      <div class="toilet_box" v-show="!showMap">
          <div class="toilet_content" v-for="(item,index) in Toilet_Data" :key="index">
            <span>{{item.floor}}</span>
            <div class="toilet_num" v-for="(itm,index) in item.area" :key="index">
              <h3>{{itm.toilet_area}}</h3>
              <div class="img" v-for="(image,index) in itm.toilet_num" :key="index" 
                      :style="{backgroundImage:'url(' + image.bg + ')'}">
                      <span v-show="image.timeshow">{{image.time}}</span>
              </div>
            </div>
          </div>
      </div>

      <ul class="sigh_imgs">
        <li> <img src="/kongxian.png" width="50" height="50"> <p>空闲</p></li>
        <li> <img src="/notfound.png" width="50" height="50"> <p>已损坏</p></li>
        <li> <img src="/zhan.png" width="50" height="50"> <p>已占用</p></li>
        <li> <img src="/zhan10minyishagn.png" width="50" height="50"> <p>已占用10分钟</p></li>
      </ul>
    </div>
  </div>
</template>
<script>
var toilet_Data = [{floor:'一层',area:[{toilet_area:'E1',toilet_num:[{bg:'/kongxian.png',time:'00:00',num:2,area:'E1',floor:'一层',miles:1000,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E1',floor:'一层',miles:1000,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:3,area:'E1',floor:'一层',miles:1000,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E1',floor:'一层',miles:1000,timeshow:false}]},
                                      {toilet_area:'E2',toilet_num:[{bg:'/kongxian.png',time:'00:00',num:2,area:'E2',floor:'一层',miles:300,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:2,area:'E2',floor:'一层',miles:300,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E2',floor:'一层',miles:300,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E2',floor:'一层',miles:300,timeshow:true}]},
                                      {toilet_area:'E3',toilet_num:[{bg:'/kongxian.png',time:'00:00',num:2,area:'E3',floor:'一层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E3',floor:'一层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E3',floor:'一层',miles:500,timeshow:false},{bg:'/kongxian.png',time:"00:00",num:1,area:'E3',floor:'一层',miles:500,timeshow:false}]}] },

                  {floor:'二层',area:[{toilet_area:'E1',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:1,area:'E1',floor:'二层',miles:1000,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:1,area:'E1',floor:'二层',miles:1000,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:2,area:'E1',floor:'二层',miles:1000,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:2,area:'E1',floor:'二层',miles:1000,timeshow:true}]},
                                     {toilet_area:'E2',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:2,area:'E2',floor:'二层',miles:300,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E2',floor:'二层',miles:300,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:3,area:'E2',floor:'二层',miles:300,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E2',floor:'二层',miles:300,timeshow:false}]},
                                     {toilet_area:'E3',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:3,area:'E3',floor:'二层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E3',floor:'二层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E3',floor:'二层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E3',floor:'二层',miles:500,timeshow:false}]}] },

                  {floor:'三层',area:[{toilet_area:'E1',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:1,area:'E1',floor:'三层',miles:1000,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:3,area:'E1',floor:'三层',miles:1000,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:2,area:'E1',floor:'三层',miles:1000,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E1',floor:'三层',miles:1000,timeshow:true}]},
                                      {toilet_area:'E2',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:1,area:'E2',floor:'三层',miles:300,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:3,area:'E2',floor:'三层',miles:300,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:2,area:'E2',floor:'三层',miles:300,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:2,area:'E2',floor:'三层',miles:300,timeshow:true}]},
                                      {toilet_area:'E3',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:1,area:'E3',floor:'三层',miles:500,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:3,area:'E3',floor:'三层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:2,area:'E3',floor:'三层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E3',floor:'三层',miles:500,timeshow:false}]}] },

                  {floor:'四层',area:[{toilet_area:'E1',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:2,area:'E1',floor:'四层',miles:1000,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E1',floor:'四层',miles:1000,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:2,area:'E1',floor:'四层',miles:1000,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E1',floor:'四层',miles:1000,timeshow:true}]},
                                      {toilet_area:'E2',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:1,area:'E2',floor:'四层',miles:300,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:1,area:'E2',floor:'四层',miles:300,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:1,area:'E2',floor:'四层',miles:300,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:2,area:'E2',floor:'四层',miles:300,timeshow:true}]},
                                      {toilet_area:'E3',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:3,area:'E3',floor:'四层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:2,area:'E3',floor:'四层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E3',floor:'四层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E3',floor:'四层',miles:500,timeshow:false}]}] }];


var toilet_Data_w = [{floor:'一层',area:[{toilet_area:'E1',toilet_num:[{bg:'/kongxian.png',time:'00:00',num:1,area:'E1',floor:'一层',miles:1000,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E1',floor:'一层',miles:1000,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:3,area:'E1',floor:'一层',miles:1000,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E1',floor:'一层',miles:1000,timeshow:false}]},
                                      {toilet_area:'E3',toilet_num:[{bg:'/kongxian.png',time:'00:00',num:2,area:'E3',floor:'一层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E3',floor:'一层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E3',floor:'一层',miles:500,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:1,area:'E3',floor:'一层',miles:500,timeshow:false}]},
                                      {toilet_area:'E3',toilet_num:[{bg:'/kongxian.png',time:'00:00',num:2,area:'E3',floor:'一层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E3',floor:'一层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E3',floor:'一层',miles:500,timeshow:false},{bg:'/kongxian.png',time:"00:00",num:1,area:'E3',floor:'一层',miles:500,timeshow:false}]}] },

                  {floor:'二层',area:[{toilet_area:'E1',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:1,area:'E1',floor:'二层',miles:1000,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:1,area:'E1',floor:'二层',miles:1000,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:2,area:'E1',floor:'二层',miles:1000,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:2,area:'E1',floor:'二层',miles:1000,timeshow:true}]},
                                     {toilet_area:'E2',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:2,area:'E2',floor:'二层',miles:300,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E2',floor:'二层',miles:300,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:3,area:'E2',floor:'二层',miles:300,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E2',floor:'二层',miles:300,timeshow:false}]},
                                     {toilet_area:'E3',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:3,area:'E3',floor:'二层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E3',floor:'二层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E3',floor:'二层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E3',floor:'二层',miles:500,timeshow:false}]}] },

                  {floor:'三层',area:[{toilet_area:'E1',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:1,area:'E1',floor:'三层',miles:1000,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:3,area:'E1',floor:'三层',miles:1000,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:2,area:'E1',floor:'三层',miles:1000,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E1',floor:'三层',miles:1000,timeshow:true}]},
                                      {toilet_area:'E2',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:1,area:'E2',floor:'三层',miles:300,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:3,area:'E2',floor:'三层',miles:300,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:2,area:'E2',floor:'三层',miles:300,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:2,area:'E2',floor:'三层',miles:300,timeshow:true}]},
                                      {toilet_area:'E3',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:1,area:'E3',floor:'三层',miles:500,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:3,area:'E3',floor:'三层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:2,area:'E3',floor:'三层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E3',floor:'三层',miles:500,timeshow:false}]}] },

                  {floor:'四层',area:[{toilet_area:'E1',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:2,area:'E1',floor:'四层',miles:1000,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E1',floor:'四层',miles:1000,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:2,area:'E1',floor:'四层',miles:1000,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E1',floor:'四层',miles:1000,timeshow:true}]},
                                      {toilet_area:'E2',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:1,area:'E2',floor:'四层',miles:300,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:1,area:'E2',floor:'四层',miles:300,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:1,area:'E2',floor:'四层',miles:300,timeshow:false},{bg:'/kongxian.png',time:'00:00',num:2,area:'E2',floor:'四层',miles:300,timeshow:true}]},
                                      {toilet_area:'E3',toilet_num:[ {bg:'/kongxian.png',time:'00:00',num:3,area:'E3',floor:'四层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:2,area:'E3',floor:'四层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:3,area:'E3',floor:'四层',miles:500,timeshow:true},{bg:'/kongxian.png',time:'00:00',num:1,area:'E3',floor:'四层',miles:500,timeshow:false}]}] }];


import Map from './map.vue'
export default {
  name:'home',
  components:{ Map },
  data(){
    return{
      areaChange:true,
      sexChoose:true,
      Toilet_Data:toilet_Data,
      TolietNum:[],//取出 toilet_num
      normalTolietNum:[], //所有楼层空闲的卫生间
      showMap:false,
      thisFloor:'一层', //显示当前层数
      showArea:'E2',  //显示当前区域,
      initialTimer:null,
      timer:null,
      setTimer:null, //随机数据时间设置
      sexce:'男厕'
    }
  },
  mounted(){
    this.processData(this.Toilet_Data)    
  },
  beforeDestroy() {
    clearInterval(this.setTimer);        
    clearInterval(this.timer);   
    clearInterval(this.initialTimer);    
    this.initialTimer = null; 
    this.setTimer = null;
    this.timer = null;
  },
  methods:{
    areaE(){
      this.areaChange = true;
    },
    // areaW(){
    //   this.areaChange = false;
    // },
    manChoose(){
      this.sexChoose = true;
      this.showMap = false

      this.thisFloor = '请稍后'
      this.showArea = '. . .'

      this.sexce = '男厕'
      // clearInterval(this.timer)
      this.Toilet_Data = toilet_Data
      this.processData(this.Toilet_Data)
    },
    womanChoose(){
      this.sexChoose = false;
      this.showMap = false

      this.thisFloor = '请稍后'
      this.showArea = '. . .'

      this.sexce = '女厕'

      // clearInterval(this.timer)
       this.Toilet_Data = []
      this.Toilet_Data = toilet_Data_w;
      this.processData(this.Toilet_Data)
    },
    showMapN(){
      this.showMap = true;
    },
    processData(ToiletData){
      // clearInterval(this.timer) //清除 随机时间
      let _this = this
      var areaToliet = [];
      var arrToliet = []; 
      
      // 展示各个楼层
      var floor1 = [];
      var floor2 = [];
      var floor3 = [];
      var floor4 = [];

      var floors = []; //当前楼层厕所 判断楼层推荐公厕
      
      this.TolietNum = [] //所有公厕
      ToiletData.reduce((prev,cur,index,array)=>{ areaToliet.push(array) })
      
      for( var i =0; i<areaToliet[0].length; i++){
        for( var j =0; j<areaToliet[0][i].area.length; j++){
          arrToliet.push(areaToliet[0][i].area[j].toilet_num);
          var toiletInfo = areaToliet[0][i].area[j].toilet_num;
          for(var z=0; z<toiletInfo.length; z++){
            this.TolietNum.push(toiletInfo[z]); //拆分数据 取出 toilet_num
          }
        }
      }

      this.$nextTick(function(){
        this.disData();
      })
      //默认执行初始数据

      this.timer = setInterval(()=>{
        // clearInterval(this.setTimer)
        clearInterval(this.initialTimer);

        this.normalTolietNum = [];
        this.TolietNum.forEach((item,index)=>{
          

          //随机状态变化
          var plus = parseInt(3*Math.random())
          if(item.num<0){
            item.num += 5
          }else{
            item.num -= plus;
          }

          var n_sec = 0; //秒
          var n_min = 0; //分
          var showtime = item.time.split(':') //时间数据拆分

          if(item.num<=0){
            item.bg = "/notfound.png"
            item.timeshow = null;
            if(item.num==0) item.timeshow = false
          }else if(item.num==1){
            item.bg = "/kongxian.png"
            item.timeshow = null;
            if(item.num==1) item.timeshow = false
          }else if(item.num==2){
            item.bg = "/zhan.png"
            item.time = 00+':'+00;
           
            this.setTimer = setInterval(()=> {

              var str_sec = n_sec;
              var str_min = n_min;

              if ( n_sec < 10) {
                str_sec = "0" + n_sec;
              }
              if ( n_min < 10 ) {
                str_min = "0" + n_min;
              }
              item.time = str_min + ":" + str_sec;

              n_sec++;
              if (n_sec > 59){
                n_sec = 0;
                n_min++;
              }
            }, 1000)

            if(item.num==2)item.timeshow = true
           
          }else {
            // if((item.time.split(':')[0].slice(1)) >= 1)
            item.bg = "/zhan10minyishagn.png"
            item.time = 01+':'+00;

            // this.timer = setInterval(()=> {
            //   var str_sec = n_sec;
            //   var str_min = n_min;

            //   if(item.time==null){
            //     if ( n_sec < 10) {
            //       str_sec = "0" + n_sec;
            //     }
            //     if ( n_min < 10 ) {
            //       str_min = "0" + n_min;
            //     }
            //   }else{
            //     var showtime = item.time.split(':')
            //     if((showtime[0]-0) < 10){
            //       str_min = "0" + showtime[0]-0
            //     }
            //     if((showtime[1]-0) < 10){
            //       str_sec = "0" + n_sec
            //     }
            //   }
            //   n_sec++;
            //   if (n_sec > 59){
            //     n_sec = 0;
            //     str_min++ 
            //     // n_min++;
            //   }
            //   item.time = str_min + ":" + str_sec;
            // }, 1000)

            if(item.num==3)item.timeshow = true
          }
          if(item.num==1){this.normalTolietNum.push(item)}  //将所有能用的厕所push 进去
        })

          floor1 = []
          floor2 = []
          floor3 = []
          floor4 = []

        this.normalTolietNum.forEach((item,index)=>{
          switch(item.floor){
            case '一层':
              floor1.push(item);
              break;
            case '二层':
              floor2.push(item);
              break;
            case '三层':
              floor3.push(item);
              break;
            case '四层':
              floor4.push(item);
              break;
            default:          
          }
        })

        floors = [];

        if(floor1.length>0){
          floors = floor1;
          this.thisFloor = '一层'
        }else if(floor1.length==0&&floor2.length>0){
          floors = floor2;
          this.thisFloor = '二层'
        }else if(floor1.length==0&&floor2.length==0&&floor3.length>0){
          floors = floor3;
          this.thisFloor = '三层'
        }else if(floor1.length==0&&floor2.length==0&&floor3.length==0&&floor3.length>0){
          floors = floor4;
          this.thisFloor = '四层'
        }
        // 厕所距离从小到大排序 
        function sortNumber(a,b){
          return a.miles - b.miles
        }
        this.showArea = floors.sort(sortNumber)[0].area;

      },50000)

    },
    disData(){
      let _this = this;
      this.normalTolietNum = [];
      this.TolietNum.forEach((item,index)=>{
        //随机状态变化
        var plus = parseInt(3*Math.random())
        if(item.num<0){
          item.num += 5
        }else{
          item.num -= plus;
        }

        var n_sec = 0; //秒
        var n_min = 0; //分

        if(item.num<=0){
          item.bg = "/notfound.png"
          item.timeshow = null;
          if(item.num==0) item.timeshow = false
        }else if(item.num==1){
          item.bg = "/kongxian.png"
          item.timeshow = null;
          if(item.num==1) item.timeshow = false
        }else if(item.num==2){
          item.bg = "/zhan.png"
          item.time = 00+':'+00
          if(item.num==2)item.timeshow = true
        }else{
          item.time = 01+':'+00
          item.bg = "/zhan10minyishagn.png"

          // this.initialTimer = setInterval(()=> {
          //     var str_sec = n_sec;
          //     var str_min = n_min;

          //     if(item.time=='00:00'){
          //       if ( n_sec < 10) {
          //         str_sec = "0" + n_sec;
          //       }
          //       if ( n_min < 10 ) {
          //         str_min = "0" + n_min;
          //       }
          //     }else{
          //       var showtime = item.time.split(':')
          //       if((showtime[0]-0) < 10){
          //         str_min = "0" + showtime[0]-0
          //       }
          //       if((showtime[1]-0) < 9){
          //         str_sec = "0" + n_sec
          //       }
          //     }
          //     n_sec++;
          //     if (n_sec > 59){
          //       n_sec = 0;
          //       str_min++ 
          //       // n_min++;
          //     }

          //     item.time = str_min + ":" + str_sec;
          // }, 1000)

          if(item.num==3)item.timeshow = true
        }
        if(item.num==1){this.normalTolietNum.push(item)}  //将所有能用的厕所push 进去

        // this.initialTimer = setInterval(()=> {
        //     var str_sec = n_sec;
        //     var str_min = n_min;
            
        //     if ( n_sec < 10) {
        //       str_sec = "0" + n_sec;
        //     }
        //     if ( n_min < 10 ) {
        //       str_min = "0" + n_min;
        //     }

        //     item.time = str_min + ":" + str_sec;

        //     n_sec++;
        //     if (n_sec > 59){
        //       n_sec = 0;
        //       n_min++;
        //     }
        // }, 1000)

      })
      // clearInterval(this.initialTimer);

      floor1 = []
      floor2 = []
      floor3 = []
      floor4 = []

      this.normalTolietNum.forEach((item,index)=>{
        switch(item.floor){
          case '一层':
            floor1.push(item);
            break;
          case '二层':
            floor2.push(item);
            break;
          case '三层':
            floor3.push(item);
            break;
          case '四层':
            floor4.push(item);
            break;
          default:          
        }
      })

      floors = [];

      if(floor1.length>0){
        floors = floor1;
        this.thisFloor = '一层'
      }else if(floor1.length==0&&floor2.length>0){
        floors = floor2;
        this.thisFloor = '二层'
      }else if(floor1.length==0&&floor2.length==0&&floor3.length>0){
        floors = floor3;
        this.thisFloor = '三层'
      }else if(floor1.length==0&&floor2.length==0&&floor3.length==0&&floor3.length>0){
        floors = floor4;
        this.thisFloor = '四层'
      }
      // 厕所距离从小到大排序 
      function sortNumber(a,b){
        return a.miles - b.miles
      }
      this.showArea = floors.sort(sortNumber)[0].area;
    },

    //计时
    settingTime(time) {
      var n_sec = 0; //秒
      var n_min = 0; //分
      //60秒 === 1分
      setInterval(()=> {
        var str_sec = n_sec;
        var str_min = n_min;

        if ( n_sec < 10) {
          str_sec = "0" + n_sec;
        }
        if ( n_min < 10 ) {
          str_min = "0" + n_min;
        }

        time = str_min + ":" + str_sec;

        n_sec++;
        if (n_sec > 59){
          n_sec = 0;
          n_min++;
        }

        // console.log(time);

      }, 1000);
    },
  }
}

</script>


<style lang="less" scoped>
.home {
  margin: 0;
  width: 100%;
  height: 900px;
  background:radial-gradient(circle,rgba(84,38,158,1) 0%,rgba(55,38,82,1) 100%);
}
.toilet{
  color: #fff;
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.toilet>h1{
  padding-top: 28px;
  font-weight: 500;
  font-size: 30px;
  text-align: center;
}
.area,.sex{
  padding: 0;
  overflow: hidden;
  width: 124px;
  margin: 0 auto;
}
.area li{
  border: 1px solid #FFBF1B;
  border-radius: 4px;
  text-align: center;
  padding: 5px 0;
  list-style: none;
  width: 61px;
  float: left;
  cursor: pointer;
  
}
.area li:first-child{
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.area li:last-child{
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.guide_info span{
  cursor: pointer;
}
.sex img{
  float: left;
  margin: 25px 10px 10px 10px;
  cursor: pointer;
}
.sex img:last-child{
  float: right;
}
.sigh_imgs{
  list-style: none;
  position: absolute;
  top: 130px;
  right: 107px;
  overflow: hidden;
}
.sigh_imgs li{
  float: left;
  margin-left: 15px;
}
.sigh_imgs img{
  margin: 0;
}
.sigh_imgs li>p{
  margin: 0;
  text-align: center;
  font-size: 12px;
};
.toilet_box {
  padding: 0 30px;
  margin-top: 30px;
  overflow: hidden;
}

.toilet_content{
  overflow: hidden;
}

.toilet_content>span{
  float: left;
  line-height: 140px;
  margin-right: 25px;
}
.toilet_num{
  float: left;
}
.toilet_num:nth-child(odd){
  margin-right: 50px;
  margin-left: 50px;
}
.toilet_num>h3{
  text-align: center;
  margin: 0;
}
.toilet_num .img{
  display: inline-block;
  background-image: url('/kongxian.png');
  background-size: 100% 100%;
  width: 50px;
  height: 50px;
  margin: 15px 13px;
  cursor: pointer;
  position: relative;
}
.toilet_num .img>span{
  text-align: center;
  padding: 2px 0;
  width: 100%;
  line-height: 14px;
  font-size: 13px;
  position: absolute;
  bottom:0;
  left: 0;
  background-color: rgba(0,0,0,0.3)
}

.this_floor{
  position: absolute;
  bottom: 12px;
  left: 572px;
  font-size: 28px;
}


//区域背景色
.orange {
  width: 61px;
  background-color: #FFBF1B;
}
.orange_font_color{
  color: #FFBF1B;
}



</style>
