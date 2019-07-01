import './imports/api/methods'
// import echarts from '../node_modules/echarts'

// Meteor.prototype.$echarts = echarts ;

if (Meteor.isClient) {
  import './imports/client'
} else if (Meteor.isServer) {
  import './imports/server'
}
