<template>
  <div class="home">
    <div class="title">
      <h2>水印</h2>
      <div class="btn">
        <el-button @click="cancleFont">取消</el-button>
        <el-button @click="makePicture">确认</el-button>
      </div>
    </div>
    <div class="water_mark_box">
      <div class="left_watermark">
        <img :src="userImg? userImg:'/static/small_img.png'" alt="" width="80" height="80">
      </div>
      <div class="center_watermark">
        <div class="btns">
          <el-button class="upImg">
            <input type="file" accept="image/*" @change="handlePictureCardPreview">
            <span>添加图片</span>  
          </el-button>
          <el-button class="upImg" style="width:125px">
            <input type="file" accept="image/*" @change="addPicture">
            <span>添加图片水印</span> 
          </el-button>
          <el-button @click="addFont" style="width:125px">添加文字水印</el-button>
          <!-- <el-button>删除</el-button>
          <el-button>复制</el-button>
          <el-button>预览</el-button> -->
          <el-button @click="down" :disabled="!userImg">          
            <!-- <a :href="userImg" download="">
              下载
            </a> -->
            下载
          </el-button>
        </div>
        <img :src="userImg? userImg:'/static/square.png'" alt="" width="800" height="450">
      </div>
      <div class="right_watermark">
        <p>尺寸：30px X 120px</p>
        <h4>属性</h4>
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
        <div class="transparent">
          <span>间距X：</span>
          <el-slider v-model="logox" :format-tooltip="formatTooltip" :show-tooltip="false"></el-slider>
          <span style="float:right;display: inline-block;width: 25px;text-align: left;font-size:12px;">{{logox}}</span>
        </div>
        <div class="transparent">
          <span>间距Y：</span>
          <el-slider v-model="logoy" :show-tooltip="false"></el-slider>
          <span style="float:right;display: inline-block;width: 25px;text-align: left;font-size:12px;">{{logoy}}</span> 
        </div>
        <textarea name="" id="" cols="30" rows="10" class="text_area" v-model="textArea" v-show="fontShow"></textarea>
        <div class="font_family" v-show="fontShow">
          <span>字体：</span>
          <el-select v-model="fontFamilyVal" placeholder="请选择">
            <el-option
              v-for="item in fontFamily"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="font_family" v-show="fontShow">
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
        <div class="font_color" v-show="fontShow">
            <span>色号：</span>
            <el-color-picker v-model="color3" show-alpha></el-color-picker>
            <div :class="[{click_font:setFontBloder},'font_set']" @click="bloder">B</div>
            <div :class="[{click_font:setFontItalic},'font_set']" style="font-style: italic;" @click="italic">I</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// var fontsize = [{value:12},{value:14},{value:16},{value:18},{value:20},{value:22},{value:24},{value:26},{value:28},{value:30},{value:32},{value:34}]
import slider from './slider.vue'
export default {
  data(){
    return{
      fontShow:false,  
      userImg:'',
      transparent:100,
      scale:0,
      textArea:' 请输入文字。。。',
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
      fontSize:[{value:12},{value:14},{value:16},{value:18},{value:20},{value:22},{value:24},{value:26},{value:28},{value:30},{value:32},{value:34}],
      fontSizeVal:12,
      color3: 'rgba(19, 206, 102, 0.8)',
      r:19,
      g:206,
      b:102,
      setFontBloder:false,
      setFontItalic:false,
      file:{},
      pic:{},
      errMsg:'',
      logox:10,
      logoy:10
    }
  },
  components:{ slider },
  mounted(){},
  methods:{
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
        this.file = e.target.files[0];
        this.userImg  = URL.createObjectURL(this.file);
        e.srcElement.value = ""//及时清空
        // this.userImg = file.url;
        // console.log(this.userImg )
      },
      addPicture(e){
        this.fontShow = false;
        this.pic = e.target.files[0];
        this.addPictures();
        e.srcElement.value = ""//及时清空
      },
      addFont(){
        this.fontShow = true;
      },
      cancleFont(){
        this.fontShow = false;
        this.userImg='';
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
        let pics= new FormData();
        pics.append('file', this.file);
        pics.append('fileWarterMark', this.pic);
        pics.append('alpha',this.transparent/100);
        pics.append('radians',this.scale);
        pics.append('fontDistanceX',this.logox);
        pics.append('fontDistanceY',this.logoy);
        // console.log(pics);
        this.$ajax.post('https://api.ileapcloud.com/tools/imageWithWaterMark/uploadImageWithImageWaterMark',pics).then((res)=>{
          if(res.data.status=='ok'){
            this.userImg='https://www.ileapcloud.com/images/'+res.data.result;
          }else{
            switch(res.data.result){
              case 50001:
                this.errMsg='超过规定大小';
                break;
              case 50002:
                this.errMsg='文件为空';
                break;
              case 50003:
                this.errMsg='文件格式不允许';
                break;
              case 50004:
                this.errMsg='成功';
                break;
              case 50005:
                this.errMsg='上传文件失败';
                break;
              case 50006:
                this.errMsg='参数不正确';
                break;
               default:
                this.errMsg = "上传失败";
            }
            this.$message(this.errMsg);
          }
        }).catch(err => {
            console.log("upload picture failed.");
        });   
      },
      addFonts(){
        this.changeRgba();
        let _this = this;
        let obj = new FormData();
        obj.append('file', this.file);
        obj.append('alpha',this.transparent/100);
        obj.append('radians',this.scale);
        obj.append('warterMarkContent',this.textArea);
        obj.append('fontFamily',this.fontFamilyVal);
        obj.append('fontSize',this.fontSizeVal);
        obj.append('colorX',this.r);
        obj.append('colorY',this.g);
        obj.append('colorZ',this.b);
        obj.append('fontStyle',this.setFontBloder?0:1);
        obj.append('fontDistanceX',this.logox);
        obj.append('fontDistanceY',this.logoy);
        // console.log(obj);
        _this.$ajax.post('https://api.ileapcloud.com/tools/imageWithWaterMark/uploadImageWithFontWaterMark',obj).then((res)=>{
          if(res.data.status=='ok'){
            this.userImg='https://www.ileapcloud.com/images/'+res.data.result;
          }else{
            switch(res.data.result){
              case 50001:
                this.errMsg='超过规定大小';
                break;
              case 50002:
                this.errMsg='文件为空';
                break;
              case 50003:
                this.errMsg='文件格式不允许';
                break;
              case 50004:
                this.errMsg='成功';
                break;
              case 50005:
                this.errMsg='上传文件失败';
                break;
              case 50006:
                this.errMsg='参数不正确';
                break;
               default:
                this.errMsg = "上传失败";
            }
            this.$message(this.errMsg);
          }
        }).catch(err => {
            console.log("upload picture failed.");
        });
      },
      makePicture(){
        this.fontShow?this.addFonts():this.addPictures();
      }
  }
}
</script>


<style >
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
    float: left;
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
    height: 800px;
  }
  .left_watermark{
    width: 120px;
    background-color: #fff;
  }
  .left_watermark img{
    margin: 20px;
  }
  .center_watermark{
    width: 100%;

  }
  .center_watermark .btns{
    padding: 20px;
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
  .right_watermark{
    padding: 30px 20px;
    width: 400px;
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
    margin-right: 20px;
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
</style>
 
