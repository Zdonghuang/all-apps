
import NotFound from './ui/NotFound.vue'
import Login from './ui/login.vue'
import scene from './ui/scene.vue'
import device from './ui/device.vue'

export default [
  { path: '/', name: 'login', component: Login },
  { path:'/scene', name:'scene', component:scene },
  { path:'/device', name:'device', component:device },
  { path: '*', name: 'not-found', component: NotFound },
]
