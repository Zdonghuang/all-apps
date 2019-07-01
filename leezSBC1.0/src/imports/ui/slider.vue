<template>
    <div>   
        <div class="plus" @click="plus"></div>
        <div class="slider" ref="slider">
            <div class="process" :style="{height}"></div>
            <div class="thunk" ref="trunk" :style="{top}">
                <div class="block"></div>
            </div>
            <div class="tips">
                <!-- <span>
                    {{parseInt(scale*100)}}
                </span> -->
            </div>
        </div>
        <div class="subtract" @click="subtract"></div>
    </div>

</template>
<script>
  /*
  * min 进度条最小值
  * max 进度条最大值
  * v-model 对当前值进行双向绑定实时显示拖拽进度
  * */
  export default{
      props:['min','max','value'],
      data(){
        return{
          slider:null,        //滚动条DOM元素
          thunk:null,         //拖拽DOM元素
          per:this.value,     //当前值
        }
      },
      //渲染到页面的时候
      mounted () {
        this.slider = this.$refs.slider;
        this.thunk = this.$refs.trunk;
        var _this = this;
        this.thunk.onmousedown = function (e) {
            var height = parseInt(_this.height);
            var disY = e.clientY;
            document.onmousemove = function(e){
                // value, left, width
                // 当value变化的时候，会通过计算属性修改left，width

                // 拖拽的时候获取的新width
                var newHeight = e.clientY - disY + height;
                // 拖拽的时候得到新的百分比
                var scale = newHeight / _this.slider.offsetHeight;
                _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min);
                _this.per = Math.max(_this.per,_this.min);
                _this.per = Math.min(_this.per,_this.max);
            }
            document.onmouseup = function(){
                document.onmousemove = document.onmouseup = null;
            }
            return false;
        }
      },
      computed:{
        // 设置一个百分比，提供计算slider进度宽度和trunk的left值
        // 对应公式为  当前值-最小值/最大值-最小值 = slider进度width / slider总width
        // trunk left =  slider进度width + trunk宽度/2
        scale(){
          return (this.per - this.min) / (this.max - this.min);
        },
        height(){
          if(this.slider){
            return this.slider.offsetHeight * this.scale + 'px';
          }else{
            return 0 + 'px'
          }
        },
       top(){
          if(this.slider){
            return this.slider.offsetHeight * this.scale -  this.thunk.offsetHeight  + 'px';
          }else{
            return 0 + 'px'
          }
        }
      },
      methods:{
        subtract(){
            if(this.per>this.min){
                this.per-=1;
                this.$emit('subtract',this.per)
            }
        },
        plus(){
            if(this.per<this.max){
                this.per+=1
                this.$emit('plus',this.per)
            }
        },
        // moveOn(){
        //         this.$emit('subtract',this.per)
        // }

      }
  }
</script>
<style>
  .clear:after{content:'';display:block;clear:both}
  .subtract,.plus{margin: 0 15px; vertical-align: middle;cursor: pointer; width: 55px;height: 55px;}
  .subtract{background: url("-_normal.png");background-size: cover;}
  .plus{background: url("+_normal.png");background-size: cover;} 
  .subtract:hover{background: url('/-_hover.png');background-size: cover;}
  .plus:hover{background: url('/+_hover.png');background-size: cover;}
  .slider{position:relative;margin-top:24px;width:70px;height:145px;background:url('/noU.png'); background-size: cover; display: inline-block;margin-left: 7px;margin-bottom: 8px;}
  .slider .process{position:absolute;left:0;top:0;width:70px;height:105px;border-radius:5px;background:url('/hoveU.png');background-size: cover;}
  .slider .thunk{position:absolute;left:0;top:0;width:10px;height:10px}
  /* .slider .block{width:26px;height:26px;transition:.2s all; background: url('/control.png');background-repeat: no-repeat; background-size: cover;} */
  .slider .tips{position: absolute;left: 210px;top: -7px;float: right; font-size: 12px;}
  /* .slider .block:hover{transform:scale(1.1);} */
</style>
