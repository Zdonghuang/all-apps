<template>
  <div class="home">
      <h2>元曲三百首</h2>
      <div class="box">
        <div class="serach">
          <button @click="serachAll">查询所有元曲</button>
          <div> <input type="text" placeholder="请输入诗词关键字" v-model="keyword" /><button @click="serachPoem">搜索</button></div>
          <p class="red" v-show="keyword==''||!reg.test(keyword)">{{ hint }}</p>
        </div>
        <div class="content">
          <div class="shici" v-show="shiciShow&&!error">
            <h3>诗词荐赏</h3>
            <div v-for="(item,index) in showshiciList" :key="index">
              <h3>{{item.title}}</h3>
              <p>{{item.author}}</p>
              <p v-html='item.content'></p>
              <span v-show="item.explanation">注释：</span>
              <div v-html="item.explanation"></div>
              <span v-show="item.translation">翻译：</span>
              <div v-html="item.translation"></div>
              <span v-show="item.appreciation">赏析：</span>
              <div v-html="item.appreciation"></div>
            </div>
          </div>
          <div class="auth_all" v-show="authAll" >
            <p v-for="(item,index) in showauthorList" :key="index" 
                @click="poemDetail(item.detailid)">{{item.name}} <span>({{item.author}})</span></p>
          </div>
          <div class="poem_detail" v-show="poemdetail">
            <h3>{{poem.title}}</h3>
            <p>{{poem.author}}</p>
            <p v-html="poem.content"></p>
            <span v-show="poem.type">类型：</span>
            <p style="text-align:left;">{{poem.type}}</p>
            <span v-show="poem.explanation">注释：</span>
            <div v-html="poem.explanation"></div>
            <span v-show="poem.appreciation">赏析：</span>
            <div v-html="poem.appreciation"></div>
          </div>
          <div class="serach_poem" v-show="serachpoems">
            <div v-for="(item ,index) in serachPoemContent.list" :key="index">
              <h3>{{item.title}}</h3>
              <p>{{item.author}}</p>
              <p v-html="item.content"></p>
              <span v-show="item.type">类型：</span>
              <p style="text-align:left;">{{item.type}}</p>
              <span v-show="item.explanation">注释：</span>
              <div v-html="item.explanation"></div>
              <span v-show="item.appreciation">赏析：</span>
              <div v-html="item.appreciation"></div>
            </div>
            <div class="page" >
              <button v-show="pagenum!=1" @click="prevpage">上一页</button>
              <button @click="nextpage" v-show="serachPoemContent.total!=1&&pagenum!=serachPoemContent.total">下一页</button>
              <span>{{serachPoemContent.pagenum}}/{{serachPoemContent.total}} 页</span>
            </div>
          </div>
          <!-- 加载 -->
          <div class="loader" v-if="loaderShow">
              <div class="loader-inner ball-clip-rotate-multiple">
                <div></div>
                <div></div>
              </div>
          </div>
          <!-- 第三方api -->
          <div class="error" v-show="error">
            <p>第三方API暂不可用，请稍后再试！</p>
          </div>
          <!-- 次数受限 -->
          <!-- <div class="error" v-show="limit">
            <p>今天已超过次数限制，请稍后再试！</p>
          </div> -->
        </div>
      </div>
      <div class="shadow-box" v-show="alertBox">
        <div class="shadow">
              <p>{{alert}}</p>
              <button @click="closeAlert">OK</button>
        </div>
        <!-- <span @click="closeAlert">x</span>
        {{alert}} -->
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      keyword:'',  //元曲查询关键字
      showshiciList:{},//诗词鉴赏
      showauthorList:{},//古诗列表
      shiciShow:true, //诗词鉴赏展示
      authAll:false, //查询全部诗
      poemdetail:false, //诗词详情
      serachpoems:false, //元曲查询
      poem:{},  //古诗详情
      serachPoemContent:{}, //古诗查询结果
      pagenum:0,
      author:'',
      hint:'',
      reg:/^[\u4e00-\u9fa5]+$/,
      loaderShow:false,
      alert:'',
      alertBox:false,
      error:true
    }
  },
  mounted(){
    this.showshici();
  },
  methods:{
    showshici(){
      this.loaderShow = true

      let _this = this;
      _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/yqsbs_search?keyword=关汉卿&appId=1aa1b890-6068-4b4a-bcc8-cc41c812319f&pagesize=1&pagenum=1').then((res)=>{
         if(res.data.code == '10000'){
           this.error=false;
           if(res.data.result.msg=='ok'&&res.data.result.status=="0"){
              this.alertBox = false
              this.loaderShow = false
              this.showshiciList = res.data.result.result.list;
           }else{
              this.loaderShow = false
              this.alertBox = true
              this.alert = res.data.result.msg;
           }
         }else{
           this.error=true;
         }
      })
    },
    serachAll(){
      this.loaderShow = true

      let _this = this;
      _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/yqsbs_all?appId=1aa1b890-6068-4b4a-bcc8-cc41c812319f').then((res)=>{
        if(res.data.code=='10000'){
          this.error=false;
          this.shiciShow = false
          this.poemdetail = false
          this.authAll = true
          this.serachpoems = false;
          if(res.data.result.msg=='ok'&&res.data.result.status=="0"){
              this.loaderShow = false
              this.alertBox = false
              this.showauthorList = res.data.result.result;
          }else{
              this.loaderShow = false
              this.alertBox = true
              this.alert = res.data.result.msg;
          }   
        }else{
          this.error=true;
        }
      })
    },
    poemDetail(id){
      this.loaderShow = true

      let _this = this;
      _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/yqsbs_detail?detailid='+id+'&appId=1aa1b890-6068-4b4a-bcc8-cc41c812319f').then((res)=>{
        if(res.data.code == '10000'){
          this.error=false;
          this.authAll = false
          this.poemdetail = true
          this.serachpoems = false;
          if(res.data.result.msg=='ok'&&res.data.result.status=="0"){
            this.loaderShow = false
            this.alertBox = false
            this.poem = res.data.result.result;
          }else{
              this.loaderShow = false
              this.alertBox = true
              this.alert = res.data.result.msg;
          }
        }else{
          this.error=true;
        }
      })
    },
    serachPoem(){
      let _this = this;
      if(!this.keyword==""){
        if(!this.keyword==""&&this.reg.test(this.keyword)){
          this.loaderShow = true
          _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/yqsbs_search?keyword='+this.keyword+'&appId=1aa1b890-6068-4b4a-bcc8-cc41c812319f&pagesize=1&pagenum=1').then((res)=>{
            if(res.data.code == '10000'){
              this.error=false;
              this.shiciShow = false;
              this.authAll = false;
              this.poemdetail = false;
              this.serachpoems = true;

              if(res.data.result.msg=='ok'&&res.data.result.status=="0"){
                this.loaderShow = false
                this.serachPoemContent = res.data.result.result
                this.author = this.serachPoemContent.list[0].author;
                this.pagenum = this.serachPoemContent.pagenum;
                this.alertBox = false
              }else{
                this.loaderShow = false
                this.alertBox = true
                this.alert = res.data.result.msg;
              }
            }else{
              this.error=true;
            }
          })
        }else{
          this.hint =' 您输入有误，请重新输入';
        }
      }else{ this.hint = '输入不能为空' }

    },
    prevpage(){
      this.loaderShow = true

      this.pagenum--
      let _this = this;
      _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/yqsbs_search?keyword='+this.keyword+'&pagesize=1&pagenum='+this.pagenum+'&appId=1aa1b890-6068-4b4a-bcc8-cc41c812319f').then((res)=>{
         if(res.data.code == '10000'){
          this.error=true;
          if(res.data.result.msg=='ok'&&res.data.result.status=="0"){
            this.loaderShow = false
          }

           this.serachPoemContent = res.data.result.result
         }else{
           this.error=true;
         }
      })
    },
    nextpage(){
      this.loaderShow = true

      if(this.pagenum!=this.serachPoemContent.total){this.pagenum++}
      let _this = this;
      _this.$ajax.get('https://api.ileapcloud.com/jdapi/wxapi/query/yqsbs_search?keyword='+this.keyword+'&pagesize=1&pagenum='+this.pagenum+'&appId=1aa1b890-6068-4b4a-bcc8-cc41c812319f').then((res)=>{
         if(res.data.code == '10000'){
          this.error=false;
          if(res.data.result.msg=='ok'&&res.data.result.status=="0"){
            this.loaderShow = false
          }

           this.serachPoemContent = res.data.result.result
         }else{
           this.error=true;
         }
      })
    },
    closeAlert(){
      this.alertBox = false;
    }
  }
}
</script>


<style lang="less" scoped>
//加载样式
.loader{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255,255,255,0.7);
}
.ball-clip-rotate-multiple {
  position: relative;     
  left: 45%;
  top: 40%;
}
.ball-clip-rotate-multiple > div {
    -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
    position: absolute;
    left: 0px;
    top: 0px;
    border: 2px solid #d4674e;
    border-bottom-color: transparent;
    border-top-color: transparent;
    border-radius: 100%;
    height: 45px;
    width: 45px;
    -webkit-animation: rotate 1s 0s ease-in-out infinite;
            animation: rotate 1s 0s ease-in-out infinite; 
}
.ball-clip-rotate-multiple > div:last-child {
  display: inline-block;
  top: 10px;
  left: 10px;
  width: 25px;
  height: 25px;
  -webkit-animation-duration: 0.5s;
          animation-duration: 0.5s;
  border-color: #d4674e transparent #d4674e transparent;
  -webkit-animation-direction: reverse;
          animation-direction: reverse; 
}
@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg) scale(1);
            transform: rotate(0deg) scale(1); }

  50% {
    -webkit-transform: rotate(180deg) scale(0.7);
            transform: rotate(180deg) scale(0.7); }

  100% {
    -webkit-transform: rotate(360deg) scale(1);
            transform: rotate(360deg) scale(1); } 
}
//加载样式

.red{
  color: red;
  font-size: 14px;
  margin-left: 3px;
}
.home {
  width: 100%;
  min-width: 1200px;
  height: 900px;
  background:url('/bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}
.alertbox{
  position: absolute;
  top: 40%;
  left: 45%;
  width: 250px;
  height: 40px;
  background: rgba(255,255,255,0.5);
  text-align: center;
  color: #333;
  border: 1.5px solid #B476F0;
  border-radius: 5px;
  line-height: 40px;
  padding: 0 10px;
}
.alertbox span{
    position: absolute;
    top: -13px;
    right: 3px;
    font-size: 17px;
    color: #B476F0;
    cursor: pointer;
}
.home>h2{
  text-align: center;
  font-weight: 500;
  padding: 3rem 0 2rem 0;
  font-size: 30px;
  color: #333;
}
.box{
  width: 1100px;
  margin: 0 auto;
  overflow: hidden;
}
.serach{
  background-color: rgba(255,255,255,0.5);
  width: 278px;
  height: 200px;
  padding: 30px 20px;
  float: left;
}
.serach>div{
  margin-top: 35px;
}
.serach>div input{
  width: 178px;
  outline: none;
  border: none;
  font-size: 14px;
}
button{
  background: #B476F0;
  padding: 8px 14px;
  outline: none;
  border: none;
}
button:hover{
  background: #C6A0EA;
}
button:nth-child(1){
  width: 100%;
}
.content{
  float: right;
  width: 700px;
  height: 650px;
  background-color: rgba(255,255,255,0.5);
  padding: 40px 0;
  overflow: hidden;
  position: relative;
}
.shici, .poem_detail, .auth_all{
  width: 710px;
  height: 570px;
  padding: 0 30px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.shici>h3{
  border-left:3px solid #B476F0; 
  margin: 0;
  padding-left: 15px;
}
.shici>div h3,.shici>div p{
  text-align: center;
}
.shici>div h3,.poem_detail h3 {
  margin-bottom: 0;
}
.shici>div p:nth-child(2) ,.poem_detail p:nth-child(2),.serach_poem>div p:nth-child(2){
  margin: 0px;
  margin-top: 5px;
  font-size: 14px;
  color: #666;
}
.shici>div span ,.poem_detail span,.serach_poem>div span{
  color: #B476F0;
  position: relative;
  margin-top: 20px;
  top: 10px;
}
.shici>div span{
  top: 20px;
}
.serach_poem > div span{
  top: 0;
}
.auth_all p{
  display: inline-block;
  color: #5c97f5;
  margin: 10px;
  cursor: pointer;
}
.auth_all p:hover{
  text-decoration: underline;
}
.auth_all p span{
  font-size: 12px;
  color: #999;
}
.poem_detail h3, .poem_detail p, .serach_poem>div h3, .serach_poem>div p{
  text-align: center;
}
.serach_poem div:nth-child(1){
  height: 500px;
  width: 710px;
  padding: 0 30px;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-bottom: 30px;
}
.page{
  float: right;
  padding: 0 30px;

}
.page button{
  width: 90px;
  margin-right: 30px;
}
.error>p{
  padding-left: 50px;
  font-size: 22px;
}
.shadow-box {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0,0,0,0.3);
      text-align: center;
  }
  .shadow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    transition: 3s;
    width: 370px;
    height: 190px;
    padding: 36px 0 30px 0;
    background-color: #fff;
    border-radius: 5px;
    text-align: center;
  }
  .shadow>p{
    font-size: 18px;
    font-weight: bold;
  }
  .shadow>button{
    background: #BC89F0;
    padding: 10px 30px;
    margin-top: 20px;
  }
</style>
