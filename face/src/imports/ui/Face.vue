<template>
    <div class="home">
        <div class="menuNav">
            <div>
                <span>人脸识别</span>
            </div>
        </div>
        <div class="content">
            <div class="btn clearfloat">
                <button @click="goto('/faceAdd')">添加人脸</button>
                <button @click="goto('/faceFind')">人脸查找</button>
                <button @click="goto('/faceNum')">人体统计</button>
            </div>
            <div class="btns clearfloat">
                <button  @click="goto('/faceInfo')">人体属性</button>
                <button  @click="goto('/faceCheck')">人脸检测</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    watch:{

    },
    created(){
       
    },
    mounted(){
        
    },
    methods:{
        goto(path){
            this.$router.push(path);
        }
    }
}
</script>
<style scoped>
    .home{
        width: 100%;
        min-width: 1200px;
        min-height: 100vh;
        position: relative;
        padding-bottom: 50px;
        box-sizing: border-box;
    }
    .menuNav{
        width: 100%;
        background: transparent;
    }
    .menuNav>div{
        width: 900px;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 62px 0 25px 0;
        text-align: center;
    }
    .menuNav span{
        color: #333;
        font-size: 40px;
        font-weight: bold;
    }
    .content{
        text-align: center;
    }
    .content>div{
        width: 1000px;
        margin: 0 auto;
        padding-top: 30px;
    }
    .content button{
        width: 200px;
        height: 200px;
        border-radius: 50%;
        float: left;
        font-size: 20px;
    }
    .btn>button:nth-child(2){
        margin: 0px 200px;
    }
    .btns>button{
        margin: 0 100px 0 200px;
    }
    .btns>button:nth-child(2){
        margin: 0 200px 0 100px;
    }
    button:focus{
        outline: none;
    }
    /*清除浮动代码*/
   .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
   .clearfloat{zoom:1}
</style>


