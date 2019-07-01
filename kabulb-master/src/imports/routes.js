import Vue from 'vue'

import NotFound from './ui/NotFound.vue'
import Home from './ui/Home.vue'

export default [
  { path: '/', name: 'home', component: Home },
  { path: '*', name: 'not-found', component: NotFound },
]
