<template>
    <div class="home">
        <div class="menuNav">
            <div>
                <span><img src="./back.png" alt=""  class="back" @click="$router.push('/')"/></span>
                <span>人脸检测</span>
            </div>
        </div>
        <div class="content">
            <div>
                <div class="photos">
                    <img src="./default.png" alt="" v-if="!move">
                    <div class="img" v-if="move">
                        <div class="box1"></div>
                        <div class="box2"></div>
                        <div class="box3"></div>
                    </div>
                    <div class="play">
                        <video id="video"></video>
                    </div>
                    <canvas id='canvas' width='400' height='300' style="display:none"></canvas>
                </div>
                <div class="right">
                    <img src="./find.png" alt="" class="out">
                    <img src="./find2.png" alt="" class="middle" v-show="!success">
                    <img src="./find3.png" alt="" :class="move?'in':'ins'" v-show="!success">
                    <div :class="move?'mask':'masks'"></div>
                    <div class="font" v-if="success">
                        <p>识别成功！</p>
                        <div style="text-align:left">
                            <p>人脸置信度[0-1]：{{msg.face_probability}}</p>
                            <p>年龄：{{msg.age}}</p>
                            <p>美丑打分：{{msg.beauty}}</p>
                            <p>脸型：{{msg.face_shape.type}}</p>
                            <p>性别：{{msg.gender.type}}</p>
                            <p>是否戴眼镜：{{msg.glasses.type}}</p>
                            <p>人种：{{msg.race.type}}</p>
                            <p>真实人脸/卡通人脸：{{msg.face_type.type}}</p>
                            <p>表情：{{msg.expression.type}}</p>
                            <p>情绪：{{msg.emotion.type}}</p>
                        </div>
                    </div>
                    <div class="font" v-show="fail">
                        <p>识别失败！</p>
                        <p>{{errorTip}}</p>
                    </div>
                </div>
            </div>
            <div>
                <button class="btn" @click="check">人脸检测</button>
            </div>
            <!-- <div class="booth">
                <button id='tack'> snap shot</button>
                <canvas id='canvas' width='400' height='300'></canvas>
                <img id='img' src=''>
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            msg:'',
            success:false,
            fail:false,
            file:'',
            pic:'',
            msg:'',
            errorTip:'',
            move:true
        }
    },
    watch:{

    },
    created(){
       
    },
    mounted(){
        this.take();
    },
    methods:{
        take(){
            var video = document.getElementById('video'),
            canvas = document.getElementById('canvas'),
            vendorUrl = window.URL || window.webkitURL;
            //媒体对象
            navigator.getMedia = navigator.getUserMedia ||
                navagator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;
            navigator.getMedia({
                video: true, //使用摄像头对象
                audio: false  //不适用音频
            }, function (strem) {
                // console.log(strem);
                try{
                    video.src = vendorUrl.createObjectURL(strem);
                }catch(e){
                    video.srcObject=strem;
                }
                video.play();
            }, function (error) {
                //error.code
                console.log(error);
            });
        },

        //将blob转换为file
        blobToFile(theBlob, fileName){
            theBlob.lastModifiedDate = new Date();
            theBlob.name = fileName;
            return theBlob;
        },

        //将base64转换为blob
        dataURLtoBlob(dataurl) { 
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        },

        getFile(){
            var canvas = document.getElementById('canvas');
            //绘制canvas图形
            canvas.getContext('2d').drawImage(video, 0, 0, 400, 300);
            //把canvas图像转为img图片
            this.pic = canvas.toDataURL("image/png");
            //调用
            var blob = this.dataURLtoBlob(this.pic);
            this.file = this.blobToFile(blob,name);
        },

        check(){
            this.move=true;
            this.getFile();
            this.form= new FormData();
            this.form.append('file', this.file);
            this.form.append('method', 'rl_jc');
            this.form.append('key', 'kjzkch423lkhj235b345lkxvcn23df4');
            var _this=this;
            _this.$ajax.post('https://api.ileapcloud.com/jdapi/bdapi/use',this.form).then((res)=>{
                // console.log(res);
                if(res.status==200){
                    if(res.data.code!='10000'){
                        _this.fail=true;
                        _this.success=false;
                        _this.move=false;
                    }else{
                        let back=JSON.parse(res.data.result);
                        // console.log(back);
                        if(back.error_code==0){
                            _this.success=true;
                            _this.fail=false;
                            _this.move=false;
                            _this.msg=back.result.face_list[0];
                        }else{
                            _this.fail=true;
                            _this.success=false;
                            _this.move=false;
                            _this.errorTip=back.error_msg;
                        }
                    }
                }
            })
        }
    }
}
</script>
<style scoped>
    .home{
        width: 100%;
        min-width: 1200px;
        height: 860px;
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
        padding: 62px 0 95px 0;
        text-align: center;
    }
    .menuNav span{
        color: #333;
        font-size: 40px;
        font-weight: bold;
    }
    .menuNav span .back{
        width: 50px;
        float: left;
    }
    .content{
        text-align: center;
    }
    .photos .img{
        width: 490px;
        height:490px;
        animation:moveover 3s linear infinite;
        position: relative;
        top: 0;
    }
    .content>div{
        width: 1200px;
        margin: 0 auto;
    }
    .photos{
        display: inline-block;
        width: 490px;
        position: relative;
    }
    .right{
        display: inline-block;
        position: relative;
        margin-left: 150px;
    }
    .out{
       width: 400px;
    }
    .middle{
       width: 280px;
       position: absolute;
       top: 60px;
       left: 66px;
    }
    .in{
       width: 160px;
       position: absolute;
       bottom: 160px;
       left: 128px;  
       opacity: .3;
       animation: pic 9s;
       -webkit-animation: pic 9s;
       animation-fill-mode: forwards;
    }
    .mask{
       background: #fff;
       width: 160px;
       height: 263px;
       z-index: 100;
       position: absolute;
       bottom: 160px;
       left: 128px;  
       animation: myfirst 3s;
       -webkit-animation: myfirst 3s;
       animation-fill-mode: forwards;
       animation-iteration-count:3;
    }
    .ins{
       width: 160px;
       position: absolute;
       bottom: 160px;
       left: 128px;  
       opacity: 1;
    }
    .masks{
       background: #fff;
       width: 160px;
       height: 0px;
       z-index: 100;
       position: absolute;
       bottom: 160px;
       left: 128px;  
    }
    @-webkit-keyframes myfirst
    /* Safari and Chrome */
        {
        0% {
          height: 263px;
        }

        25% {
          height: 200px;
        }

        50% {
          height: 140px;
        }

        75% {
          height: 80px;
        }

        100% {
          height: 0px;
        }
    }
    @-webkit-keyframes pic
    /* Safari and Chrome */
        {
        0% {
          opacity: .3;
        }

        33% {
          opacity: .6;
        }

        66% {
          opacity: .9;
        }

       99% {
          opacity: 1;
        }

        100% {
          opacity: 1;
        }
    }
    .font{
       width: 340px;
       position: absolute;
       top: 30px;
       left: 44px;
    }
    .font span{
        text-align: left;
        float: left;
        width: 80px;
    }
    .font span.msg{
        width: 260px;
    }
    .booth {
        width: 400px;
        background: #ccc;
        border: 10px solid #ddd;
        margin: 0 auto;
    }
    .play{
        width: 454px;
        height: 454px;
        border-radius: 50%;
        z-index: 100;
        overflow: hidden;
        position: absolute;
        top: 18px;
        left: 18px;
    }
    #video{
        width: 606px;
        height: 100%;
        position: absolute;
        left: -75px;
    }
    /*旋转动画*/
    @keyframes moveover {
        0%   {transform:rotate(0deg);}
        100% {transform:rotate(360deg);}
    }
    /* .box{
        position:relative;
        width:100px;
        height:100px;
        animation:moveover 3s linear infinite;
    } */
    .box1{
        position:absolute;
        width: 245px;
        height: 490px;
        border-radius:245px 0 0 245px;
        /* 起始最深颜色为 #999，过渡到中间颜色为 #d0cfcf */
        background: linear-gradient(#1FBDE8, #10DEF3);
        background-color: red;
        z-index:2;
    }
    .box2{
        position:absolute;
        width: 245px;
        height: 490px;
        border-radius:0 245px 245px 0;
        left:50%;
        /* 过渡到中间颜色为 #d0cfcf 最终末尾颜色为 #eee */
        background: linear-gradient(#13D8F1,#10DEF3);
        z-index:1;
    }
    .box3{
        position:absolute;
        width:480px;
        height:480px;
        top:5px;
        left:5px;
        border-radius:50%;
        background-color: #fff;
        z-index:2;
    }
    .btn{
        width:490px;
        height:48px;
        background:linear-gradient(90deg,rgba(79,172,254,1) 0%,rgba(0,242,254,1) 100%);
        border-radius:4px;
        margin-top: 50px;
    }
    button:focus{
        outline: none;
    }
</style>


