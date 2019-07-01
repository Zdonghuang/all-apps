<template>
  <div class="home clearfloat">
    <!-- 左 -->
    <div class="map">
      <div v-for="(item,index) in data" :key='index'>
        <!-- <div  class="point" :style="item.position">{{item.state}}</div> -->
        <div  :class="item.state=='true'?'points':'point'" :style="item.position" @click="showLog(index)"></div>
        <div :style="item.positions" :class="item.state=='true'?'ttt':'tt'" v-if="item.isshow">
          <p>编号：{{item.no}}</p>
          <p>状态：{{item.state=='true'?'正常':'已满'}}</p>
        </div>
      </div>
    </div>
    <!-- 右 -->
    <div>
      <!-- 日历 -->
      <div class="calendar">
        <div class="title">
            <h1 class="green" id="calendar-title">Month</h1>
            <a href="" id="pre"></a>
            <a href="" id="next"></a>
        </div>
        <div class="body">
            <div class="lightgrey body-list">
                <ul>
                    <li>SUN</li>
                    <li>MON</li>
                    <li>TUE</li>
                    <li>WED</li>
                    <li>THU</li>
                    <li>FRI</li>
                    <li>SAT</li>    
                </ul>
            </div>
            <div class="darkgrey body-list">
                <ul id="days">
                </ul>
            </div>
        </div>
        <!-- 提示 -->
        <div class="notice">
          <span>今日事件</span>
          <img src="../notice.png" alt="">
          <span class="last_notice">晚上23:00处理所有垃圾桶</span>
        </div>
      </div>
      <!-- tips -->
      <div class="tips">
        <h4>最新动态</h4>
        <div v-for="(num,index) in clear.slice(0,7)" :key="index">
          <img src="../icon.png" alt="">
          {{num.no}}状态：<span>已满</span>等待处理
          <img src="../clear.png" alt="" class="cimg" @click="deleteIt(num.no)">
        </div>
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
      data:[
        {position:'position:absolute;left:221px;top:76px;',positions:'position:absolute;left:228px;top:-8px;',state:'false',no:'A001',isshow:false},
        {position:'position:absolute;left:217px;top:147px;',positions:'position:absolute;left:226px;top:65px;',state:'true',no:'A002',isshow:false},
        {position:'position:absolute;left:217px;top:200px;',positions:'position:absolute;left:226px;top:118px;',state:'false',no:'A003',isshow:false},
        {position:'position:absolute;left:212px;top:319px;',positions:'position:absolute;left:222px;top:236px;',state:'true',no:'A004',isshow:false},
        {position:'position:absolute;left:214px;top:424px;',positions:'position:absolute;left:222px;top:342px;',state:'true',no:'A005',isshow:false},
        {position:'position:absolute;left:214px;top:514px;',positions:'position:absolute;left:222px;top:432px;',state:'true',no:'A006',isshow:false},
        {position:'position:absolute;left:262px;top:524px;',positions:'position:absolute;left:268px;top:438px;',state:'true',no:'A007',isshow:false},
        {position:'position:absolute;left:304px;top:499px;',positions:'position:absolute;left:310px;top:416px;',state:'true',no:'A008',isshow:false},
        {position:'position:absolute;left:352px;top:206px;',positions:'position:absolute;left:358px;top:122px;',state:'true',no:'A009',isshow:false},
        {position:'position:absolute;left:368px;top:253px;',positions:'position:absolute;left:372px;top:170px;',state:'true',no:'A010',isshow:false},
        {position:'position:absolute;left:392px;top:311px;',positions:'position:absolute;left:398px;top:226px;',state:'true',no:'A011',isshow:false},
        {position:'position:absolute;left:322px;top:402px;',positions:'position:absolute;left:328px;top:318px;',state:'true',no:'A012',isshow:false},
        {position:'position:absolute;left:250px;top:58px;',positions:'position:absolute;left:254px;top:-26px;',state:'true',no:'A013',isshow:false},
        {position:'position:absolute;left:300px;top:58px;',positions:'position:absolute;left:304px;top:-26px;',state:'true',no:'A014',isshow:false},
        {position:'position:absolute;left:350px;top:58px;',positions:'position:absolute;left:354px;top:-26px;',state:'true',no:'A015',isshow:false},
      ]
    }
  },
  mounted(){
    setInterval(()=>{  
      this.data=[
        // {position:'position:absolute;left:221px;top:76px;',state:Math.random()>0.5?'true':'false',no:0},
        {position:'position:absolute;left:221px;top:76px;',positions:'position:absolute;left:228px;top:-8px;',state:Math.random()>0.5?'true':'false',no:'A001',isshow:false},
        {position:'position:absolute;left:217px;top:147px;',positions:'position:absolute;left:226px;top:65px;',state:Math.random()>0.5?'true':'false',no:'A002',isshow:false},
        {position:'position:absolute;left:217px;top:200px;',positions:'position:absolute;left:226px;top:118px;',state:Math.random()>0.5?'true':'false',no:'A003',isshow:false},
        {position:'position:absolute;left:212px;top:319px;',positions:'position:absolute;left:222px;top:236px;',state:Math.random()>0.5?'true':'false',no:'A004',isshow:false},
        {position:'position:absolute;left:214px;top:424px;',positions:'position:absolute;left:222px;top:342px;',state:Math.random()>0.5?'true':'false',no:'A005',isshow:false},
        {position:'position:absolute;left:214px;top:514px;',positions:'position:absolute;left:222px;top:432px;',state:Math.random()>0.5?'true':'false',no:'A006',isshow:false},
        {position:'position:absolute;left:262px;top:524px;',positions:'position:absolute;left:268px;top:438px;',state:Math.random()>0.5?'true':'false',no:'A007',isshow:false},
        {position:'position:absolute;left:304px;top:499px;',positions:'position:absolute;left:310px;top:416px;',state:Math.random()>0.5?'true':'false',no:'A008',isshow:false},
        {position:'position:absolute;left:352px;top:206px;',positions:'position:absolute;left:358px;top:122px;',state:Math.random()>0.5?'true':'false',no:'A009',isshow:false},
        {position:'position:absolute;left:368px;top:253px;',positions:'position:absolute;left:372px;top:170px;',state:Math.random()>0.5?'true':'false',no:'A010',isshow:false},
        {position:'position:absolute;left:392px;top:311px;',positions:'position:absolute;left:398px;top:226px;',state:Math.random()>0.5?'true':'false',no:'A011',isshow:false},
        {position:'position:absolute;left:322px;top:402px;',positions:'position:absolute;left:328px;top:318px;',state:Math.random()>0.5?'true':'false',no:'A012',isshow:false},
        {position:'position:absolute;left:250px;top:58px;',positions:'position:absolute;left:254px;top:-26px;',state:Math.random()>0.5?'true':'false',no:'A013',isshow:false},
        {position:'position:absolute;left:300px;top:58px;',positions:'position:absolute;left:304px;top:-26px;',state:Math.random()>0.5?'true':'false',no:'A014',isshow:false},
        {position:'position:absolute;left:350px;top:58px;',positions:'position:absolute;left:354px;top:-26px;',state:Math.random()>0.5?'true':'false',no:'A015',isshow:false},
      ]
    },20000);
    this.date();
    this.getNeedClear();
  },
  watch:{
    'data':function getNeedClear(){
      this.clear=[];
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].state=='false'){
          if(this.clear.indexOf(this.data[i]) == -1){
            this.clear.push(this.data[i]);
          }
        }
      }
    },
    'clear':function deleteIt(no){
      // for(let j=0;j<this.clear.length;j++){
      //   if(this.clear[j].no==no){
      //     console.log('pop',this.clear[j]);
      //     this.clear.pop(this.clear[j]);
      //   }
      // }
      // for(let i=0;i<this.data.length;i++){
      //   if(this.data[i].state=='false'&&this.clear.length<7){
      //     if(this.clear.indexOf(this.data[i]) == -1){
      //       this.clear.push(this.data[i]);
      //     }
      //   }
      // }
    }
  },
  methods: {
    date(){
      var month_olypic = [31,29,31,30,31,30,31,31,30,31,30,31];//闰年每个月份的天数
        var month_normal = [31,28,31,30,31,30,31,31,30,31,30,31];
        var month_name =["1","2","3","4","5","6","7","8","9","10","11","12"];
        //获取以上各个部分的id
        var holder = document.getElementById("days");
        var prev = document.getElementById("prev");
        var next = document.getElementById("next");
        var ctitle = document.getElementById("calendar-title");
        //获取当天的年月日
        var my_date = new Date();
        var my_year = my_date.getFullYear();//获取年份
        var my_month = my_date.getMonth(); //获取月份，一月份的下标为0
        var my_day = my_date.getDate();//获取当前日期
 
        //根据年月获取当月第一天是周几
        function dayStart(month,year){
            var tmpDate = new Date(year, month, 1);
            return (tmpDate.getDay());
        }
        //根据年份判断某月有多少天(11,2018),表示2018年12月
        function daysMonth(month, year){
            var tmp1 = year % 4;
            var tmp2 = year % 100;
            var tmp3 = year % 400;
 
            if((tmp1 == 0 && tmp2 != 0) || (tmp3 == 0)){
                return (month_olypic[month]);//闰年
            }else{
                return (month_normal[month]);//非闰年
            }
        }
        //js实现str插入li+class,不要忘了用innerhtml进行插入
        function refreshDate(){
            var str = "";
            //计算当月的天数和每月第一天都是周几，day_month和day_year都从上面获得
            var totalDay = daysMonth(my_month,my_year);
            var firstDay = dayStart(my_month, my_year);
            //添加每个月的空白部分
            for(var i = 0; i < firstDay; i++){
                str += "<li>"+"</li>";
            }
 
            //从一号开始添加知道totalDay，并为pre，next和当天添加样式
            var myclass;
            for(var i = 1; i <= totalDay; i++){
                //三种情况年份小，年分相等月份小，年月相等，天数小
                //点击pre和next之后，my_month和my_year会发生变化，将其与现在的直接获取的再进行比较
                //i与my_day进行比较,pre和next变化时，my_day是不变的
                // console.log(my_year+" "+my_month+" "+my_day);
                // console.log(my_date.getFullYear()+" "+my_date.getMonth()+" "+my_date.getDay());
                if((my_year < my_date.getFullYear())||(my_year == my_date.getFullYear() && my_month < my_date.getMonth()) || (my_year == my_date.getFullYear() && my_month == my_date.getMonth() && i < my_day)){
                    myclass = " class='lightgrey'";
                }else if(my_year == my_date.getFullYear() && my_month == my_date.getMonth() && i == my_day){
                    myclass = "class = 'green greenbox'";
                }else{
                    myclass = "class = 'darkgrey'";
                }
                str += "<li "+myclass+">"+i+"</li>";
            }
            holder.innerHTML = str;
            ctitle.innerHTML = my_year+'年 · '+month_name[my_month]+'月';
        }
        //调用refreshDate()函数，日历才会出现
        refreshDate();
        //实现onclick向前或向后移动
        pre.onclick = function(e){
            e.preventDefault();
            my_month--;
            if(my_month < 0){
                my_year--;
                my_month = 11; //即12月份
            }
            refreshDate();
        }
        
        next.onclick = function(e){
            e.preventDefault();
            my_month++;
            if(my_month > 11){
                my_month = 0;
                my_year++;
            }
            refreshDate();
        }
    },
    getNeedClear(){
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].state=='false'){
          if(this.clear.indexOf(this.data[i]) == -1){
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
  width: 384px;
  height: 660px;
  margin: 0 110px;
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
  background-image: url(../red.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.points{
  width: 6px;
  height: 9px;
  background-image: url(../green.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.calendar{
  width: 450px;
  height: 300px;
  background: transparent;
  box-shadow: 0px 1px 1px rgba(0,0,0,.1);
  position: relative;
}

.title{
  height: 40px;
  border-bottom: 1px solid rgba(0,0,0,.1);
  position: relative;
  text-align: center;
}

#calendar-title{
  font-size: 15px;
  text-transform: uppercase;
  font-family: Arial, Helvetica, sans-serif;
  padding: 14px 54px;
  text-align: left;
}

#pre{
position: absolute;
top: 0px;
left: 0px;
background: url(prev.png) no-repeat 50% 50%;

/*没规定大小时，图片显示 0X0*/
width: 60px;
height: 70px;

}

#next{
position: absolute;
top: 0px;
right: 0px;
background: url(next.png) no-repeat 50% 50%;
width: 60px;
height: 70px;
}  

.body-list ul{
font-size: 15px;
font-family: Arial, Helvetica, sans-serif;
font-weight: bold;
width: 100%;
box-sizing: border-box;

}  

.body-list ul li{
  color:#03A0E6;
  list-style: none;
  /*
  display:inline-block; 
  width: 13.3%;
  */

  /*100/7 = 14.28%*/
  display: block;
  width: 14.28%;
  float: left;

  /*规定行高，垂直居中*/
  height: 36px;
  line-height: 36px;
  box-sizing: border-box;
  text-align: center;
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

/*日期当天用绿色背景绿色文字加以显示*/
.body-list ul li.greenbox{
  border: 1px solid #03A0E6;
  background: #03A0E6;
  color: #fff;
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
  width: 268px;
  height: 100px;
  background: url(../fill.png) left top no-repeat, url(../fills.png) right top no-repeat;
  color: #fff;
  padding-left: 160px;
}
.ttt{
  width: 268px;
  height: 100px;
  background: url(../full.png) left top no-repeat, url(../fulls.png) right top no-repeat;
  color: #fff;
  padding-left: 160px;
}
</style>
