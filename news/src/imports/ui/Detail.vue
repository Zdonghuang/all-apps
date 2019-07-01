<template>
    <div class="home">
        <div class="menuNav">
            <div class="clearfloat">
                <span>新闻一刻</span>
                <input type="text" v-model="search" @keyup.enter="gosearch">
                <div class="search" @click="gosearch"></div>
            </div>
        </div>
        <div class="contents">
            <div class="menuItem">
                <h2>{{detail.name}}</h2>
                <div class="mater clearfloat">
                    <div>材料：</div>
                    <div v-for="(item,index) in detail.material" :key="index">
                        <span>{{item.mname}}{{item.amount}} </span>
                        <span v-if="index!=detail.material.length-1"> , </span> 
                    </div>
                </div>
                <p>烹饪时间：{{detail.cookingtime}}</p>
                <p>食用人数：{{detail.peoplenum}}</p>
                <div><img :src="detail.pic" alt="" onerror="this.src='../no.jpg'"></div>
                <h4>小记：</h4>
                <p v-html="detail.content" class="story"></p>
                <div>
                    <h4>制作步骤：</h4>
                    <div v-for="(item,index) in detail.process" :key="index">
                        <p>{{index+1}}.<span v-html="item.pcontent"></span></p>
                        <p><img :src="item.pic" alt="" onerror="this.src='../no.jpg'"></p>
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
            detail:{},
            search:'',
        }
    },
    created(){
        
    },
    mounted(){
        this.num=this.$route.query.id;
        this.getDetail();
    },
    methods:{
        getDetail(){ 
            let _this = this;
            _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/cpfl_id?id='+this.num).then((res)=>{
                // console.log(res.data.result.result);
                if(res.status==200){
                    this.detail=res.data.result.result;
                }
            })            
        },
        gosearch(){
            this.$router.push({path:'/',query:{search:this.search}});
        }
    }
}
</script>
<style scoped>
    .home{
        width: 100%;
        /* background-color:#EEECE9; */
        background-color:#FAE8C8;
        min-height: 100vh;
        position: relative;
    }
    .menuNav{
        /* background-color: #FFFAF7; */
        background-color: #A1000E;
        width: 100%;
    }
    .menuNav>div{
        width: 960px;
        margin: 0 auto;
        padding: 50px 0;
    }
    .menuNav span{
        /* color: #993300; */
        color: #fff;
        font-size: 26px;
        float: left;
        margin-left: 250px;
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
        padding: 20px 0 80px 0;
    }
    .menuItem{
        box-sizing: border-box;
        padding: 30px 80px;
        background-color: #fff;
        margin-top: 30px;
        border-radius: 5px;
    }
    .menuItem img{
        width: 320px;
        display: block;
        margin: 20px 0 60px 0;
    }
    .menuItem p{
        margin: 10px 0;
        color: #666;
    }
    .mater{
        font-size: 18px;
        color: #666;
    }
    .mater>div{
        float: left;
    }
    .menuItem .story{
        color: #333;
        margin-bottom: 50px;
        line-height: 30px;
    }
    h4{
        color: #333;
    }
    /*清除浮动代码*/
    .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    .clearfloat{zoom:1}

</style>


