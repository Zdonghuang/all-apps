<template>
    <div class="home">
        <div class="menuNav">
            <div class="clearfloat">
                <span>二十四节气</span>
            </div>
        </div>
        <div class="contents" v-if="limit&&error">
            <div>
                <div class="now">
                    <p>当前正值{{nowext1}}，今年大寒时间：{{nowext2}}，农历时间：{{nowext3}}年{{nowext4}}{{nowext5}}</p>
                    <p class="song">{{song}}</p>
                </div>
            </div>
            <div class="jieqi">
                <div v-for="(item,index) in terms" :key="index" class="menuItem clearfloat" @click="detail(item.jieqiid)">
                    <div>
                        <img :src="item.pic" alt="" onerror="this.src='../no.jpg'">
                    </div>
                    <div>
                        <p>{{item.name}}</p>
                        <p class="tag">{{item.tag}}</p>
                    </div>
                </div>
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
    name:'solarTerms',
    data(){
        return{
            num:0,
            allInfo:[],
            now:{},
            nowext1:'',
            nowext2:'',
            nowext3:'',
            nowext4:'',
            nowext5:'',
            song:'',
            terms:[],
            kindData:[],
            recommend:[],
            search:'',
            limit:true,
            error:true
        }
    },
    watch:{

    },
    created(){
        
    },
    mounted(){
        this.getList();
    },
    methods:{
        getList(){ 
            let _this = this;
            _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/24jq?appId=46690a89-29c7-4eff-9f8a-61db62cc3f32').then((res)=>{
                // console.log(res.data.result.result);
                if(res.status==200){
                    if(res.data.code!='10000'){
                        this.error=false;
                        this.limit=true;
                        // console.log('error',this.error);
                    }else{
                        this.error=true;
                        if(res.data.result.status=='104'){
                            this.limit=false;
                            // console.log('limit',this.limit);
                        }else{
                            this.limit=true;
                            this.allInfo=res.data.result.result;
                            this.now=this.allInfo.now;
                            this.nowext1=this.now.name;
                            this.nowext2=this.now.name;
                            this.nowext3=this.now.lunar[0];
                            this.nowext4=this.now.lunar[1];
                            this.nowext5=this.now.lunar[2];
                            this.song=this.allInfo.song.slice(0,-1);
                            this.terms=res.data.result.result.list.sort(this.compare("jieqiid"));
                        }
                    }
                }
            })            
        },
        detail(index){
            // console.log(index);
            this.$router.push({path:'/detail',query:{id:index}});
        },
        // 属性比较
        compare(property){
            return function(obj1,obj2){
                var value1 = obj1[property];
                var value2 = obj2[property];
                return value1 - value2;     // 升序
            }
        }
    }
}
</script>
<style scoped>
    .home{
        width: 100%;
        min-width: 1200px;
        /* background-color:#ECF5FA; */
        background: url(../bg.jpg) no-repeat center;
        background-size: cover;
        min-height: 100vh;
        position: relative;
    }
    .menuNav{
        /* background-color: #FFFAF7; */
        width: 100%;
    }
    .menuNav>div{
        width: 960px;
        margin: 0 auto;
        padding: 30px 0 25px 0;
        text-align: center;
    }
    .menuNav span{
        /* color: #993300; */
        color: #666;
        font-size: 26px;
        /* float: left;
        margin-left: 250px; */
    }
    .menuNav input{
        border: 1px solid #EEECE9;
        outline: none;
        padding: 5px;
        margin-left: 30px;
        float: left;
    }
    .search{
        width: 100px;
        height: 34px;
        /* background: #930 url(../search.png) no-repeat center center; */
        background: #993300 url(../search.png) no-repeat center center;
        border-right: 1px solid #fff;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        background-size: 20px;
        float: left;
    }
    .contents{
        width: 960px;
        margin: 0 auto;
        padding: 0px 0 80px 0;
    }
    .menuItem{
        box-sizing: border-box;
        padding: 30px 0px;
        /* background-color: rgba(0,0,0,.1); */
        background-color: rgba(198,201,193,.5);
        margin-top: 30px;
        border-radius: 5px;
        width: 200px;
        text-align: center;
        display: inline-block;
    }
    .menuItem:hover{
        cursor: pointer;
    }
    .menuItem>div:last-child>p:first-child{
        font-size: 18px;
        margin-top: 10px;
    }
    .menuItem img{
        width:150px;
    }
    .jieqi>.menuItem:nth-child(4n-2){
        margin: 0 53px;
    }
    .jieqi>.menuItem:nth-child(4n-1){
        margin-right: 53px;
    }
    .tag{
        color: #666;
        font-size: 18px;
        /* width: 550px; */
    }
    .time{
        font-size: 16px;
    }
    .people{
        font-size: 16px;
        margin-top: 25px;
    }
    .limit{
        text-align:center;
        color:blue;
        font-size: 20px;
        background: rgba(255,255,255,.5);
        width: 800px;
        margin: 0 auto;
        padding: 30px 50px;
        margin-top:30px;
    }
    .now{
        text-align: center;
        padding: 30px 20px;
        width: 750px;
        margin: 0 auto;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 5px;
        color:rgba(55, 58, 224, 0.8);
    }
    .now>p{
        margin:0;
    }
    .now>.song{
        margin-top: 15px;
        /* color: #555; */
    }
    /*清除浮动代码*/
    .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    .clearfloat{zoom:1}

</style>


