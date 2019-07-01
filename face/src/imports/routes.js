import Vue from 'vue'

import NotFound from './ui/NotFound.vue'
import Items from './ui/Items.vue'
import Notes from './ui/Notes.vue'
import NotesComponents from './ui/NotesComponents.vue'
import NotesComputed from './ui/NotesComputed.vue'
import GoogleMap from './ui/GoogleMap.vue'
import Apollo from './ui/Apollo.vue'
import Async from './ui/Async.vue'
import About from './ui/About.vue'
import face from './ui/Face.vue'
import faceAdd from './ui/FaceAdd.vue'
import faceCheck from './ui/FaceCheck.vue'
import faceFind from './ui/FaceFind.vue'
import faceInfo from './ui/FaceInfo.vue'
import faceNum from './ui/FaceNum.vue'

export default [
  { path: "/", name: "face", component: face },
  { path: "/faceAdd", name: "faceAdd", component: faceAdd },
  { path: "/faceCheck", name: "faceCheck", component: faceCheck },
  { path: "/faceFind", name: "faceFind", component: faceFind },
  { path: "/faceNum", name: "faceNum", component: faceNum },
  { path: "/faceInfo", name: "faceInfo", component: faceInfo },
  { path: "/shop", name: "shop", component: Items },
  { path: "/notes", name: "notes", component: Notes, meta: { showCart: true } },
  {
    path: "/notes-components",
    name: "notes-components",
    component: NotesComponents
  },
  { path: "/notes-computed", name: "notes-computed", component: NotesComputed },
  { path: "/map", name: "map", component: GoogleMap },
  { path: "/apollo", name: "apollo", component: Apollo },
  { path: "/async", name: "async", component: Async },
  { path: "/about", name: "about", component: About },
  { path: "*", name: "not-found", component: NotFound }
];
