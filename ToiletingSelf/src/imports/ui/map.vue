<template>
    <div class="map">
      <p class="guide_info" >您当前在L商城一层E区，为您推荐<span class="orange_font_color">{{floor+area}}</span>的<span >{{sex}}</span> ，已为您导航 . . .</p>
      <div class="map_img">
        <img src="/position.png" alt="" width="20">
        <slot></slot>
      </div>
    </div>
</template>
<script>
export default {
    name:'',
    props:{
        floor:'',
        area:'',
        sex:''
    }
}
</script>

<style>
 .map{
     overflow: hidden;
 }
 .orange_font_color{
  color: #FFBF1B;
 }
 .map_img{
    margin-top: 50px;
     width: 1200px;
     height: 500px;
     background-image: url('/map2.png');
     background-size: 100% 100%;
     position: relative;
 }
 .map_img>img{
    position: absolute;
    top: 252px;
    right: 314px;
 }
</style>

