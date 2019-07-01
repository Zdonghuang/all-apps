<template>
  <nav>
    <div class="app-title">
      <span>灯泡模拟故障预测与健康管理</span>
      <!-- <span class="powered-by" >powered by: LeapAI.com</span> -->
      </div>
    <!-- <div class="actions">
      <button @click="openCart"><i class="material-icons">settings</i></button>
    </div> -->

  </nav>
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

nav {
  /*  background: @app-color;*/
  background: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  padding: 25px 0 30px 0;
  text-align: center;
  color: #007DC6;

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
  width: 100%;
  font-size: 1.6rem;
  padding: 0;
  min-width: 1366px;
}

.powered-by {
  flex: 1 1 auto;
  float: right;
  text-align: right;
  font-size: 0.8rem;
  margin-top: 1rem;
}

.actions {
  max-width: 8%;
  flex: 1 1 auto;
  text-align: right;
  padding: 4px 12px;
}
</style>
