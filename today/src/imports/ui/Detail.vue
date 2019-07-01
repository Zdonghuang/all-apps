<template>
    <div class="home">
        <div class="menuNav">
            <img @click="back" src="../back.png" style="position:absolute;top: 20px;left: 100px;padding-top: 30px;width: 55px;cursor:pointer;">
            <div>
                <img src="../font.png" alt="" style="width:260px"/>
                <!-- <span>历史上的今天</span> -->
            </div>
        </div>
        <div class="contents" v-if="limit&&error">
            <div class="menuItem" v-for="(item,index) in detail" :key="index">
                <h3>{{item.title}}</h3>
                <p class="date">{{item.year}}年{{item.month}}月{{item.day}}日</p>
                <img :src="item.pic" alt="" v-if="item.pic.length>0"/> 
                <p class="des">{{item.des}}</p>
                <p class="content">{{item.content}}</p>
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
    name:'menus',
    data(){
        return{
            num:0,
            detail:[],
            limit:true,
            error:true
        }
    },
    created(){
        
    },
    mounted(){
        this.num=this.$route.query.id;
        this.getDetail();
    },
    updated() {
        window.scroll(0, 0);
    },
    methods:{
        getDetail(){ 
            let _this = this;
            _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/lssjt_detail?v=1.0&appId=d3884721-a6c3-44f5-90ff-18f1896b24d9&id='+this.num).then((res)=>{
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
                            this.detail=res.data.result.result;
                        }
                    }
                }
            })            
        },
        back(){
            this.$router.push('/');
        }
    }
}
</script>
<style scoped>
    .home{
        width: 100%;
        min-width: 1200px;
        background: #F5F5F5;
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
        width: 960px;
        margin: 0 auto;
        padding: 0px 0 50px 0;
        text-align: center;
        background: #fff;
        margin-top: 50px;
        border-radius: 5px;
    }
    .contents>div:hover{
        cursor: pointer;
    }
    .menuItem{
        box-sizing: border-box;
        padding: 10px 0px;
        margin-top: 30px;
        border-radius: 5px;
        width: 80%;
        text-align: center;
        display: inline-block;
    }
    .menuItem>div{
        background-color: rgba(255,255,255,.9);
        text-align: left;
        padding: 30px 40px;
        box-sizing: border-box;
        border-radius:5px;
        border: 1px solid #eee;
    }
    .menuItem>div:last-child>p:first-child{
        font-size: 18px;
        margin-top: 10px;
    }
    .menuItem>div:not(:first-child){
        margin-top: 30px;
    }
    .menuItem img{
        width:150px;
    }
    .menuItem>div>div{
        line-height: 28px;
    }
    .menuItem>div>h4{
        margin: 0 0 10px 0;
    }
    .date{
        border-bottom: 1px dashed #999;
        padding-bottom: 8px;
        font-size: 15px;
        color: #999;
        margin-bottom: 30px;
    }
    .des,.content{
        text-align: left;
        text-indent:33px;
    }
    .des{
        font-weight: bold;
        color: #333;
        margin :30px 0 15px 0;
    }
    .content{
        margin-top: 0;
        color: #666;
        line-height: 26px;
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
    /*清除浮动代码*/
    .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    .clearfloat{zoom:1}

</style>


