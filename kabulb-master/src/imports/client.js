import 'intersection-observer'
import 'vue-googlemaps/dist/vue-googlemaps.css'

import { Meteor } from 'meteor/meteor'
import CreateApp from './app'

Meteor.startup(() => {
  console.log('client.js Meteor.startup');
  CreateApp({
    ssr: false,
  })
})
