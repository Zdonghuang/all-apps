<template>
<div class="title">
  <h1>
      M停车场监控
  </h1>
  <img src="../titleline.png" alt="">
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('layout', [
      'showCart'
    ]),

    openCart () {
      this.showCart(true)
    },
  },
}
</script>

<style lang="less" scoped>
@import "style/imports";
.title{
  text-align: center;
  margin: 22px auto 44px;
}
h1{
  width: 1200px;
  margin: 0 auto;
  position: relative;
  text-align: center;
  color: #09D1C9;
}
.title>img{
  position: relative;
  top: -20px;
}

nav {
  background: @app-color;
  display: flex;
  flex-direction: row;
  align-items: center;

  > * {
    flex: 0 0 auto;
  }

  a {
    color: white;
    display: inline-block;
    padding: 16px 28px;
    border-radius: 3px 3px 0 0;

    &:hover {
      background: lighten(@app-color, 10%);
    }

    &.router-link-active {
      background: @page-background;
      color: @app-color;
    }
  }
}

.app-title {
  font-size: 1.3rem;
  padding: 0 18px;
}


</style>
