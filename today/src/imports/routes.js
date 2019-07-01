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
import Today from './ui/Today.vue'
import Detail from "./ui/Detail.vue";

export default [
  { path: "/", name: "today", component: Today },
  { path: "/detail", name: "detail", component: Detail },
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
