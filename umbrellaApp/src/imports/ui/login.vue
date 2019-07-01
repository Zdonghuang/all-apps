<template>
    <div class="home">
        <div class="home_box">
            <div class="login_box"> 
                <h2>用户登录</h2>
                <div class="user_input">
                    <input type="text" placeholder="账号" v-model="username">
                    <input type="password" placeholder="密码" v-model="password">
                    <img src="/accountnumber_icon.png" alt="" width="22">
                    <img src="/password_icon.png" alt="" width="22">
                    <p class="red">{{errMsg}}</p>
                </div>
                <div class="login_btn" @click="login()">登录</div>
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
            errMsg:'',
        }
    },
    mounted(){
        localStorage.clear();
    },
    methods:{
        login(){
            let _this = this;
            let obj = JSON.stringify({
                username: this.username,
                password: this.password,
            });
            if (
                this.username != "" &&
                this.password != "" 
            ){
                _this.$ajax.post('leez/v1/users/login',obj).then((res)=>{
                    if (res.status == 200){
                        if(res.data.status=='ok'){
                            localStorage.setItem("token", 'Bearer '+res.data.result.accessToken);
                            localStorage.setItem("userid", res.data.result.userId);
                            localStorage.setItem("email", res.data.result.userName);
                            this.$router.push('/device')
                        }else{
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
                        }
                    }
                })
            }else if (this.username == "") {
                this.errMsg = "用户名/手机号不能为空";
            } else if (this.password.trim() == "") {
                this.errMsg = "请输入正确的密码(6~16个字符)";
            }
        
        }
    },
}
</script>
<style scoped>
    .home{
        width: 100%;
        background-image: url('/login.jpeg');
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
    .login_box{
        background-image: url('/register_bg.png');
        background-size: cover;
        width: 420px;
        height: 430px;
        position: absolute;
        top:135px;
        left: 50%;
        transform: translateX(-50%);
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
        font-size: 26px;
        font-weight: 700;
        margin-top: 30px;
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
    }
    .login_btn:hover{
        background-image: url('/register_box_hover.png');
    }
    ::-webkit-input-placeholder{
        font-size: 13px;
    }
</style>

