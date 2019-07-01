<template>
<div class="index">
  <p class="shop">商城导航</p>
  <div>
  </div>
  <div class="home" :style="imgStyle">
    <img src="/go@2x.png" width="14" class="go">
    <img src="/now@2x.png" width="14" class="bignow">
    <img src="/now@2x.png" width="10" class="now" v-if="now">
    <img src="/go@2x.png" width="14" :style="wzStyle" class="wz" v-if="wz">
    <img src="/dt@2x.png" width="18" class="dt">
    <img src="/dt@2x.png" width="18" class="dt_">
    <p class="gogo">目的地</p>
    <p class="nownow">您在这</p>
    <div class="bg"></div>
    <img src="/20190513180138.gif" class="gif" width="1440" v-if="gif">
    <img src="/20190513180137.gif" class="giff" width="1420" v-if="giff">
  </div>
</div>
</template>

<script>
import { HTTP } from 'meteor/http'
export default {
  data () {
    return {
      now: true,
      wz: false,
      imgStyle: 'background-image: url("/img@2x.png")',
      wzStyle: '',
      gif: false,
      giff: false
    }
  },
  created() {
    setTimeout(() => {
      this.gif = true;
      setTimeout(() => {
        this.wz = true;
      }, 500);
      setTimeout(() => {
        this.wz = false;
      }, 2000);
    }, 6300);
    setTimeout(() => {
      this.giff = true;
    }, 13000);
    setTimeout(() => {
      this.now = false;
      this.imgStyle = 'background-image: url("/2img@2x.png")';
      this.wz = true;
      this.gif = false;
    }, 14500);
  },
  methods: {
  },
}
</script>

<style lang="less" scoped>
.index{
  -webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
  -ms-user-select: none;
  overflow-y: hidden;
  overflow: hidden;
  p.shop{
    font-size: 40px;
    padding-left: 60px;
    color: #fff;
    text-align: center;
    margin: 20px 0;
  }
  .home{
    position: absolute;
    width: 730px;
    height: 510px;
    top: 50%;
    left: 50%;
    margin-left: -370px;
    margin-top: -255px;
    background-size: cover;
    animation: dh 2.5s linear 6s;
    div.bg{
      position: absolute;
      width: 20px;
      height: 30px;
      background: #212830;
      top: 450px;
      left: 327px;
    }
    .gif{
      position: absolute;
      top: -168px;
      left: -319px;
    }
    .giff{
      position: absolute;
      top: -162px;
      left: -312px;
    }
    .go{
      margin-right: 34px;
    }
    .dt{
      position: absolute;
      top: 482px;
      left: 327px;
      animation: dtdh 4s linear 12s forwards;
    }
    .dt_{
      position: absolute;
      top: 130px;
      left: 366px;
    }
    .wz{
      position: absolute;
      top: 310px;
      left: 186px;
      animation: sx 2s linear forwards;
    }
    p.gogo{
      position: absolute;
      top: 20px;
      left: -18px;
      color: #fff;
      font-size: 14px;
    }
    p.nownow{
      position: absolute;
      top: 20px;
      left: 36px;
      color: #fff;
      font-size: 14px;
    }
    .line{
      position: absolute;
      top: 286px;
      left: 300px;
    }
    .now{
      position: absolute;
      top: 270px;
      left: 530px;
      transform-origin: center 15px;
      animation: mz 4s linear 1s forwards;
    }
  }
}
main{
  min-width: 600px !important;
  margin:0 auto !important;
  padding: 0 !important;
}
@keyframes mz {
      0%{
        transform: rotate(0deg);
      }
      20%{
        transform: rotate(30deg);
      }
      40%{
        transform: rotate(-90deg);
      }
      60%{
        transform: rotate(-70deg);
      }
      80%{
        transform: rotate(-180deg);
      }
      100%{
        transform: rotate(-90deg);
      }
    }
    @keyframes dh {
      0%{
        background-image: url('/img@2x.png');
        opacity: 0.5;
      }
      20%{
        background-image: url('/2img@2x.png');
        opacity: 1;
      }
      40%{
        background-image: url('/2img@2x.png');
        opacity: 1;
      }
      60%{
        background-image: url('/2img@2x.png');
        opacity: 1;
      }
      80%{
        background-image: url('/2img@2x.png');
        opacity: 0.5;
      }
      100%{
        background-image: url('/img@2x.png');
        opacity: 1;
      }
    }
    @keyframes sx {
      0%{
        opacity: 0;
      }
      20%{
        opacity: 1;
      }
      40%{
        opacity: 0;
      }
      60%{
        opacity: 1;
      }
      80%{
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
    }
    @keyframes dtdh {
      0%{
        top: 477px;
      }
      5%{
        top: 472px;
      }
      10%{
        top: 467px;
      }
      15%{
        top: 462px;
      }
      20%{
        top: 457px;
      }
      25%{
        top: 452px;
      }
      26%{
        top: 482px;
      }
      35%{
        top: 477px;
      }
      40%{
        top: 472px;
      }
      45%{
        top: 467px;
      }
      50%{
        top: 462px;
      }
      55%{
        top: 457px;
      }
      60%{
        top: 452px;
      }
      61%{
        top: 482px;
      }
      70%{
        top: 477px;
      }
      75%{
        top: 472px;
      }
      80%{
        top: 467px;
      }
      85%{
        top: 462px;
      }
      90%{
        top: 457px;
      }
      95%{
        top: 453px;
      }
      96%{
        top: 482px;
      }
    }
</style>
