<template>
    <div class="home">
        <div class="menuNav">
            <div class="clearfloat">
                <span>智能小i机器人</span>
            </div>
        </div>
        <div class="contents" v-if="limit&&error">
            <p>智能小i机器人，一个和您对话的机器人</p>
            <div class="dialog" id="demo">
                <div v-for="(item,index) in talk" :key='index'>
                    <!-- <p :class="index%2==0?'':'small'">{{index%2==0?'我：':'小i机器人：'}}</p> -->
                    <p :class="index%2==0?'':'small'">
                        <img src="../me.jpg" alt="" v-if="index%2==0">
                        <img src="../small.jpg" alt="" v-if="index%2!=0">
                    </p>
                    <div>
                        {{item}}
                        <div :class="index%2==0?'arrower':'arrow'"></div>
                    </div>
                </div>
            </div>
            <div class="trans"></div>
            <div class="input">
                <textarea name="" id="" cols="81" rows="5" v-model="info" @keyup.enter="toTalks"></textarea>
                <button @click="toTalk" :disabled='send'>发送</button>
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
            talk:[],
            send:true
        }
    },
    watch:{
        talk(){
            this.$nextTick(function(){
                var div = document.getElementById('demo');
                div.scrollTop = div.scrollHeight;
            })
        },
        info(){
            this.info.replace(/\n/g,'').length>0?this.send=false:this.send=true;
        }
    },
    created(){
        
    },
    mounted(){
        
    },
    methods:{
        toTalk(){ 
            let msg=this.info;
            this.talk.push(this.info);
            this.info='';
            let _this = this;
            _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/aiquery?question='+msg+'&appId=64dab28a-8014-491b-bb28-bdea65cd4a87').then((res)=>{
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
                            // 成功
                            // res.data.result.result.content=res.data.result.result.content.replace("\r","");
                            this.talk.push(res.data.result.result.content);
                        }
                    }
                }
            })            
        },
        toTalks(){
            if(this.info.replace(/\n/g,'').length>0){
                this.toTalk();
            }
        }
    }
}
</script>
<style scoped>
    .home{
        width: 100%;
        min-width: 1200px;
        background: url(../bg.jpg) no-repeat center;
        background-size: cover;
        min-height: 100vh;
        position: relative;
        padding-bottom: 50px;
        box-sizing: border-box;
    }
    .menuNav{
        /* background-color: rgba(0,0,0,.1); */
        width: 100%;
    }
    .menuNav>div{
        width: 960px;
        margin: 0 auto;
        padding: 30px 0;
        text-align: center;
    }
    .menuNav span{
        color: #fff;
        /* color: #666; */
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
    .contents{
        width: 960px;
        margin: 0 auto;
        background: rgba(255,255,255,.8);
        height: 600px;
        border-radius: 10px;
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
    .contents>p{
        text-align: center;
        padding: 15px;
        color: blue;
        margin:0;
        font-size: 16px;
    }
    .dialog{
        width: 95%;
        height: 400px;
        overflow-y: auto;
        border: 1px solid #ADADFC;
        margin: 0 auto;
        padding: 20px;
    }
    /* .dialog>div{
        margin: 10px;
    } */
    .dialog>div>p{
        margin: 0px;
    }
    .dialog>div>p:first-child{
        color:blue;
        font-size: 15px;
    }
    .dialog>div>div{
        font-size: 14px;
        /* text-indent: 20px; */
        position: relative;
        top: -48px;
        left: 50px;
        width: 270px;
        padding: 10px;
        background: rgba(0,0,0,.2);
        margin-left: 10px;
        border-radius: 5px;
        /* overflow: hidden; */
        word-wrap:break-word ;
        word-break:break-all; 
    }
    .dialog>div>div>.arrow {
        position: absolute;
        top: 11px;
        right: -16px;
        width: 0;
        height: 0;
        font-size: 0;
        border: solid 8px;
        border-color: transparent transparent transparent rgba(0,0,0,0.2);
    }
    .dialog>div>div>.arrower {
        position: absolute;
        top: 11px;
        left: -16px;
        width: 0;
        height: 0;
        font-size: 0;
        border: solid 8px;
        border-color: transparent rgba(0,0,0,0.2) transparent transparent ;
    }
    .dialog>div>p>img{
        width: 50px;
        border-radius: 50%;
    }
    .dialog>div:nth-child(2n)>div{
        width: 290px;
        margin-left: 450px;
        text-indent: 0;
    }
    .dialog>div:nth-child(2n)>p{
        width: 50px;
        margin-left: 800px;
    }
    .trans{
        width: 95%;
        height: 20px;
        background: #ADADFC;
        margin: 0 auto;
    }
    .input{
        width: 95%;
        height: 105px;
        border: 1px solid #fff;
        margin: 0 auto;
    }
    .input>textarea{
        border: none;
        font-size: 15px;
    }
    .input>button{
        position: relative;
        top: -46px;
        left: 82px;
        padding: 10px 25px;
        background: #7E7EFA;
    }
    .input>textarea:focus{
        outline: none;
    }
    .input>button:focus{
        outline: none;
    }
    /*清除浮动代码*/
    .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    .clearfloat{zoom:1}

</style>


