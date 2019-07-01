<template>
    <div class="home">
        <div class="menuNav">
            <img @click="back" src="../back.png" style="position:absolute;top: 0px;left: 100px;padding-top: 30px;width: 34px;cursor:pointer;">
            <div class="clearfloat">
                <span>{{detail.name}}</span>
            </div>
        </div>
        <div class="contents">
            <img :src="pic" alt="" style="width:400px;">
            <div class="menuItem">
                <div>
                    <h4>简介</h4>
                    <div>{{detail.jianjie}}</div>
                </div>
                <div>
                    <h4>由来</h4>
                    <div>{{detail.youlai}}</div>
                </div>
                <div>
                    <h4>习俗</h4>
                    <div>{{detail.xisu}}</div>
                </div>
                <div>
                    <h4>养生</h4>
                    <div>{{detail.yangsheng}}</div>
                </div>
                <div>
                    <h4>相关查询</h4>
                    <div v-for="(item,index) in detail.list" :key="index">
                        <p>{{item.time}}</p>
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
    name:'menus',
    data(){
        return{
            num:0,
            detail:{},
            search:'',
            pic:'',
            limit:true,
            error:true
        }
    },
    created(){
        
    },
    mounted(){
        this.num=this.$route.query.id;
        this.getPic(this.num);
        this.getDetail();
    },
    updated() {
        window.scroll(0, 0);
    },
    methods:{
        getDetail(){ 
            let _this = this;
            _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/24jq_detail?appId=46690a89-29c7-4eff-9f8a-61db62cc3f32&jieqiid='+this.num).then((res)=>{
                // console.log(res.data.result.result);
                if(res.status==200){
                    if(res.data.code!='10000'){
                        this.error=false;
                        this.limit=true;
                    }else{
                        this.error=true;
                        if(res.data.result.status=='104'){
                            this.limit=false;
                        }else{
                            this.limit=true;
                            this.detail=res.data.result.result;
                        }
                    }
                }
            })            
        },
        getPic(val){
            switch(val){
                case '1':
                    this.pic='../lc.jpg';
                    break;
                case '2':
                    this.pic='../ys.jpg';
                    break;
                case '3':
                    this.pic='../jz.jpg';
                    break;
                case '4':
                    this.pic='../cf.jpg';
                    break;
                case '5':
                    this.pic='../qm.jpg';
                    break;
                case '6':
                    this.pic='../gy.jpg';
                    break;
                case '7':
                    this.pic='../lx.jpg';
                    break;
                case '8':
                    this.pic='../xm.jpg';
                    break;
                case '9':
                    this.pic='../mz.jpg';
                    break;
                case '10':
                    this.pic='../xz.jpg';
                    break;
                case '11':
                    this.pic='../xs.jpg';
                    break;
                case '12':
                    this.pic='../ds.jpg';
                    break;
                case '13':
                    this.pic='../lq.jpg';
                    break;
                case '14':
                    this.pic='../cs.jpg';
                    break;
                case '15':
                    this.pic='../bl.jpg';
                    break;
                case '16':
                    this.pic='../qf.jpg';
                    break;
                case '17':
                    this.pic='../hl.jpg';
                    break;
                case '18':
                    this.pic='../sj.jpg';
                    break;
                case '19':
                    this.pic='../ld.jpg';
                    break;
                case '20':
                    this.pic='../xx.jpg';
                    break;
                case '21':
                    this.pic='../dx.jpg';
                    break;
                case '22':
                    this.pic='../dz.jpg';
                    break;
                case '23':
                    this.pic='../xh.jpg';
                    break;
                case '24':
                    this.pic='../dh.jpg';
                    break;
                default:
                    this.pic='../lc.jpg';
                    break;
            }
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
        /* background-color:#ECF5FA; */
        background: url(../bg.jpg) no-repeat center;
        background-size: cover;
        min-height: 100vh;
        position: relative;
    }
    .menuNav{
        /* background-color: #FFFAF7; */
        width: 100%;
        background-color: rgba(255,250,247,.6);
        width: 100%;
        margin-bottom: 30px;
    }
    .menuNav>div{
        width: 960px;
        margin: 0 auto;
        padding: 30px 0 25px 0;
        text-align: center;
    }
    .menuNav span{
        color: #666;
        font-size: 26px;
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
        text-align: center;
    }
    .contents>div:hover{
        cursor: pointer;
    }
    .menuItem{
        box-sizing: border-box;
        padding: 30px 0px;
        margin-top: 30px;
        border-radius: 5px;
        width: 100%;
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
    /*清除浮动代码*/
    .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    .clearfloat{zoom:1}

</style>


