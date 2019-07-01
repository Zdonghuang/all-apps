<template>
  <div class="home">
    <transition name="fade">  
      <div class="shadow-box" v-show="load">
          <div class="shadow">
            <img src="../../static/icn_loading.png" alt="" width="100" height="100" class="Rotation"/>
            <p>水印制作中...</p>
          </div>
      </div>
    </transition>
    <div class="title">
      <h2>文档加水印</h2>
    </div>
    <div class="water_mark_box">
      <div class="left_watermark">
        <el-button class="upImg">
          <input type="file" accept=".ppt,.pdf,.pptx" @change="handlePictureCardPreview">
          <span>添加文档</span>  
        </el-button>
        <p v-if="file.name">{{file.name}}</p>
        <p v-else>未选择文档</p>
      </div>
      <div class="center_watermark">
        <div class="btns">
          <el-button style="width:125px" @click="changeStatus">添加图片水印</el-button>
          <el-button @click="addFont" style="width:125px">添加文字水印</el-button>
          <el-button @click="makePicture">确认</el-button>
          <el-button @click="cancleFont">取消</el-button>
        </div>
        <div class="fileList">
            <p class="tip">提示：文档支持pdf和ppt，最大支持10M，图片水印最大支持1M</p>
            <div v-if="fileList.length>0" class="list">
              <div  v-for="(item,index) in fileList" :key='index'>
                <p><a :href="item" :download="item.replace(url, '')" target="_blank">{{item}}</a></p>
              </div>
            </div>
        </div>
      </div>
      <div class="right_watermark">
        <h4>属性</h4>
        <div class="font_family" v-show="fontShow==1" style="margin-bottom:-10px;">
          <div class="transparent">
            <el-button class="upImg" style="width:125px">
              <input type="file" accept="image/*" @change="addPicture">
              <span>图片水印添加</span> 
            </el-button>
            <p style="margin:10px 0 30px;color:#0027BC;font-size:16px" v-if="this.pic.name">{{this.pic.name}}</p>
            <p style="margin:10px 0 30px;color:#0027BC;font-size:16px" v-else>未选择图片</p>
            <div>
              <span>缩放比例：</span>
              <el-slider v-model="percent" :show-tooltip="false" :min="0" :max="100"></el-slider>
              <span style="float:right;display: inline-block;width: 25px;text-align: left;font-size:12px;">{{percent}}</span> 
            </div>
          </div>
        </div>
        <div class="repeat">
          <span>水印位置：</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- <el-select v-model="value" placeholder="请选择">
            <el-option value="平铺"></el-option>
            <el-option value="左上"></el-option>
            <el-option value="右上"></el-option>
            <el-option value="左下"></el-option>
            <el-option value="右下"></el-option>
            <el-option value="居中"></el-option>
          </el-select> -->
        </div>
        <div class="transparent">
          <span>透明度：</span>
          <!-- <slider :min=0 :max=100 v-model = "transparent" style="display:inline-block;"></slider>   -->
          <el-slider v-model="transparent" :format-tooltip="formatTooltip" :show-tooltip="false"></el-slider>
          <span style="float:right;display: inline-block;width: 25px;text-align: left;font-size:12px;">{{transparent}}</span>
        </div>
        <div class="transparent">
          <span>旋转度：</span>
          <!-- <slider :min=0 :max=100  v-model = "scale" style="display:inline-block;"></slider>  -->
          <el-slider v-model="scale" :show-tooltip="false" :min="0" :max="360"></el-slider>
          <span style="float:right;display: inline-block;width: 25px;text-align: left;font-size:12px;">{{scale}}</span> 
        </div>
        <div class="transparent" v-if="showxy">
          <span>间距X：</span>
          <el-slider v-model="logox" :format-tooltip="formatTooltip" :show-tooltip="false" :min="0" :max="200"></el-slider>
          <span style="float:right;display: inline-block;width: 25px;text-align: left;font-size:12px;">{{logox}}</span>
        </div>
        <div class="transparent" v-if="showxy">
          <span>间距Y：</span>
          <el-slider v-model="logoy" :show-tooltip="false" :min="0" :max="200"></el-slider>
          <span style="float:right;display: inline-block;width: 25px;text-align: left;font-size:12px;">{{logoy}}</span> 
        </div>
        <textarea name="" id="" cols="30" rows="10" class="text_area" v-model="textArea" v-show="fontShow==2"></textarea>
        <!-- <div class="font_family" v-show="fontShow==2">
          <span>字体：</span>
          <el-select v-model="fontFamilyVal" placeholder="请选择">
            <el-option
              v-for="item in fontFamily"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div> -->
        <div class="font_family" v-show="fontShow==2">
          <span>字号：</span>
          <el-select v-model="fontSizeVal" placeholder="请选择">
            <el-option
              v-for="item in fontSize"
              :key="item.value"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="font_color" v-show="fontShow==2">
            <span>色号：</span>
            <el-color-picker v-model="color3" show-alpha></el-color-picker>
            <!-- <div :class="[{click_font:setFontBloder},'font_set']" @click="bloder">B</div> -->
            <!-- <div :class="[{click_font:setFontItalic},'font_set']" style="font-style: italic;" @click="italic">I</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// var fontsize = [{value:12},{value:14},{value:16},{value:18},{value:20},{value:22},{value:24},{value:26},{value:28},{value:30},{value:32},{value:34}]
export default {
  data(){
    return{
      showxy:true,
      load:false,
      fontShow:0,  
      userImg:'',
      transparent:10,
      scale:45,
      textArea:' 请输入文字。。。',
      options: [{
          value: 1,
          label: '左上'
        }, {
          value: 2,
          label: '右上'
        }, {
          value: 3,
          label: '右下'
        }, {
          value: 4,
          label: '左下'
        }, {
          value: 5,
          label: '居中'
        }, {
          value: 6,
          label: '平铺'
        }],
      value:6,
      percent:100,
      fontFamily: [{
          value: 'SimSun',
          label: '宋体'
        }, {
          value: 'Microsoft YaHei',
          label: '微软雅黑'
        }, 
        // {
        //   value: 'Heiti SC',
        //   label: '黑体-简'
        // }, {
        //   value: 'STXihei',
        //   label: '华文细黑'
        // }, {
        //   value: 'SimHei',
        //   label: '黑体'
        // }
        ],
      fontFamilyVal:'',
      fontSize:[{value:12},{value:14},{value:16},{value:18},{value:20},{value:22},{value:24},{value:26},{value:28},{value:30},{value:32},{value:34},{value:38},{value:42},{value:45},{value:50},{value:55},{value:60},{value:65},{value:70},{value:75},{value:80},{value:85},{value:90},{value:100}],
      fontSizeVal:100,
      color3: 'rgba(19, 206, 102, 0.8)',
      r:19,
      g:206,
      b:102,
      setFontBloder:false,
      setFontItalic:false,
      file:{},
      pic:{},
      errMsg:'',
      logox:150,
      logoy:150,
      fileList:[],
      url:'https://www.ileapcloud.com/images/',
      fileSize:0,
      picSize:0,
    }
  },
  mounted(){},
  watch:{
    value(curVal,oldVal){
// 　　　　console.log(curVal,oldVal);
      curVal!=6?this.showxy=false:this.showxy=true;
　　}
  },
  methods:{
      changeStatus(){
        this.fontShow=1;
      },
      down() {
        //必须同源才能下载
        var alink = document.createElement("a");
        alink.href = this.userImg;
        alink.download = "pic"; //图片名
        alink.click();
      },
      bloder(){
        this.setFontBloder = !this.setFontBloder 
      },
      italic(){
        this.setFontItalic = !this.setFontItalic 
      },
      handlePictureCardPreview(e){
        this.fileSize=0;
        this.fileSize = e.target.files[0].size;
        if((this.fileSize)/1024>10000){  
         this.$message.error("文档不能大于10M");
        }else{
          this.file = e.target.files[0];
          this.userImg  = URL.createObjectURL(this.file);
          // console.log(e.target.files[0]);
          // console.log((this.fileSize)/1024/1000);     
        }
        e.srcElement.value = ""//及时清空
      },
      addPicture(e){
        this.fontShow = 1;
        this.picSize=0;
        this.picSize = e.target.files[0].size;
        if((this.picSize)/1024>1000){  
         this.$message.error("水印图片不能大于1M");
        }else{
          this.pic = e.target.files[0];
          // console.log(e.target.files[0]);
          // console.log((this.picSize)/1024/1000);     
        }
        // this.addPictures();
        e.srcElement.value = ""//及时清空
      },
      addFont(){
        this.fontShow = 2;
      },
      cancleFont(){
        this.fontShow = 0;
        this.userImg='';
        this.file='';
        this.pic='';
      },
      // 透明度
      formatTooltip(val) {
        return val / 100;
      },
      // rgba转为数字
      changeRgba(){
        var rgb = this.color3.match(/(\d(\.\d+)?)+/g);
        this.r=parseInt(rgb[0]);
        this.g=parseInt(rgb[1]);
        this.b=parseInt(rgb[2]);
        // this.transparent=parseFloat(rgb[3])*100;
      },
      addPictures(){
        this.load=true;
        let pics= new FormData();
        pics.append('file', this.file);
        pics.append('logoFile', this.pic);
        pics.append('alpha',this.transparent/100);
        pics.append('radians',this.scale);
        pics.append('distanceX',this.logox);
        pics.append('distanceY',this.logoy);
        pics.append('position',this.value);
        pics.append('rotation',this.scale);
        pics.append('strokeOpacity',this.transparent/100);
        pics.append('percent',this.percent);
        this.$ajax.post('https://api.ileapcloud.com/tools/docWithWarter/image',pics).then((res)=>{
          if(res.data.status=='ok'){
            this.load=false;
            // console.log(res);
            this.fileList.unshift(this.url+res.data.result);
          }else{
            this.load=false;
            switch(res.data.result){
              case 50001:
                this.errMsg='超过规定大小';
                break;
              case 50002:
                this.errMsg='文档为空';
                break;
              case 50003:
                this.errMsg='文档格式不允许';
                break;
              // case 50004:
              //   this.errMsg='成功';
              //   break;
              case 50005:
                this.errMsg='上传文档失败';
                break;
              case 50006:
                this.errMsg='参数不正确';
                break;
               default:
                this.errMsg = "该文档内容未能解析成功";
            }
            this.$message.error(this.errMsg);
          }
        }).catch(err => {
          this.load=false;
          this.$message.error("Add watermark failed,please try again later.");
          console.log("Add watermark failed,please try again later.");
        });   
      },
      addFonts(){
        this.load=true;
        this.changeRgba();
        let _this = this;
        let obj = new FormData();
        obj.append('file', this.file);
        obj.append('alpha',this.transparent/100);
        obj.append('strokeOpacity',this.transparent/100);
        obj.append('radians',this.scale);
        obj.append('font',this.textArea);
//         obj.append('fontFamily',this.fontFamilyVal);
        obj.append('fontSize',this.fontSizeVal);
        obj.append('colorX',this.r);
        obj.append('colorY',this.g);
        obj.append('colorZ',this.b);
//         obj.append('fontStyle',this.setFontBloder?0:1);
        obj.append('distanceX',this.logox);
        obj.append('distanceY',this.logoy);
        obj.append('position',this.value);
        // console.log(obj);
        _this.$ajax.post('https://api.ileapcloud.com/tools/docWithWarter/font',obj).then((res)=>{
          if(res.data.status=='ok'){
            this.load=false;
            // console.log(res);
            this.fileList.unshift(this.url+res.data.result);
          }else{
            this.load=false;
            switch(res.data.result){
              case 50001:
                this.errMsg='超过规定大小';
                break;
              case 50002:
                this.errMsg='文档为空';
                break;
              case 50003:
                this.errMsg='文档格式不允许';
                break;
              // case 50004:
              //   this.errMsg='成功';
              //   break;
              case 50005:
                this.errMsg='上传文档失败';
                break;
              case 50006:
                this.errMsg='参数不正确';
                break;
               default:
                this.errMsg = "该文档内容未能解析成功";
            }
            this.$message.error(this.errMsg);
          }
        }).catch(err => {
          this.load=false;
          this.$message.error("Add watermark failed,please try again later.");
          console.log("Add watermark failed,please try again later.");
        });
      },
      makePicture(){
        if(this.file.name){        
          switch(this.fontShow){
            case 1:
              (this.pic.name)?this.addPictures():this.$message("请添加水印图片");
              break;
            case 2:
              this.addFonts();
              break;
            default:
              this.$message("请选择添加水印类型");
          }
        }else{
          this.$message("请选择要添加水印的文档");
        }
      }
  }
}
</script>


<style >
@keyframes rotation{
from {transform: rotate(0deg);}
to {transform: rotate(360deg);}
}
@-moz-keyframes rotation /* Firefox */
{
from {-moz-transform: rotate(0deg);}
to {-moz-transform: rotate(360deg);}
}

@-webkit-keyframes rotation /* Safari 和 Chrome */
{
from {-webkit-transform: rotate(0deg);}
to {-webkit-transform: rotate(360deg);}
}

@-o-keyframes rotation /* Opera */
{
from {-o-transform: rotate(0deg);}
to {-o-transform: rotate(360deg);}
}

.Rotation{
  transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  animation: rotation 3s linear infinite;
  -moz-animation: rotation 3s linear infinite;
  -webkit-animation: rotation 3s linear infinite;
  -o-animation: rotation 3s linear infinite;
}
.shadow-box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(0,0,0,0.5);
    /* background: url(../../static/loading.gif) no-repeat center;
    background-size: cover; */
    text-align: center;
    z-index: 2000;
}
.shadow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  -moz-transform: translate(-50%,-50%);
  transition: 3s;
  width: 500px;
  height: 300px;
  padding: 36px 0 30px 0;
  background-color: transparent;
  border-radius: 5px;
  text-align: center;
  /* position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0; */
}
.shadow>p{
  color: #3ECBFA;
  font-size: 30px;
  margin-top: 80px;
  text-align: center;
}
p,h4,span {
    text-align: left;
}
  .home{
    background-color: #ECEFF5;
  }
  .title {
    padding: 28px;
    overflow: hidden;
  }
  .title h2{
    text-align: center;
    font-weight: 500;
    font-size: 30px;
    margin: 0;
  }
  .btn{
    float: right;
  }
  .btn button {
    width:90px;
    margin-right: 20px;
    background:rgba(1,173,244,1);
    outline: none;
    color: #fff;
  }
  .btn button:hover{
    background:rgba(80,202,252,1);
  }
  .btn button:nth-child(1){
    background:rgba(255,255,255,1);
    border:1px solid rgba(223,223,223,1);
    color: #000;
  }
  .btn button:nth-child(1):hover{
    background-color: #f7f3f3;
  }
  .water_mark_box{
    width: 100%;
    display: flex;
    min-height: 800px;
  }
  .left_watermark{
    width: 280px;
    background-color: #fff;
    padding: 20px;
  }
  .left_watermark p{
    color:rgb(0, 39, 188);
  }
  .left_watermark button{
    background:rgba(1,173,244,1);
    color: #fff;
  }
  .left_watermark button:hover{
    background:rgba(80,202,252,1);
    color: #fff;
  }
  .left_watermark p{
    text-align: center;
  }
  .center_watermark{
    width: 100%;
  }
  .center_watermark .btns{
    padding: 20px 50px;
    background:rgba(246,247,249,1);
    overflow: hidden;
  }
  .btns .el-upload{
    float: left;
  }
  .center_watermark .btns button{
    margin-right: 15px;
    background:rgba(1,173,244,1);
    outline: none;
    color: #fff;
    float: left;
    border-radius: 3px;
    border: none;
  }
  .center_watermark .btns button:last-child{
    background:rgba(80,202,252,1);
  }
  .center_watermark .btns button:hover{
    background:rgba(80,202,252,1);
  }
  .center_watermark img{
    display: block;
    margin: 0 auto;
    margin-top: 100px;
  }
  /* .tip{
    color: #0027BC;
  } */
  .right_watermark{
    padding: 30px 20px;
    width: 300px;
    min-width: 300px;
    background-color: #fff;
    font-size: 13px;
    color: #333;
  }
  .right_watermark p{
    margin: 0;
  }
  .right_watermark h4{
    font-size: 16px;
  }
  .right_watermark .transparent{
    overflow: hidden;
    margin-bottom: 20px;
  }
  .transparent span{
    width: 67px;
  }
  .transparent span, .transparent .slider{
      float: left;
  }
  .text_area{
    height:100px;
    width: 270px;
    border:1px solid rgba(203,208,220,1);
    border-radius:4px;
    resize: none;
    outline: none;
    font-size: 12px;
    padding: 4px;
    margin-left: -2px;
    margin-bottom: 15px;
  }
  .font_family{
    overflow: hidden;
    margin-bottom: 20px;
  }
  .font_family .el-select{
    width: 238px;
  }
  .el-input__inner{
    height: 35px;
  }
  .font_color>div{
    margin-left: 4px;
    float: left;
  }
  .font_color>span{
    float: left;
    line-height: 30px;
  }
  .el-color-picker__trigger{
    padding:0 !important;
    height: 30px;
    width: 31px;
  }
  .el-color-picker__color{
    overflow: hidden;
    border: none;
  }
  .el-color-picker__color-inner{
    top: -1px;
  }
  .font_set{
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 30px;
    width: 30px;
    padding: 4px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    font-size: 14px;
    position: relative;
    cursor: pointer;
    color: #000;
    line-height: 23px;
    font-weight: 800;
    text-align: center;
  }
  .upImg{
    padding: 0 !important;
    width: 100px;
    overflow: hidden;
    position: relative;
    background:rgba(1,173,244,1);
    color: #fff;
  }
  .upImg:hover{
    background:rgba(80,202,252,1);
    color: #fff;
  }
  .upImg input {
    position: relative;
    z-index: 1;
    opacity: 0;
    padding: 8px 20px;
    outline: none;
    cursor: pointer;
  }
  .upImg>span>span{
    position: absolute;
    top:12px;
    left:23px;
    cursor: pointer;
  }
  .fileList{
    width: 800px;
    /* height: 500px; */
    padding: 0 0 30px 50px;
  }
  .click_font{
    background: #e6e6e6 !important;
  }
  .el-slider__runway {
    width: 200px !important;
    height: 5px !important;
    margin: 0 !important;
    display: inline-block !important;
    text-align: left !important;
    margin-left: 2px !important;
  }
  .el-slider__button{
    width: 10px !important;
    height: 10px !important;
    border: 1px solid rgba(203,208,220,1) !important;
  }
  .slider .block:hover {
    -webkit-transform: scale(1) !important;
    transform: scale(1) !important;
    opacity: 0 !important;
  }
  .el-slider__button-wrapper.hover, .el-slider__button-wrapper:hover{
    cursor: pointer !important;
  }
  .el-slider__button:hover{
    cursor: pointer !important;
  }
  .right_watermark{
    text-align: left !important;
  }
  .el-slider{
    width: 200px !important;
    display: inline-block !important;
  }
  .el-button.is-disabled:hover{
    color:#fff !important;
  }
  .repeat{
    padding: 10px 0 20px 0;
  }
  .list{
    margin-top: 30px;
  }
  .list a{
    color: rgb(3, 151, 214);
    text-decoration: none;
  }
  .el-loading-spinner .el-loading-text {
    font-size: 16px !important;
    margin-top: 20px !important;
    text-align: center !important;
  }
</style>
 
