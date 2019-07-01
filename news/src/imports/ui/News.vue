<template>
    <div class="home">
        <div class="newsNav">
            <div class="clearfloat">
                <span>新闻一刻</span>
                <!-- <input type="text" v-model="search" @keyup.enter="searchMenu">
                <div class="search" @click="searchMenu"></div> -->
            </div>
        </div>
        <div class="contents clearfloat">
            <div class="bar">
                <ul v-for="item in list" :key='item.uniquekey'>
                    <li :class="id==item.idea&&'active'" @click="getnews(item.idea)">{{item.font}}</li>
                </ul>
            </div>
            <div class="news" v-if="error">
                <p class="error">第三方API暂不可用，请稍后再用。</p>
            </div>
            <div class="news" v-if="!error">
                <div v-for="item2 in news" :key="item2.uniquekey" class="newsItem clearfloat" @click="open(item2.url)">
                    <div>
                        <img :src="item2.thumbnail_pic_s" alt="" onerror="this.src='../no.jpg'">
                    </div>
                    <div>
                        <p>{{item2.title}}</p>
                        <!-- <p class="tag">{{item.tag}}</p> -->
                        <!-- <p class="time">{{item.date}}</p> -->
                        <p class="people">{{item2.author_name}} · {{item2.date}}</p>
                    </div>
                </div>
                <div v-for="item3 in point" :key="item3.uniquekey" class="newsItem point clearfloat" @click="open(item3.url)">
                    <div>
                        <img :src="item3.thumbnail_pic_s" alt="" onerror="this.src='../no.jpg'">
                        <img :src="item3.thumbnail_pic_s02?item3.thumbnail_pic_s02:'../no.jpg'" alt="" onerror="this.src='../no.jpg'">
                        <img :src="item3.thumbnail_pic_s03?item3.thumbnail_pic_s03:'../no.jpg'" alt="" onerror="this.src='../no.jpg'">
                    </div>
                    <div>
                        <p>{{item3.title}}</p>
                        <p class="people">{{item3.author_name}} · {{item3.date}}</p>
                    </div>
                </div>
                <div v-for="item4 in info" :key="item4.uniquekey" class="newsItem info clearfloat" @click="open(item4.url)">
                    <div>
                        <img :src="item4.thumbnail_pic_s" alt="" onerror="this.src='../no.jpg'">
                    </div>
                    <div>
                        <div>
                            <p>{{item4.title}}</p>
                            <p class="people">{{item4.author_name}} · {{item4.date}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'menus',
    data(){
        return{
            num:0,
            kindData:[],
            recommend:[],
            search:'',
            id:'top',
            list:[
                {font:'头条',idea:'top'},
                {font:'社会',idea:'shehui'},
                {font:'国内',idea:'guonei'},
                {font:'国际',idea:'guoji'},
                {font:'娱乐',idea:'yule'},
                {font:'体育',idea:'tiyu'},
                {font:'军事',idea:'junshi'},
                {font:'科技',idea:'keji'},
                {font:'财经',idea:'caijing'},
                {font:'时尚',idea:'shishang'},
            ],
            news:[],
            info:[],
            point:[],
            error:false
        }
    },
    watch:{
    },
    created(){

    },
    mounted(){
        this.getnews('top');
    },
    methods:{
        getnews(val){
            this.id=val;
            // https://api.ileapcloud.com/jdapi/wxapi/query/xwtt?type=热点&appId=2bd30b81-2e6c-4d7c-9763-674503375d74
            this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/xwtt?type='+val+'&appId=2bd30b81-2e6c-4d7c-9763-674503375d74').then((res)=>{
                // console.log(res.data.result.result);
                // console.log(res);
                if(res.status==200){
                     if(res.data.code!=10000){
                         this.error=true;
                     }else{
                         this.error=false;
                         this.news=res.data.result.result.data.slice(0,3);
                         this.point=res.data.result.result.data.slice(3,4);
                         this.info=res.data.result.result.data.slice(4);
                     }
                }else{
                    this.error=true;
                }
            }).catch(err => {
                console.log(err);
            });     
        },
        open(url){
            window.open(url,"blank");   
        }
    }
}
</script>
<style scoped>
    .home{
        width: 100%;
        /* background-color:#EEECE9; */
        /* background-color:#FAE8C8; */
        min-height: 100vh;
        position: relative;
    }
    .newsNav{
        /* background-color: #FFFAF7; */
        /* background-color: #A1000E; */
        width: 100%;
        min-width: 960px;
        background: url(../banner.jpg) no-repeat center;
    }
    .newsNav>div{
        width: 960px;
        margin: 0 auto;
        padding: 40px 0;
        text-align: center;
    }
    .newsNav span{
        color: #fff;
        font-size: 26px;
        color: #fff;
        font-size: 26px;
        display: inline-block;
        padding: 5px 35px;
        background-color: rgba(0,0,0,.3);
        border-radius: 5px;
    }
    .contents{
        width: 960px;
        margin: 0 auto;
        padding: 20px 0 80px 0;
        background-color: #fff;
    }
    .contents>div{
        float: left;
    }
    .contents>div:hover{
        cursor: pointer;
    }
    .contents>div.bar{
        width: 200px;
    }
    .contents>div.news{
        width: 760px;
    }
    .bar>ul>li{
        list-style: none;
        width: 110px;
        padding: 10px 0;
        text-align: center;
        border-radius: 4px;
    }
    .bar>ul>li:not(:first-child){
        margin-top: 5px;
    }
    .bar>ul>li.active{
        color: #fff;
        background-color: #5663B2;
    }
    .bar>ul>li:hover{
        color: #fff;
        background-color: #5663B2;
    }
    .bar>ul>li:active{
        color: #fff;
        background-color: #5663B2;
    }
    .newsItem{
        box-sizing: border-box;
        padding: 16px 30px;
        background-color: #fff;
        border-radius: 5px;
        float: left;
        width: 760px;
    }
    .news>.newsItem:not(:first-child){
        border-top: 1px solid #ccc;
    }
    .newsItem>div{
        float: left;
    }
    .newsItem>div:last-child{
        width: 440px;
        margin: 10px 0 0 30px;
    }
    .newsItem>div:last-child>p:first-child{
        font-size: 22px;
        margin-top: 0;
    }
    .newsItem img{
        width:230px;
        vertical-align: middle;
    }
    .point{
        padding: 30px;
    }
    .point img{
        width: 200px;
        height: 152px;
    }
    .point>div{
        display: block;
    }
    .point>div:first-child{
        width: 640px;
        margin-left: 30px;
        display: flex;
        justify-content: space-between;
    }
    .point>div:last-child{
        width: 660px;
        margin-top: 30px;
    }
    .point>div:last-child>p:first-child{
        font-size: 22px;
        margin: 0;
    }
    .point .people{
        margin: 15px 0 0 0;
    }
    .info img{
        width: 180px;
    }
    .info>div:last-child{
        width: 490px;
        margin: 0px 0 0 30px;
        height: 135px;
    }
    .info>div:last-child{
        padding: 10px;
    }
    .info>div:last-child>p:first-child{
        font-size: 18px;
        margin-top: 0;
    }
    .info .people{
        font-size: 14px;
    }
    .tag{
        color: #666;
        font-size: 18px;
        width: 550px;
    }
    .time{
        font-size: 16px;
    }
    .people{
        font-size: 16px;
        margin-top: 25px;
        color: #666;
    }
    .error{
        margin-top: 24px;
        font-size: 20px;
        color: #5663B2;
    }
    /*清除浮动代码*/
    .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    .clearfloat{zoom:1}

</style>


