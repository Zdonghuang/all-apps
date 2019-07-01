<template>
    <div class="home">
        <div class="bgbox">
            <h2>驾照考题题库练习</h2>
            <div class="box">
                <div>
                    <h2>考试题目</h2>
                    <div class="problem">
                        <p>
                            <span>{{questionNum}}、</span>
                            {{QUESTION.question}}
                        </p>
                        <el-radio-group v-model="radio2" class="choose">
                            <el-radio label="对" v-show="QUESTION.option1==''">对</el-radio>
                            <el-radio label="错" v-show="QUESTION.option2==''">错</el-radio>

                            <el-radio label="A" v-show="QUESTION.option1!=''">{{QUESTION.option1}}</el-radio>
                            <el-radio label="B" v-show="QUESTION.option2!=''">{{QUESTION.option2}}</el-radio>
                            <el-radio label="C" v-show="QUESTION.option3!=''">{{QUESTION.option3}}</el-radio>
                            <el-radio label="D" v-show="QUESTION.option4!=''">{{QUESTION.option4}}</el-radio>
                        </el-radio-group>
                        <img :src="QUESTION.pic" alt="" v-if="QUESTION.pic!=''" class="pro_img" width="300">
                    </div>
                    <el-button type="primary" plain :disabled="ques.pagenum==1" @click="prev">上一题</el-button>
                    <el-button type="primary" plain @click="next">下一题</el-button>
                    <el-button type="success" plain style="margin-left:50px;" @click="showAnswer">查看本题结果</el-button>

                    <span class="grade">{{Grade}}</span>

                    <div class="answer" v-if="showA">
                        <h2 class="red">{{QUESTION.answer}}</h2>
                        <p>{{QUESTION.explain}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name:'appCase4',
    data(){
        return{
            ques:'',
            QUESTION:[],
            questionNum:1, //题号 顺序
            radio2: '',
            page:1 , //随机题
            showA: false, //展示答案
            Grade:0,
            bingoQ:[]
        }
    },
    mounted(){
       this.question();
    },
    methods:{
        question(){
            let _this = this;
            var pagenum = parseInt(Math.random()*900) //随机题数

            this.page = pagenum;

            _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/jktk?type=c1&subject=1&pagesize=1&pagenum='+pagenum+'&sort=nomal&appId=0acb8f03-98dc-4d15-81fd-3a32f797ae67').then((res)=>{
                this.ques = res.data.result.result
                this.QUESTION = res.data.result.result.list[0]
            })
        },
        prev(){  //上一题
            this.showA = false

            this.questionNum -=1;

            let _this = this;

            this.page-=1;

            _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/jktk?type=c1&subject=1&pagesize=1&pagenum='+this.page+'&sort=nomal&appId=0acb8f03-98dc-4d15-81fd-3a32f797ae67').then((res)=>{
                this.ques = res.data.result.result
                this.QUESTION = res.data.result.result.list[0]
            })
        },
        next(){ //下一题
            this.showA = false

            this.questionNum +=1;

            let _this = this;

            this.page+=1;

            _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/jktk?type=c1&subject=1&pagesize=1&pagenum='+this.page+'&sort=nomal&appId=0acb8f03-98dc-4d15-81fd-3a32f797ae67').then((res)=>{
                this.ques = res.data.result.result
                this.QUESTION = res.data.result.result.list[0]
            })
            if(this.QUESTION.answer==this.radio2){
                if(!(this.bingoQ.indexOf(this.ques.pagenum)>-1)){
                    this.bingoQ.push(this.ques.pagenum)
                    this.Grade+=1;
                }
            }
            
        },
        showAnswer(){
            this.showA = true
        }
    },
    watch:{
        QUESTION(val,oldval){
            if(val.option1!=''){
                this.radio2 = 'A'
            }else{
                this.radio2 = '对'
            }    
        }

    }
}
</script>
<style >
    .home{
        width: 100%;
        background-image:url('/static/5.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        min-height: 900px;
        position: relative;
    }
    .bgbox{
        width: 100%;
        min-height: 900px;
        background-color: rgba(255, 255, 255, 0.5)
    }
    .bgbox>h2{
        text-align: center;
        color: #fff;
        font-weight: 500;
        padding: 30px 0;
        margin: 0;
        text-shadow: 4px 1px 6px #575555;
    }
    .box{
        width:1000px;
        margin:0 auto;
        border: 1px solid #e4e3e3;;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 5px;
        max-height: 600px;
        padding: 30px 50px;
        overflow: hidden;
        overflow-y: scroll;
    }
    .box>div{
        height: 100%;
    }
    .box>div>h2{
        margin: 0;
        color: #606266;
        margin-bottom: 50px;
    }
    .problem{
        min-height: 205px;
        border: 1px dashed #409eff;
        padding: 0 15px;
        margin-bottom: 30px;
        overflow: hidden;
    }
    .choose{
        float: left;
    }
    .pro_img{
        float: right;
        margin-bottom: 25px;
    }
    .box .el-radio-group{
        margin-left: 30px;
    }
    .el-radio+.el-radio{
        margin: 0;
    }
    .box .el-radio{
        display: block;
        margin-bottom: 20px;
    }
    .el-radio__label{
        font-size: 15px;
    }
    .answer{
        margin-top: 30px;
    }
    .answer>h2{
        text-indent: 5px;
        margin: 0;
        font-size: 22px;
        color: red;
    }
    .answer p{
        margin-top: 10px;
        font-size: 15px;
    }
    .grade{
        float: right;
        color: green;
        font-size: 20px;
        font-weight: 800;
        padding:10px 30px 0 0;  
    }
</style>


