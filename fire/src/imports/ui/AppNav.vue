<template>
<h1>
  S商城一层灭火器智能监控
</h1>
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
h1{
  margin: 30px auto 26px;
  width: 1200px;
  position: relative;
  text-align: center;
  color: #03A0E6;
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
