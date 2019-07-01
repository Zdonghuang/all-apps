<template>
    <div class="home">
        <div class="home_box">
            <div class="title">
                <!-- <h2>娱乐</h2>
                <h2>出行</h2>
                <p>让生活有更多的小美好</p> -->
            </div>
            <div class="login_box"> 
                <h2 style="margin-top:20px;">login</h2>
                <div class="user_input">
                    <input type="text" placeholder="username" v-model="username">
                    <input type="password" placeholder="password" v-model="password">
                    <img src="/accountnumber_icon.png" alt="" width="11%">
                    <img src="/password_icon.png" alt="" width="11%">
                    <div class="pic">
                        <input type="text" placeholder="verifycode" v-model="vpicCode" class="pic">
                        <img :src="vpic" alt="图片验证">
                    </div>
                    <span class="change" @click="changePic">try again</span>
                    <p class="red">{{errMsg}}</p>
                </div>
                <div class="login_btn" @click="login()">login</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'login',
    data(){
        return{
            username:'',
            password:'',
            vpicCode:'',
            vpic:'',
            vpicClientId:'',
            errMsg:''
        }
    },
    mounted(){
        // sessionStorage.removeItem('token');
        this.changePic();
    },
    methods:{
        createGUID() {
            const s4 = () => {
                return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            };
            return `${s4()}${s4()}${s4()}${s4()}${s4()}${s4()}${s4()}${s4()}`;
        },
        changePic(){
            var clientId = localStorage.getItem("clientId");
            if (!clientId) {
                clientId = this.createGUID();
                localStorage.setItem("clientId", clientId);
            }
            this.vpicClientId = clientId;
            var seconds = Date.now();
            this.vpic =
                "https://api.ileapcloud.com/auth-center/v2/imagesecurity/securityimagebytes?clientid=" +
                this.vpicClientId +
                "&time=" +
                seconds;
        },
        login(){
            let _this = this;
            let obj = JSON.stringify({
                username: this.username,
                password: this.password,
                clientid: this.vpicClientId,
                vcode: this.vpicCode
            });
            if (
                this.username != "" &&
                this.password != "" &&
                this.vpicCode != ""
            ){
                var tel = '18610959887';
                var users = 'arksun23';
                if(this.username==tel||this.username==users){
                    _this.$ajax.post('https://api.ileapcloud.com/auth-center/login',obj).then((res)=>{
                        if (res.status == 200){
                            this.changePic();
                            switch (res.data) {
                                case 10010:
                                    this.errMsg = "登陆失败次数超过5次，请10分钟后再试";
                                    break;
                                case 10011:
                                    this.errMsg = "用户不存在";
                                    break;
                                case 10012:
                                    this.errMsg = "用户名或密码不正确";
                                    break;
                                case 10014:
                                    this.errMsg = "图片验证码不正确";
                                    break;
                                default:
                                    this.errMsg = "登录失败";
                            }
                            sessionStorage.setItem("token", 'Bearer '+res.headers.authorization);
                            if( sessionStorage.getItem("token")!="undefined"){
                                this.$router.push('/home')
                            }
                        }
                    })
                }else{
                    this.errMsg = "抱歉,此账号没有权限访问";
                }
            }else if (this.username == "") {
                this.errMsg = "用户名/手机号不能为空";
            } else if (this.password.trim() == "") {
                this.errMsg = "请输入正确的密码(6~16个字符)";
            } else if(this.vpicCode == "") {
                this.errMsg = "验证码不能为空";
            }
        
        }
    }
}
</script>
<style scoped>
    .home{
        width: 100%;
        background-image: url('/jglz_bg.png');
        background-size: cover;
        height: 900px;
        position: relative;
    }
    .home_box{
        width:1200px;
        overflow:hidden;
        margin:0 auto;
        height:100%; 
        position:relative;
    }
    .title{
        position: absolute;
        top: 300px;
        left: 190px;
        overflow: hidden;
        color: #f77237;
    }
    .title h2{
        font-size: 34px;
        font-weight: 500;
    }
    .title h2:nth-child(2){
        margin-left: 80px;
    }
    .title p{
        font-size: 24px;
        font-weight: 500;
    }
    .login_box{
        background-image: url('/register_bg.png');
        background-size: cover;
        width: 420px;
        height: 460px;
        position: absolute;
        top:135px;
        right: 100px;
        font-weight: 500;
    }
    .login_box p{
        color: #fff;
        text-align: center;
        margin-left: 30px;
    }
    .login_box h2{
        color: #fff;
        text-align: center;
        font-size: 28px;
        font-weight: 700;
        padding-top: 0;
    }
    .user_input{
        overflow: hidden;
        margin-top: 50px;
        position: relative;
        width: 282px;
        margin: 0 auto;
    }
    .user_input input{
        background-image: url('/public/accountnumber_box.png');
        background-size: cover;
        width: 282px;
        height: 45px;
        outline: none;
        border: none;
        margin: 0 auto;
        display: block;
        border-radius: 4px;
        padding-left: 40px;
        color: #999;
        font-size: 14px;
    }
    .user_input input:nth-child(2){
        margin-top: 30px;
    }
    .user_input img{
        position:absolute;
        top: 12px;
        left: 10px;
    }
    .user_input img:nth-child(4){
        top: 83px;
        left: 10px;
    }
    .pic{
        margin: 0 auto;
        margin-top:30px;
        overflow: hidden;
    }
    .pic input{
        float: left;
        width: 120px;
        margin: 0;
        margin-right: 20px;
        padding: 10px;
    }
    .pic img{
        position: static;
        width: 130px;
        height: 44px;
    }
    .change{
        float: right;
        font-size: 12px;
        font-weight: 400;
        color: rgba(102,102,102,1);
        text-align: right;
        padding-right: 26px;
        cursor: pointer;
    }
    .login_btn{
        background-image: url('/register_box_normal.png');
        background-size: 100% 100%;
        width: 282px;
        height: 45px;
        text-align: center;
        color: #fff;
        margin: 0 auto;
        line-height: 45px;
        margin-top: 10px;
        cursor: pointer;
    }
    .login_box .red{
        color: #e43b3b;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        margin-left: 0;
        margin-top: 24px;
        margin-bottom: 0;
    }
    .login_btn:hover{
        background-image: url('/register_box_hover.png');
    }
    ::-webkit-input-placeholder{
        font-size: 13px;
    }
    @media screen and (max-width:1800px){
        .home_box{
            width: 100%
        }
        .login_box{
            width: 70%;
            margin: 0 auto;
            position: relative;
            right:inherit;
            top: 10%;
            height: 40%;
        }
        .login_box h2{
            font-size: 40px;
                padding: 3rem;
        }
        .user_input{
            width: 80%
        }
        .user_input input{
            width: 100%;
            height: 3rem;
            padding-left: 15%;
            font-size: 20px;
        }
        .user_input>img{
            width: 11%;
            top: 2%;
            left: 1%;
        }
        .user_input img:nth-child(4){
            top: 89px;
            left:1%;
        }
        .user_input input:nth-child(2){
            margin-top: 12%;
        }
        .pic input{
            width: 43%;
            padding-left: 1rem;
            margin-right:2rem;
        }
        .pic img{
            width: 43%;
            height: 2.8rem;
        }
        .change{
            font-size: 1.2rem;
        }
        .login_btn{
            width: 70%;
            height: 3rem;
            line-height: 3rem;
            margin-top: 2rem;
            font-size: 28px;
        }
        .login_box{
            font-size: 2vh;
        }
        .home{
            background-position: 50% 50%;
            height: 1400px;
        }
    }
    /* @media screen and (max-width:1280px){
        .home{
            background-position: 50% 50%;
        }
        .home_box{
            width: 100%;
        }
        .login_box{
            position: relative;
            top: inherit;
            right: inherit;
            margin: 0 auto;
        } */
    /* } */
</style>

