<template>
    <div class="home">
        <div class="menuNav">
            <div>
                <img src="../font.png" alt="" style="width:260px"/>
                <!-- <span>历史上的今天</span> -->
            </div>
        </div>
        <div class="contents clearfloat" v-if="limit&&error">
            <div class="things">
                <p>历史上的{{selectMonth}}月{{selectDay}}日都发生了什么</p>
                <!-- 时间轴 -->
                <div class="timezone">
                    <section id="cd-timeline" class="cd-container">
                        <div v-for="(item,index) in msg" :key="index"  class="cd-timeline-block" @click="goto(item._id)">
                            <div class="cd-timeline-img cd-picture"></div>
                            <div class="cd-timeline-content">
                                <h2>{{item.title}}</h2>
                                <img :src="item.pic" alt="" v-if="item.pic.length>0" />
                                <span class="cd-date">{{item.year}}-{{item.month}}-{{item.day}}</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <!-- 日历 -->
            <div id="calendar">
                <!-- 年份 月份 -->
                <div class="month">
                    <ul>
                        <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
                        <li class="year-month" @click="pickYear(currentYear,currentMonth)">
                            <span class="choose-year">{{ currentYear }}</span>
                            <span class="choose-month">{{ currentMonth }}月</span>
                        </li>
                        <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
                    </ul>
                </div>
                <!-- 星期 -->
                <ul class="weekdays">
                    <li>一</li>
                    <li>二</li>
                    <li>三</li>
                    <li>四</li>
                    <li>五</li>
                    <li style="color:#000">六</li>
                    <li style="color:#000">日</li>
                </ul>
                <!-- 日期 -->
                <ul class="days">
                    <li @click="pick(day)" v-for="(day,index) in days" :key=index>
                        <!--本月-->
                        <span v-if="day.getMonth()+1 != currentMonth" class="other-month" @click="day.getMonth()+1>currentMonth?pickNext(currentYear,currentMonth):pickPre(currentYear,currentMonth)">{{ day.getDate() }}</span>
                        <span v-else>
                        <!--今天-->
                        <span v-if="day.getFullYear() == selectYear && day.getMonth() == selectMonth-1 && day.getDate() == selectDay" class="active">{{ day.getDate() }}</span>
                        <span v-else>{{ day.getDate() }}</span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="!limit">
            <p class="limit">请求超过次数限制!</p>
        </div>
        <div v-if="!error">
            <p class="limit">第三方API暂不可用，请稍后再用！</p>
        </div>
    </div>
</template>
<script>
export default {
    name:'robot',
    data(){
        return{
            limit:true,
            error:true,
            info:'',
            msg:[],
            // 日历
            currentDay: 1,
            currentMonth: 1,
            currentYear: 1970,
            currentWeek: 1,
            days: [],
            // 选择的日期
            selectYear:1970,
            selectMonth:1,
            selectDay: 1,
        }
    },
    watch:{

    },
    created(){
       this.initData(null);
    },
    mounted(){
        this.selectDay = new Date().getDate();
        this.selectMonth = new Date().getMonth() + 1;
        this.selectYear = new Date().getFullYear();
        this.getInfo();
    },
    methods:{
        getInfo(){ 
            let _this = this;
            _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/lssjt_event?v=1.0&month='+this.selectMonth+'&day='+this.selectDay+'&appId=d3884721-a6c3-44f5-90ff-18f1896b24d9').then((res)=>{
                // console.log(res.data.result.result);
                if(res.status==200){
                    if(res.data.code!='10000'){
                        this.error=false;
                        this.limit=true;
                    }else{
                        this.error=true;
                        if(res.data.result.error_code=='10012'){
                            this.limit=false;
                        }else{
                            this.limit=true;
                            // 成功
                            this.msg=res.data.result.result;
                        }
                    }
                }
            })            
        },
        goto(index){
            // console.log(index);
            this.$router.push({path:'/detail',query:{id:index}});
        },
        initData(cur) {
            var date;
            if (cur) {
                date = new Date(cur);
            } else {
                date = new Date();
            }
            this.currentDay = date.getDate();
            this.currentYear = date.getFullYear();
            this.currentMonth = date.getMonth() + 1;
            this.currentWeek = date.getDay(); // 1...6,0
            if (this.currentWeek == 0) {
                this.currentWeek = 7;
            }
            var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
            // console.log("today:" + str + "," + this.currentWeek);
            this.days.length = 0;
            // 今天是周日，放在第一行第7个位置，前面6个
            for (var i = this.currentWeek - 1; i >= 0; i--) {
                var d = new Date(str);
                d.setDate(d.getDate() - i);
                // console.log("y:" + d.getDate());
                this.days.push(d);
            }
            for (var i = 1; i <= 35 - this.currentWeek; i++) {
                var d = new Date(str);
                d.setDate(d.getDate() + i);
                this.days.push(d);
            }
        },
        pick(date) {
            this.selectDay=date.getDate();
            this.selectMonth=date.getMonth()+ 1;
            this.selectYear = date.getFullYear();
            // alert(this.formatDate( date.getFullYear() , date.getMonth() + 1, date.getDate()));
            this.getInfo();
        },
        pickPre(year, month) {
            // setDate(0); 上月最后一天
            // setDate(-1); 上月倒数第二天
            // setDate(dx) 参数dx为 上月最后一天的前后dx天
            var d = new Date(this.formatDate(year , month , 1));
            d.setDate(0);
            this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        pickNext(year, month) {
            var d = new Date(this.formatDate(year , month , 1));
            d.setDate(35);
            this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        pickYear(year, month) {
            // alert(year + "," + month);
        },
        // 返回 类似 2016-01-02 格式的字符串
        formatDate(year,month,day){
            var y = year;
            var m = month;
            if(m<10) m = "0" + m;
            var d = day;
            if(d<10) d = "0" + d;
            return y+"-"+m+"-"+d
        },
    }
}
</script>
<style scoped>
    .home{
        width: 100%;
        min-width: 1200px;
        background: rgba(235, 229, 229, 0.3);
        min-height: 100vh;
        position: relative;
        padding-bottom: 50px;
        box-sizing: border-box;
    }
    .menuNav{
        width: 100%;
        background: url(../bg.jpg) no-repeat center;
        background-size: cover;
    }
    .menuNav>div{
        width: 900px;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 55px 0;
        text-align: center;
    }
    .menuNav span{
        color: #fff;
        font-size: 26px;
    }
    .menuNav input{
        border: 1px solid #EEECE9;
        outline: none;
        padding: 5px;
        margin-left: 30px;
        float: left;
    }
    .contents{
        width: 1100px;
        margin: 0 auto;
        /* background: rgba(255,255,255,.8); */
        border-radius: 10px;
        margin-top: 50px;
    }
    .contents>div{
        float: left;
    }
    .limit{
        text-align:center;
        color:#E32732;
        font-size: 20px;
        background: rgba(255,255,255,.5);
        width: 800px;
        margin: 0 auto;
        padding: 30px 50px;
        margin-top:30px;
    }
    .things>p{
        text-align: center;
        color: #E32732;
        margin:0;
        font-size: 22px;
        font-weight: bold;
    }
    .things{
        width: 650px;
        padding: 20px 30px;
        margin-right: 50px;
    }
    /*清除浮动代码*/
    .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    .clearfloat{zoom:1}


    #calendar{
        width:342px;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.12);
        margin-top: 28px;
    }
    .month {
        width: 100%;
        background: #E32732;
    } 
    .month ul {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;
    }
    .year-month {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .year-month:hover {
        background: rgba(150, 2, 12, 0.1);
    } 
    .choose-year {
        padding-left: 20px;
        padding-right: 20px;
    }
    .choose-month {
        text-align: center;
        font-size: 1.5rem;
    }
    .arrow {
        padding: 30px;
    } 
    .arrow:hover {
        background: rgba(100, 2, 12, 0.1);
    }
    .month ul li {
        color: white;
        font-size: 20px;
        text-transform: uppercase;
        letter-spacing: 3px;
        list-style: none;
    }
    .month ul li:hover{
        cursor: pointer;
    }
    .weekdays {
        margin: 0;
        padding: 10px;
        background-color: #E32732;
        display: flex;
        flex-wrap: wrap;
        color: #FFFFFF;
        justify-content: space-around;
    }
    .weekdays li {
        display: inline-block;
        width: 13.6%;
        text-align: center;
    }
    .days {
        padding: 10px;
        background: #FFFFFF;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .days li {
        list-style-type: none;
        display: inline-block;
        width: 14.2%;
        text-align: center;
        padding-bottom: 5px;
        padding-top: 5px;
        font-size: 1rem;
        color: #000;
    }
    .days li span{
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
    }
    .days li .active {
        /* padding: 8px 10px; */
        border-radius: 50%;
        background: #E32732;
        color: #fff;
        width: 40px;
        height: 40px;
        line-height: 40px;
        display: inline-block;
    }
    .days li .other-month {
        /* padding: 5px; */
        color: gainsboro;
    }
    .days li:hover {
        background: #e1e1e1;
        cursor: pointer;
    }
    .cd-container {
        /* this class is used to give a max-width to the element it is applied to, and center it horizontally when it reaches that max-width */
        width: 90%;
        max-width: 1170px;
        margin: 0 auto;
    }
    .cd-container::after {
        /* clearfix */
        content: '';
        display: table;
        clear: both;
    }
    #cd-timeline {
        position: relative;
        padding: 2em 0;
        margin-top: 2em;
        margin-bottom: 2em;
        }
        #cd-timeline::before {
        /* this is the vertical line */
        content: '';
        position: absolute;
        top: 0;
        left: 18px;
        height: 100%;
        width: 4px;
        background: #d7e4ed;
    }

    .cd-timeline-block {
        position: relative;
        margin: 2em 0;
    }
    .cd-timeline-block:after {
        content: "";
        display: table;
        clear: both;
    }
    .cd-timeline-block:first-child {
        margin-top: 0;
    }
    .cd-timeline-block:last-child {
        margin-bottom: 0;
    }

    .cd-timeline-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        box-shadow: 0 0 0 4px white, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05);
    }
    .cd-timeline-img img {
        display: block;
        width: 24px;
        height: 24px;
        position: relative;
        left: 50%;
        top: 50%;
        margin-left: -12px;
        margin-top: -12px;
    }
    .cd-timeline-img.cd-picture {
        background: #E32732;
    }

    .cd-timeline-content {
        position: relative;
        margin-left: 60px;
        background: white;
        border-radius: 0.25em;
        padding: 1em;
        box-shadow: 0 3px 0 #d7e4ed;
        text-align: center;
        cursor: pointer;
        border: 1px solid transparent;
    }
    .cd-timeline-content:after {
        content: "";
        display: table;
        clear: both;
    }
    .cd-timeline-content h2 {
        color: #303e49;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 0;
    }
    .cd-timeline-content p, .cd-timeline-content .cd-read-more, .cd-timeline-content .cd-date {
        font-size: 13px;
        font-size: 0.8125rem;
    }
    .cd-timeline-content .cd-read-more, .cd-timeline-content .cd-date {
        display: inline-block;
    }
    .cd-timeline-content p {
        margin: 1em 0;
        line-height: 1.6;
    }
    .cd-timeline-content .cd-read-more {
        float: right;
        padding: .8em 1em;
        background: #acb7c0;
        color: white;
        border-radius: 0.25em;
    }
    .no-touch .cd-timeline-content .cd-read-more:hover {
        background-color: #bac4cb;  
    }
    a.cd-read-more:hover{text-decoration:none; background-color: #424242;  }
    .cd-timeline-content .cd-date {
        float: left;
        padding: .8em 0;
        opacity: .7;
    }
    .cd-timeline-content::before {
        content: '';
        position: absolute;
        top: 16px;
        right: 100%;
        height: 0;
        width: 0;
        border: 7px solid transparent;
        border-right: 7px solid white;
    }

    /* @media only screen and (min-width: 1170px) { */
        #cd-timeline {
            margin-top: 3em;
            margin-bottom: 3em;
        }
        #cd-timeline::before {
            left: 50%;
            margin-left: -2px;
        }
        .cd-timeline-block {
            margin: 4em 0;
        }
        .cd-timeline-block:first-child {
            margin-top: 0;
        }
        .cd-timeline-block:last-child {
            margin-bottom: 0;
        }
        .cd-timeline-img {
            width: 20px;
            height: 20px;
            left: 50%;
            margin-left: -10px;
            /* Force Hardware Acceleration in WebKit */
            -webkit-transform: translateZ(0);
            -webkit-backface-visibility: hidden;
        }
        .cssanimations .cd-timeline-img.is-hidden {
            visibility: hidden;
        }
        .cssanimations .cd-timeline-img.bounce-in {
            visibility: visible;
            -webkit-animation: cd-bounce-1 0.6s;
            -moz-animation: cd-bounce-1 0.6s;
            animation: cd-bounce-1 0.6s;
        }
        .cd-timeline-content {
            margin-left: 0;
            /* padding: 1.6em; */
            width: 45%;
        }
        .cd-timeline-content::before {
            top: 0px;
            left: 100%;
            border-color: transparent;
            border-left-color: white;
        }
        .cd-timeline-content .cd-read-more {
            float: left;
        }
        .cd-timeline-content .cd-date {
            position: absolute;
            width: 150px;
            left: 122%;
            top: -13px;
            font-size: 16px;
            font-size: 1rem;
        }
        .cd-timeline-block:nth-child(even) .cd-timeline-content {
            float: right;
        }
        .cd-timeline-block:nth-child(even) .cd-timeline-content::before {
            top: 0px;
            left: auto;
            right: 100%;
            border-color: transparent;
            border-right-color: white;
        }
        .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-read-more {
            float: right;
        }
        .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-date {
            left: auto;
            right: 122%;
            /* text-align: right; */
        }
        .cssanimations .cd-timeline-content.is-hidden {
            visibility: hidden;
        }
        .cssanimations .cd-timeline-content.bounce-in {
            visibility: visible;
            -webkit-animation: cd-bounce-2 0.6s;
            -moz-animation: cd-bounce-2 0.6s;
            animation: cd-bounce-2 0.6s;
        }
        /* inverse bounce effect on even content blocks */
        .cssanimations .cd-timeline-block:nth-child(even) .cd-timeline-content.bounce-in {
            -webkit-animation: cd-bounce-2-inverse 0.6s;
            -moz-animation: cd-bounce-2-inverse 0.6s;
            animation: cd-bounce-2-inverse 0.6s;
        }
        .cd-timeline-content>img{
            width: 150px;
            margin-top: 10px;
        }
        .cd-timeline-content:hover{
            border: 1px solid rgba(167,183,188,.4); 
        }
    /* } */

</style>


