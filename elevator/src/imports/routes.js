import Vue from 'vue'

import NotFound from './ui/NotFound.vue'
import Home from './ui/Home.vue'
import Items from './ui/Items.vue'
import Notes from './ui/Notes.vue'
import NotesComponents from './ui/NotesComponents.vue'
import NotesComputed from './ui/NotesComputed.vue'
import GoogleMap from './ui/GoogleMap.vue'
import Apollo from './ui/Apollo.vue'
import Async from './ui/Async.vue'
import About from './ui/About.vue'
import appCase2 from './ui/appCase2.vue'
import login from './ui/login.vue'

export default [
  // { path: '/', name: 'home', component: Home },
  { path: '/', name: 'appCase2', component: appCase2 }, //电梯物联网监控平台
  // { path: '/', name: 'login', component: login }, //login 
  { path: '/shop', name: 'shop', component: Items },
  { path: '/notes', name: 'notes', component: Notes, meta: { showCart: true } },
  { path: '/notes-components', name: 'notes-components', component: NotesComponents },
  { path: '/notes-computed', name: 'notes-computed', component: NotesComputed },
  { path: '/map', name: 'map', component: GoogleMap },
  { path: '/apollo', name: 'apollo', component: Apollo },
  { path: '/async', name: 'async', component: Async },
  { path: '/about', name: 'about', component: About },
  { path: '*', name: 'not-found', component: NotFound },
]
