<template>
  <transition name="right-panel" duration="500">
    <div class="cart-overlay">
      <div class="backdrop" @click="close" />
      <div class="panel" :class="$style.cart">
        <div class="empty-text" :class="$style.meow">
          设置 <span :class="foo.bar">&nbsp;</span>
        </div>
        <hr>
        <div class="row text-left">
          <div class="col">
            使用模拟模型
          </div>
	        <div class="col">
            <div class="slideThree">
              <input type="checkbox" id="localmodel" v-model="psudoML">
              <label for="localmodel"></label>
            </div>
	        </div>
        </div>
        <div class="row text-left">
          <div class="col">
            基准值:<input type="number" v-model="baseline">
          </div>
          <div class="col">
            <button @click="setBaselineValue()"><i class="material-icons">tune</i></button>
          </div>
        </div>
        <!--
        <div class="row text-left">
          <div class="col">
            失效值:<input type="number" v-model="bottomline">
          </div>
          <div class="col">
            <button @click="setBottomline()"><i class="material-icons">tune</i></button>
          </div>
        </div>
        -->
        <div class="row text-left">
          <div class="col">
            <button @click="simulateBulbColorChange()">测试灯泡颜色</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },
  created () {
    //console.log(this.$style)
  },

  computed: {
    psudoML: {
      get: function () {
        console.dir(this);
        return this.$store.state.config.psudoML;
      },
      set: function(v) {
        this.$store.state.config.psudoML = v;
      }
    },
    ...mapGetters('config', [
      'testStage',
      'bottomline',
      'baseline',
      'temperature',
      'lumination',
    ]),
  },

  methods: {
    ...mapActions('layout', [
      'showCart',
    ]),
    ...mapActions('config', [
      'setTestStage',
      'setBottomline',
      'setBaseline',
    ]),

    close () {
      this.showCart(false)
    },

    setBaselineValue() {
      console.log('setBaseline to ' + this.lumination);
      this.setBaseline(this.lumination);
    },

    setBottomline() {
      console.log('setBottomline')
    },

    simulateBulbColorChange() {
      console.log('psudoML=', this.psudoML);
      this.setTestStage((this.testStage + 1) % 4);
    }
  },
}
</script>

<style lang="less" scoped>
@import "style/imports";

.cart-overlay {
  .overlay;
}

.slideThree {
  width: 80px;
  height: 26px;
  background: #333;
//  margin: 20px auto;
  position: relative;
  border-radius: 50px;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
}
.slideThree:after {
  content: 'OFF';
  color: #000;
  position: absolute;
  right: 10px;
  z-index: 0;
  font: 12px/26px Arial, sans-serif;
  font-weight: bold;
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.15);
}
.slideThree:before {
  content: 'ON';
  color: #27ae60;
  position: absolute;
  left: 10px;
  z-index: 0;
  font: 12px/26px Arial, sans-serif;
  font-weight: bold;
}
.slideThree label {
  display: block;
  width: 34px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 3px;
  left: 3px;
  z-index: 1;
  background: #fcfff4;
  background: linear-gradient(to bottom, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
  border-radius: 50px;
  transition: all 0.4s ease;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
}
.slideThree input[type=checkbox] {
  visibility: hidden;
}
.slideThree input[type=checkbox]:checked + label {
  left: 43px;
}

</style>

<style lang="less" module>
.cart {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 1.8rem 1.6rem;
  max-width: 360px;
}

.cart >div {
  margin: 0.2rem 0.2rem;
}

.cart input {
  width: 60px;
}

.meow {
  color: grey;
}

</style>

<style lang="less" module="foo">
.bar {
  color: black;
}
</style>
