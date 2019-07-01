import Vue from 'vue'

import NotFound from './ui/NotFound.vue'
import Home from './ui/Home.vue'
// import login from './ui/login.vue'


export default [
  // {path:'/',name:'login',component:login},
  { path: '/', name: 'home', component: Home },
  { path: '*', name: 'not-found', component: NotFound },
]
