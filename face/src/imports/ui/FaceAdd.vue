<template>
    <div class="home">
        <div class="menuNav">
            <div>
                <span><img src="./back.png" alt=""  class="back" @click="$router.push('/')"/></span>
                <span>添加人脸</span>
            </div>
        </div>
        <div class="content">
            <div class="photo">
                <img src="./default.png" alt="" v-show="!move">
                <div class="play">
                    <video id="video"></video>
                </div>
                <canvas id='canvas' width='400' height='300' style="display:none"></canvas>
                <div class="img" v-show="move">
                    <div class="box1"></div>
                    <div class="box2"></div>
                    <div class="box3"></div>
                </div>
            </div>
            <div class="info">
                <div>
                    <span>备注信息（选填）</span>
                    <input type="text" v-model="msg">
                </div>
                <p>{{errorTip}}</p>
                <button  @click="goNext()">保存原始面部信息</button>
            </div>
            <!-- <div class="booth">
                <button id='tack'> snap shot</button>
                <img id='img' src=''>
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            file:'',
            pic:'',
            msg:'',
            errorTip:'',
            move:false
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

        // unicode码转换
        unicodeToChar(data){
            if(data == '' || typeof data == 'undefined') return '请输入十六进制unicode';
            data = data.split("\\u");
            var str ='';
            for(var i=0;i<data.length;i++){
                str+=String.fromCharCode(parseInt(data[i],16).toString(10));
            }
            return str;
        },

        goNext(){
            this.getFile();
            this.form= new FormData();
            this.form.append('file', this.file);
            this.form.append('method', 'rl_addrlgroup');
            this.form.append('key', 'kjzkch423lkhj235b345lkxvcn23df4');
            this.form.append('faceGroup', 'group');
            this.form.append('userInfo', this.msg);
            this.move=true;
            var _this=this;
            _this.$ajax.post('https://api.ileapcloud.com/jdapi/bdapi/use',this.form).then((res)=>{
                if(res.status==200){
                    if(res.data.code!='10000'){
                        this.move=false;
                        _this.errorTip='保存失败，请稍后再试！';
                    }else{
                        let back=JSON.parse(res.data.result);
                        if(back.error_code==0){
                            _this.errorTip='保存成功';
                        }else{
                            _this.errorTip=back.error_msg;
                            this.move=false;
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
        height: 900px;
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
        padding: 62px 0 45px 0;
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
    .content img{
        width: 490px;
    }
    .photo{
        width: 490px;
        height:560px;
        margin: 0 auto;
        position: relative;
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
    .info span{
        font-size: 20px;
        color: #333;
    }
    .info input{
        width: 310px;
        border:1px solid rgba(153,153,153,1);
        border-radius:4px;
        margin-left: 15px;
    }
    .info>p{
        font-size:14px;
        font-family:AlibabaPuHuiTiL;
        font-weight:300;
        color:rgba(248,12,12,1);
        line-height:30px;
        width:490px;
        margin: 0 auto;
        text-align: left;
        margin-top: 40px;
    }
    .info>button{
        width:490px;
        height:48px;
        background:linear-gradient(90deg,rgba(79,172,254,1) 0%,rgba(0,242,254,1) 100%);
        border-radius:4px;
    }
    .menuNav span .back{
        width: 50px;
        float: left;
    }
    button:focus{
        outline: none;
    }
    .photo .img{
        width: 490px;
        height:490px;
        animation:moveover 3s linear infinite;
        position: relative;
        top: 0px;
    }
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
    /*旋转动画*/
    @keyframes moveover {
        0%   {transform:rotate(0deg);}
        100% {transform:rotate(360deg);}
    }
</style>


