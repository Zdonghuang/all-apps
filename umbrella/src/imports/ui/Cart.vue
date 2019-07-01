<template>
  <transition name="right-panel" duration="500">
    <div class="cart-overlay">
      <div class="backdrop" @click="close" />
      <div class="panel" :class="$style.cart">
        <div class="empty-text" :class="$style.meow">

          <p style="color:black">举个栗子之雨伞，通过绑定 iLeapCloud 平台的相关 API，实现用户在雨天出门时，智能装置自动提醒用户带雨伞的功能。</p>
          <p style="color:black;margin-top:50px;">实现原理</p>

          <p>1. 设置 web hook agent</p>
          <p>2. 设置 getWeatherAgent 获取所在城市的天气状况</p>
          <p>3. 设置 parse weather agent 解析天气数据</p>
          <p>4. 设置 mqtt agent 发送/接收天气数据</p>

          <p style="color:black;margin-top:50px;">模拟演示</p>

          <p>1. 点击晴天按钮，用户外出，挂在门口的栗子板没有任何动作。</p>
          <p>2. 点击雨天按钮，用户外出，走到门口时，栗子板会发出声音，提醒用户带伞。此时用户可点击栗子板取走雨伞。</p>
          
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created () {
    console.log(this.$style)
  },

  methods: {
    ...mapActions('layout', [
      'showCart'
    ]),

    close () {
      this.showCart(false)
    },
  },
}
</script>

<style lang="less" scoped>
@import "style/imports";

.cart-overlay {
  .overlay;
}
</style>

<style lang="less" module>
.cart {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  max-width: 500px;
  z-index: 99;
}

.meow {
  color: grey;
  text-align: left;
  
  font-weight:bold;
}
</style>

<style lang="less" module="foo">
.bar {
  color: black;
}
</style>
