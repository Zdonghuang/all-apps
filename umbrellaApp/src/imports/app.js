import 'isomorphic-fetch'

import './plugins'
import './supply'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import VueApollo from 'vue-apollo'
import { createApolloClient } from './api/apollo'
import apiURL from './api/api'
import { injectSupply } from 'vue-supply'
import App from './ui/App.vue'
import routes from './routes'
import storeOptions from './store'
import axios from 'axios'
import qs from 'qs'

import('buffer').then(({Buffer}) => {global.Buffer = Buffer;})

Vue.prototype.qs = qs;

Vue.prototype.$ajax = axios;

axios.defaults.headers = {
  "Content-Type": "application/json"
}

axios.defaults.baseURL = apiURL.apiUrl //默认地址

function createApp (context) {
  const router = new VueRouter({
    mode: 'history',
    routes,
  })

  const supplyCache = {}
  const suppliedStoreOptions = injectSupply(storeOptions, supplyCache)
  const store = new Vuex.Store(suppliedStoreOptions)

  const jwt = require('jsonwebtoken');
  Vue.prototype.$jwt = jwt
  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)


  axios.interceptors.request.use(
    config => {
        if (sessionStorage.getItem('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `${sessionStorage.getItem('token')}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
  );


  

  // Apollo
  const apolloClient = createApolloClient(context.ssr)
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
  })

  return {
    app: new Vue({
      el: '#app',
      router,
      store,
      apolloProvider,
      supplyCache,
      ...App,
    }),
    router,
    store,
    apolloProvider,
  }
}

export default createApp
