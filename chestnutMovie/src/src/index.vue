<template>
    <div class="home">
        <h2>电影推荐</h2>
        <div class="box">
            <div>
                <h2>请输入筛选条件</h2>
                <div class="single_list">
                    <span>城市</span>
                    <el-select v-model="city" placeholder="请选择">
                        <el-option
                        v-for="item in citys"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="single_list">
                    <span>推送时间</span>
                    <el-select v-model="time" placeholder="请选择"> 
                        <el-option
                        v-for="item in times"
                        :key="item.value"
                        :label="item.value"
                        :value="item.options">
                        </el-option>
                    </el-select>
                </div>
                <el-form ref="form" :model="form" :rules="rules" >
                    <el-form-item label="评分" prop="score" class="single_list">
                        <el-input v-model="form.score" placeholder="请输入评分筛选" ></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email" class="single_list">
                        <el-input v-model="form.email" placeholder="请输入邮箱" ></el-input>
                    </el-form-item>
                    <el-form-item label="邮件标题" prop="titleRule" class="single_list">
                        <el-input v-model="form.title" placeholder="请输入标题" ></el-input>
                    </el-form-item>
                </el-form>
                <el-button  type="info" class="btn_ok" @click="submit">确定</el-button>
            </div>
            <div>
                <h2>取消推送信息</h2>
                <p>如果您想取消电影信息推送， 请在这里输入您的邮箱👇</p>
                <el-input placeholder="请输入邮箱" v-model="cancelEmail" class="input-with-select" style="margin-top: 25px;">
                    <el-button slot="append" icon="el-icon-message" @click="cancel"></el-button>
                </el-input>
            </div>
        </div>
    </div>
</template>
<script>
let validateScore = (rule, value, callback)=>{
    let num = /^\d+(\.\d+)?$/;;
    if(!num.test(value)){ callback(new Error('请输入数字或者小数'))}
}
let validateEmail = (rule, value, callback)=>{
    if(!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value))){
        callback(new Error('请输入正确邮箱')) 
    }
}
export default {
    name:'appCase4',
    data(){
        return{
            citys: [{
                value: '上海',
                }, {
                value: '北京',
                }, {
                value: '深圳',
                }, {
                value: '广州',
                }, {
                value: '天津',
            }],
            city:'',
            times: [{value:'01:00',options:'1am'},
                    {value:'02:00',options:'2am'},
                    {value:'03:00',options:'3am'},
                    {value:'04:00',options:'4am'},
                    {value:'05:00',options:'5am'},
                    {value:'06:00',options:'6am'},
                    {value:'07:00',options:'7am'},
                    {value:'08:00',options:'8am'},
                    {value:'09:00',options:'9am'},
                    {value:'10:00',options:'10am'},
                    {value:'11:00',options:'11am'},
                    {value:'12:00',options:'12am'},
                    {value:'13:00',options:'1pm'},
                    {value:'14:00',options:'2pm'},
                    {value:'15:00',options:'3pm'},
                    {value:'16:00',options:'4pm'},
                    {value:'17:00',options:'5pm'},
                    {value:'18:00',options:'6pm'},
                    {value:'19:00',options:'7pm'},
                    {value:'20:00',options:'8pm'},
                    {value:'21:00',options:'9pm'},
                    {value:'22:00',options:'10pm'},
                    {value:'23:00',options:'11pm'},
                ],
            time:'',
            form:{
                score:'',
                email:'',
                title:'',
            },
            rules:{
                score:[{
                      // required: true,
                      message:'请输入数字或者小数',
                      trigger:'blur'
                    },
                    {
                      validator:validateScore,
                      trigger:'blur',
                }],
                email:[{
                    // required: true,
                    message:'请输入正确邮箱',
                    trigger:'blur'
                },{
                    validator:validateEmail,
                    trigger:'blur'
                }]
            },
            cancelEmail:'',
            nextInfo:true,
        }
    },
    mounted(){
        this.remove();
    },
    methods:{
        submit(){
            let _this = this;
            let obj = {
                scenarioUser:this.form.email,
                film:{
                    city:this.city,
                    schedule:this.time
                },
                filmFilter:{
                    score:this.form.score
                },
                email:{
                    email:this.form.email,
                    title:this.form.title
                }
            };
            obj = JSON.stringify(obj);
            _this.$ajax.post('https://api.ileapcloud.com/huginn/v1/FilmApp/insterFilmApp',obj).then((res)=>{
                if(res.data.status=='ok'&& this.nextInfo){
                    this.nextInfo = false
                    this.$message({
                        message: '恭喜您,推送成功',
                        type: 'success'
                    });
                    setTimeout(()=>{
                        this.nextInfo = true;
                    },2900)
                }else if(res.data.result==10001 && this.nextInfo){
                    this.nextInfo = false
                    this.$message({
                        message: '请填写完整信息',
                        type: 'warning',
                        duration: 3000
                    });
                    setTimeout(()=>{
                        this.nextInfo = true;
                    },2900)
                }else if(this.nextInfo){
                    this.nextInfo = false
                    this.$message({
                        message: '抱歉,此用户已推送过,请填写新用户',
                        type: 'warning'
                    });
                    setTimeout(()=>{
                        this.nextInfo = true;
                    },2900)
                }
            })
        },
        cancel(){
            let _this = this;
            if(!this.cancelEmail && this.nextInfo){
                this.nextInfo = false;
                this.$message({
                    message: '邮箱不能为空',
                    type: 'warning'
                });
                setTimeout(()=>{
                    this.nextInfo = true;
                },2900)
            }else if(!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.cancelEmail)) && this.nextInfo){
                this.nextInfo = false;
                this.$message({
                    message: '邮箱格式不正确，请重新输入',
                    type: 'warning'
                });
                setTimeout(()=>{
                    this.nextInfo = true;
                },2900)
            }else{
                let json = JSON.stringify({
                    email:this.cancelEmail,
                    scenario:'豆瓣电影推荐',
                    type:'film'
                });
                _this.$ajax.post('https://api.ileapcloud.com/huginn/v1/Scenarios/deleteScenariosUseEmail',json).then((res)=>{
                    if(res.data.status=='ok' && this.nextInfo){
                        this.nextInfo = false
                        this.$message({
                            message: '取消订阅邮件已经发送到您的邮箱，请前往邮箱进行取消订阅，如未收到邮件,请再次点击。',
                            type: 'success',
                        });
                        setTimeout(()=>{
                            this.nextInfo = true;
                        },2900)
                    }else if(this.nextInfo){
                        switch (res.data.result) {
                            case 10003:
                                this.$message({
                                    message: '邮箱不存在，请检查邮箱',
                                    type: 'warning'
                                });
                                break;
                            case 10001:
                                this.$message({
                                    message: '参数缺失',
                                    type: 'warning'
                                });
                                break;
                            case 10002:
                                this.$message({
                                    message: '此邮箱已添加',
                                    type:'warning'
                                })
                                break;
                        }
                    }
                })
            }

        },
        remove(){
            let _this = this;
            let keyVal = this.$utils.getUrlKey('key')
            _this.$ajax.delete('https://api.ileapcloud.com/huginn/v1/Scenarios/deleteScenariosByKey/'+keyVal).then((res)=>{
                    if(res.data.status=='ok'){
                        this.$message({
                            showClose: true,
                            duration:0,
                            message: '电影推送取消成功',
                            type: 'success'
                        });
                    }
            })
        }
    }
}
</script>
<style >
    .home{
        width: 100%;
        background-image:url('/static/bglz.png');
        background-size: cover;
        background-repeat: no-repeat;
        min-height: 900px;
        position: relative;
    }
    .home>h2{
        text-align: center;
        color: #fff;
        font-weight: 500;
        padding: 30px 0;
        margin: 0;
    }
    .box{
        width:1000px;
        margin:0 auto;
        border: 2px solid #444242;
        background: rgba(0,0,0,0.2);
        border-radius: 5px;
        height: 600px;
        padding: 30px 50px;
        overflow: hidden;
    }
    .box>div{
        height: 100%;
    }
    .box>div>h2{
        color: #ccc;
        margin-bottom: 50px;
    }
    .box>:nth-child(1){
        width: 50%;
        float: left;
        border-right: 1px solid #444242;
    } 
    .box>:nth-child(2){
        float: left;
        padding-left: 30px;
    }
    .box>:nth-child(2) p{
        color: #fff;
    }
    .single_list{
       margin-bottom: 30px;
    }
    .single_list span{
        display: inline-block;
        font-size: 18px;
        color: #ccc;
        width: 75px;
        margin-right: 10px;
        text-align: right;
    }
    /* .single_list .el-input{
        width: 60%;
    } */
    .btn_ok{
        display: block;
        margin-top: 50px;
        width: 390px;
        height: 30px;
        padding: 0
    }
    .home .el-button--info{
        background: #272727;
        border: 1px solid #fff;
    }
    .home .el-button--info:focus, .el-button--info:hover{
        background: #171717;
    }
    .home .single_list .el-form-item__label{
        font-size: 18px ;
        color: #ccc ;
        width: 75px;
        padding: 0;
        margin-right: 14px;
    }
    .home .single_list .el-form-item__content .el-input{
        width: 60%;
    }
    .home .el-form-item__error{
        left: 90px;
    }
    .home .el-input__inner{
        background-color: #171717;
        border: 1px solid #999;
        color: #999;
        height: 30px;
    }
    .home .el-input__prefix, .el-input__suffix{
        top: -4px;
    }
    .home .el-input-group__append{
        background-color:#171717;
        border: 1px solid #999;
        border-left: none;
    }
    .home .el-input-group__append:hover{
        background: #272727;
    }
</style>


