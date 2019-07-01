<template>
    <div class="home">
        <div class="guide" @click="greenGuide">新手指引</div>
        <h2>举个栗子</h2>
        <div style="width:1200px;margin:0 auto;">
            <div class="choose_box" >
                <div v-for="(item,index)  in datalistone" :key="index"  @click="listchooseOne(item.msg,index)" style="position:relative" :class="{z_Index:zIndex&&index==0}">
                    <div style="width:390px; height:220px;overflow:hidden;position:relative;" :class="{img_border_show:img_border_show&&index==0}">
                        <img :src="item.img" alt="" width="390" style="cursor:pointer;" :class="[{img_choose_scale:index==showIndex},{img_choose_show:img_choose_show&&index==0},'img_choose']">
                    </div>
                    <p style="margin-top:30px;">{{item.name}}</p>
                    <div :class="[{z_Index:zIndex},'show_box_choose']" v-show="index==showIndex">
                        <img src="/pitchon_1.png" alt="" width="50">
                    </div>
                    <div class="show_box_choose" v-show="index==1">
                        <p>敬请期待...</p>
                    </div>
                </div>
            </div>
            <div class="choose_btn" >
                <div v-for="(item,index) in datalisttwo"  :key="index" @click="listchooseTwo(item.msg,index)" :class="{choose_btn_show:chooseBtnShown}">
                    <div v-bind:style="{ backgroundImage:'url('+item.first_img+')',backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"  class="img_icon" v-if="chooseBtn_img_Shown"></div>
                    <div v-bind:style="{ backgroundImage:'url('+item.img+')',backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"  class="img_icon" v-else></div>
                    <p :class="{font_color_blue:chooseBtn_img_Shown}">{{item.name}}</p>
                </div>
            </div>
            <div :class="[{show_btn_save:showBtnSave},'btn']">
                <!-- <button @click="load">load</button> -->
                <button @click="save" :class="{save_btn:saveBtn}">保存设置</button>
            </div>
        </div>
       
        <div class="shadow_box" v-if="shadowBoxShown">
            <div style="width:1200px;height:900px;margin:0 auto;">
                <div  @click="firstInfo" v-show="firstInfoShown">
                    <div class="first_info">
                        <p>为您实时发送天气预报、推荐当日电影</p>
                        <p><span></span>&nbsp;&nbsp;举个栗子</p>
                    </div>
                </div>

                <div class="secendInfo" v-show="secendInfoShown" @click.stop="secendInfo">
                    <p><img src="/Arrows_a.png" width="100">1.选择您关注的信息</p>
                </div>

                <div class="thridInfo" v-show="thirdInfoShown" @click="thirdInfo">
                    <div>
                        <p>2.选择提示方式</p>
                        <img src="/Arrows_b2.png" width="80">
                        <img src="/Arrows_b1.png" width="70">
                    </div>
                </div>

                <div class="fouthInfo" v-show="fouthInfoShown" @click="fouthInfo">
                    <div>
                        <p>3.保存设置的选项并发送</p>
                        <img src="/Arrows_c.png" width="100" >
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
            datalistone:[
                { 
                  name:'天气预报' ,
                  msg:'weather',
                  img:'/snow.gif'
                },
                { 
                 name:'今天电影海报',
                 msg:"",
                 img:'/movie.png'
                },
            ],
            datalisttwo:[
                { 
                  name:'点亮指示灯',
                  msg: 'led',
                  img:'/D_hover.png',
                  first_img:'/prompt_Indicatorlight.png',
                  imgShow:'/D_normal.png'
                },
                { 
                  name:'发送微信',
                  msg: 'wechat',
                  img:'/WX_hover.png',
                  first_img:'/prompt_weixin.png',
                  imgShow:'/WX_normal.png'
                }
            ],
            listOne:'',
            listTwo:'',
            userId:'',
            type:'',
            tokenUserId:'',
            showIndex:-1,//第一个选择

            shadowBoxShown:false,//新手引导

            firstInfoShown:true, //第一个提示
            secendInfoShown:false, //第二个提示
            thirdInfoShown:false, //第三个提示
            fouthInfoShown: false, //第四个提示

            img_choose_show:false, //图片显示
            img_border_show:false, //边框显示
            zIndex:false,
            chooseBtnShown:false,//显示选项 wx led
            chooseBtn_img_Shown:false, //选择按钮显示
            showBtnSave:false, //保存设置外部div
            saveBtn:false//保存设置

        }
    },
    created(){
        this.load();
    },
    mounted(){
        
    },
    methods:{
        greenGuide(){
            this.shadowBoxShown = true;
            this.firstInfoShown = true; 
        },
        listchooseOne(msg,indx){
            this.img_border_show = false;
            this.secendInfoShown = false;
            this.img_choose_show = false;
            this.zIndex = false;
            this.chooseBtnShown = true;
            this.thirdInfoShown = true;
            this.chooseBtn_img_Shown = true;


            this.listOne = msg;
            this.showIndex = 0;  //默认选中第一个天气预报
        },
        listchooseTwo(info,idex){
            this.chooseBtn_img_Shown = false;
            this.thirdInfoShown = false;
            this.fouthInfoShown = true;
            this.saveBtn = true;
            this.chooseBtnShown = false;
            this.showBtnSave = true;

            this.listTwo = info;
            if(idex==0){
                this.datalisttwo[0].img = this.datalisttwo[0].imgShow
                this.datalisttwo[1].img = '/WX_hover.png'
            }else if(idex==1){
                this.datalisttwo[1].img = this.datalisttwo[1].imgShow
                this.datalisttwo[0].img = '/D_hover.png'
            }
        },
        save(){
            this.fouthInfoShown = false;
            this.showBtnSave = false;
            this.saveBtn = false;
            this.shadowBoxShown = false; 
            if(this.listOne&&this.listTwo){
                this.saveBtn = false;
                let _this = this;
                _this.$ajax.get('https://api.ileapcloud.com/auth-center/v2/payload/type/example').then((res)=>{
                    if(res.data.status=="ok"){
                    this.type = res.data.result.type
                    this.userId = res.data.result.id
                    }
                    if(!this.userId){
                        let json = _this.qs.parse({
                            content: this.listOne +":"+ this.listTwo,
                            id: this.userId,
                            type: "example"
                        })
                        _this.$ajax.post('https://api.ileapcloud.com/auth-center/v2/payload/add',json).then((res)=>{
                            if(res.data.status=="ok"){
                                this.userId = res.data.result.id;
                            }
                        })
                    } else {
                        let newObj = _this.qs.parse({
                            content: this.listOne +":"+ this.listTwo,
                            id: this.userId,
                            type: "example"
                        })
                        _this.$ajax.put('https://api.ileapcloud.com/auth-center/v2/payload/update',newObj).then((res)=>{
                            
                        })
                    }
                })

                if(this.$jwt) {
                    const decoded = this.$jwt.decode(sessionStorage.getItem('token').substring('Bearer '.length));
                    // console.log(decoded);
                    if(decoded) {
                        // this.tokenUserId = decoded.sub.split('-')[0];
                        this.tokenUserId = '';
                        // console.log(this.tokenUserId);
                    }
                }

                let obj = _this.qs.parse({
                    topic:"serviceconfig",
                    message:"{\"service\":\""+this.listOne+"\",\"action\":\""+this.listTwo+"\",\"userid\":\""+this.tokenUserId+"\"}"
                })

                _this.$ajax.post('https://api.ileapcloud.com/mqtt/publish',obj).then((res)=>{})
            }else{
                alert('您还没有选择');
            } 
        },
        load(){
            let _this = this;
            _this.$ajax.get('https://api.ileapcloud.com/auth-center/v2/payload/type/example').then((res)=>{
                // console.log(res.data.result);
                if(res.data.result==null){
                    this.shadowBoxShown = true
                }else{
                    this.shadowBoxShown = false
                }
                if(res.data.status=="ok"){
                    this.listOne = res.data.result.content.split(':')[0];
                    this.listTwo = res.data.result.content.split(':')[1];

                    for(let i = 0; i< this.datalistone.length; i++){
                        let INDEXONE = i;
                        if(this.datalistone[i].msg ==  this.listOne){
                            this.showIndex = INDEXONE;
                        }
                    }
                    
                    for(var j = 0; j< this.datalisttwo.length; j++){
                        var INDEXTWO = j;
                        if(this.datalisttwo[j].msg ==  this.listTwo && INDEXTWO==0){
                           this.datalisttwo[INDEXTWO].img = this.datalisttwo[INDEXTWO].imgShow;
                           this.datalisttwo[1].img = '/WX_hover.png';
                        }else if(this.datalisttwo[j].msg ==  this.listTwo && INDEXTWO==1){
                            this.datalisttwo[INDEXTWO].img = this.datalisttwo[INDEXTWO].imgShow
                            this.datalisttwo[0].img = '/D_hover.png'
                        }
                    }

                }
            })
        },
        firstInfo(){
            this.firstInfoShown = false; 
            this.secendInfoShown = true;
            this.img_choose_show = true;
            this.img_border_show = true;
            this.zIndex = true;
        },
        secendInfo(){
           
        },
        thirdInfo(){
        },
        fouthInfo(){
            // this.fouthInfoShown = false;
            // this.showBtnSave = false;
            // this.saveBtn = false;
            // this.shadowBoxShown = false; 
        }
    }
}
</script>
<style scoped>
    .home{
        width: 100%;
        background-image:url('/bglz.png');
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
    .guide {
      position: absolute;
      top:50px;
      left: 50px; 
      background-image: url('/save_k_hover.png');
      background-size: cover;
      width: 120px;
      height: 37px;
      line-height: 37px; 
      color: #eee;
      cursor: pointer;
      text-align: center;
      font-size: 15px;
    }
    .guide:hover{
        background-image: url('/save_k_normal.png');
    }
    .choose_box {
        color: #fff;
        margin: 0 auto;
        width: 920px;
        overflow: hidden;
        position: relative;
    }
    .choose_box >div {
        float: left;
        padding: 0 35px;
    }
    .choose_box >div p,.choose_btn>div p{
        text-align: center;
        box-sizing: content-box;
    }
    .choose_box div:nth-child(1){
        margin-bottom: 30px;
    }
    .show_box_choose{
        position: absolute;
        top:0;
        left:35px;
        width: 390px;
        height: 220px;
        background-image: url('/pitchon_2.png');
        background-repeat: no-repeat;
        background-size: cover;
        cursor: pointer;
    }
    .show_box_choose img{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .show_box_choose p {
        color:#ccc;
        text-align:center;
        margin-top: 25%;
        font-size: 20px;
    }
    /* 图片放大 */
    .choose_box .img_choose:hover{
        transform: scale(1.2);
    }
    .img_choose_scale{
        transform: scale(1.2);
    }
    .choose_box>div:last-child .show_box_choose{
        right: 35px;
        left: initial;
    }
     .choose_btn>div:first-child .img_icon:hover{
        background-image: url('/D_normal.png')!important;
    }
     .choose_btn>div:nth-child(2) .img_icon:hover{
        background-image: url('/WX_normal.png')!important;
    }

    .choose_btn{
        color: #fff;
        margin: 0 auto;
        width: 900px;
        overflow: hidden;
    }
    .choose_btn>div{
        float: left;
        margin: 0 175px;
    }
    .choose_btn>div>.img_icon{
        display: block;
        margin: 0 auto;
        width: 100%;
        height: 53px;
        cursor: pointer;
    }
    .btn {
        margin: 0 auto;
        margin-top: 40px;
        overflow: hidden;
        width: 600px;
    }
    .btn button{
      background-color: transparent;
      background-image: url('/save_k_hover.png');
      background-size: cover;
      width: 166px;
      height: 51px;
      line-height: 18px; 
      /* margin: 0 88px; */
      margin: 0 auto;
      display: block;
      outline: none;
    }
    .btn button:hover{
      background-image: url('/save_k_normal.png');
    }

    .shadow_box{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        font-size: 26px;
    }
    .shadow_box>div>div:nth-child(1),.secendInfo,.thridInfo,.fouthInfo{
        width: 100%;
        height: 100%;
    }
    .shadow_box {
        color: #fff;
    }
    .first_info{
        width: 100%;
    }
    .shadow_box .first_info{
        font-size: 30px;
        margin: 0 auto;
        text-align: center;
        padding-top: 16%;
        width: 515px;
    }
    .first_info span{
        width: 75px;
        height: 2px;
        background: #fff;
        display: inline-block;
        vertical-align: middle;
    }
    .first_info p:nth-child(2){
        text-align: right;
    }
    .secendInfo img{
        margin-right: 30px;
        vertical-align: middle;
    }
    .secendInfo p{
        position: absolute;
        top:180px;
        margin-left: 586px;
    }
    .img_choose_show{
        position: absolute;
        top:0;
        left: 0;
        z-index: 1;
    }
    .img_border_show {
        z-index: 1;
        border: 1.5px dashed #04a1f2;
    }
    .z_Index{
        z-index: 2;
    }
    .thridInfo>div:nth-child(1){
       text-align: center;
       width: 100%;
       position: absolute;
       top: 263px;
       margin-left: 270px;
       width: 600px;
    }
    .thridInfo>div:nth-child(1) img{
        position: absolute;
        top: 90px;
        left: 135px;
    }
     .thridInfo>div:nth-child(1) img:nth-child(2){
        left: 400px;
        top: 95px;
     }
    .choose_btn_show, .show_btn_save{
        position: relative;
        z-index: 1;
    }
    .font_color_blue{
        border: 1.5px dashed #04a1f2;
    }

    .fouthInfo>div{
        width: 284px;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 323px;
    }
    .fouthInfo img{
        display: block;
        margin: 0 auto;
    }
    .save_btn {
        background-image: url('/prompt_savesettings.png')!important;
        height: 52px !important;
    }
</style>


