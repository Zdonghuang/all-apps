import { Meteor } from 'meteor/meteor'
import { Metrics } from './collections'

Meteor.publish('metrics', function() {
  return Metrics.find({})
})

