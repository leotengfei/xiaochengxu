//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('app.onLaunch加载完成')
  },
  globalData: {
    userInfo: null,
    videoDetial: {},
    tel:'',
    sessionId:'',
    uid:''
  }
})