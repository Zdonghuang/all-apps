import { Meteor } from 'meteor/meteor'
import {  Things, EdgeData, CommandResults , DeviceData } from './collections'



Meteor.publish('things', function () {
  return Things.find({})
})


Meteor.publish('edgedata', function() {
  return EdgeData.find({})
})

Meteor.publish('requestcommandresult', function() {
  return CommandResults.find({})
})

Meteor.publish('devicedata', function() {
  return DeviceData.find({})
})
