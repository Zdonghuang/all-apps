// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.qs = qs;

Vue.use(ElementUI);

Vue.config.productionTip = false

//可以通过这种方式给axios设置的默认请求头
axios.defaults.headers = {
  "Content-Type": "application/json"
}

Vue.prototype.$ajax = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
