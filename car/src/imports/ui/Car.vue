<template>
    <div class="home">
        <div class="carNav">
            <h1>公交地铁一查通</h1>
            <div class="car clearfloat">
                <div>
                </div>
                <div class="box">
                    <div>
                        <input type="text" placeholder="请输入您要查询的城市" v-model="city">
                    </div>
                    <div>
                        <input type="text" placeholder="请输入您要查询的线路" v-model="line">
                    </div>
                    <button :disabled="info" @click="getInfo">搜索</button>
                </div>
            </div>
        </div>
        <div class="contents">
            <div>
                <h3 v-if="status==0">暂无查寻信息</h3>
                <h3 v-if="status==1">{{this.car.msg}}</h3>
                <div v-if="status==2" class="infos">
                    <h3>公交/地铁信息</h3>
                    <div v-for="(item,index) in car.result" :key="index">
                        <p class="num">{{index+1}}</p>
                        <p>线路：{{item.transitno}}</p>
                        <p>时间：{{item.starttime}} - {{item.endtime}}</p>
                        <p>始发 - 终点：{{item.startstation}} - {{item.endstation}}</p>
                        <p>票价：{{item.price}} - {{item.maxprice}}元</p>
                        <div class="state"><span>站点：</span><span><span v-for="(it,inde) in item.list" :key="inde"><span v-if="inde!=0"> → </span>{{it.station}}</span></span></div>
                    </div>
                </div>
                <h3 v-if="status==3">第三方API暂不可用，请稍后再用。</h3>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'car',
    data(){
        return{
            info:true,
            city:'',
            line:'',
            car:{},
            status:0,
            connect:true,
            tip:''
        }
    },
    watch:{
       city(curVal,oldVal){
           (curVal)&&(this.line)?this.info=false:this.info=true;
　　　　},
       line(curVal,oldVal){
           (curVal)&&(this.city)?this.info=false:this.info=true;
　　　　},
    },
    created(){

    },
    mounted(){
        
    },
    methods:{
        getInfo(){
            let _this = this;
            _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/transitLine?city='+this.city+'&transitno='+this.line+'&appId=51ebc0e4-fb34-47ac-8ae2-59a2c48ba063').then((res)=>{
                // console.log(res);
                if(res.status==200){
                  this.car=res.data.result;
                  (!this.car.result)?this.status=1:this.status=2;
                  if(res.data.code!=10000){
                      this.connect=false;
                      this.status=3;
                  }else{
                      this.connect=true;
                  }
                  if(res.data.result.status&&res.data.result.status!=0){
                      this.connect=false;
                      this.status=3;
                  }else{
                      this.connect=true;
                  }
                }
            })
        },
    }
}
</script>
<style scoped>
    .home{
        width: 100%;
        /* background-color:#EEECE9; */
        background-color:#fff;
        min-height: 100vh;
        position: relative;
    }
    .carNav{
        background: url(../car.jpg) no-repeat center center;
        background-size: cover;
        width: 100%;
        min-width: 1200px;
        height: 600px;
    }
    .carNav>h1{
        color: #fff;
        margin: 0;
        text-align: center;
        padding: 60px 0 80px 0;
    }
    .car{
        width: 1000px;
        margin: 0 auto;
        box-sizing: border-box;
    }
    .car>div{
        float: left;
        margin: 0 auto;
        height: 320px;
    }
    .car>div:first-child{
        width: 30%;
        background-color: rgba(0,0,0,0.6);
    }
    .box{
        width: 70%;
        background-color: rgba(0,0,0,0.4);
        padding: 50px 20px;
        text-align: center;
    }
    .box>div{
        width: 100%;
        height: 80px;
        text-align: center;
    }
    .box input{
        width: 80%;
        height: 50px;
    }
    .box button{
        width: 40%;
        height: 44px;
        margin-top: 10px;
    }
    .contents{
        width: 100%;
        padding: 20px 0 80px 0;
    }
    .contents>div{
        width: 1000px;
        margin: 0 auto;
        background-color: #FAFAFA;
        padding: 80px 60px 100px 60px;
        box-sizing: border-box;
        color: #0747A6;
        font-size: 18px;
        /* text-align: center; */
    }
    .contents h3{
        text-align: center;
        margin-top: 0px;
    }
    input{
        border: none;
        outline: none;
        padding: 10px 20px;
    }
    div{
        box-sizing: border-box;
    }
    .infos>div:not(:first-child){
        margin-top: 50px;
    }
    .state{
        text-align: left;
        width: 880px;
    }
    .state>span{
        display: inline-block;
    }
    .state>span:first-child{
        width: 55px;
    }
    .state>span:last-child{
        width: 820px;
        vertical-align: top;
    }
    .contents .num{
        text-align: center;
        font-size: 18px;
    }
    /*清除浮动代码*/
    .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    .clearfloat{zoom:1}

</style>


