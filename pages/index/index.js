//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canLogin: wx.getStorageSync('sessionId'),
    btnDisable: true
  },
  onLoad: function () {
    var that = this
    // 判断本地有没有sessionId
    var sessionId = wx.getStorageSync('sessionId') || '';
    if (sessionId) {
      // 如果有发送sessionId,跳转到news页面
      console.log('使用旧的sessionId')
      console.log(sessionId)
      wx.request({
        url: 'https://mokey.club/User/loginOnce',
        method: 'POST',
        data: {
          sessionId: sessionId
        },
        success: function (res) {
          console.log(res.data.code === 200)
          if (res.data.code === 200) {
            app.globalData.tel = res.data.tel
            wx.switchTab({
              url: '../news/news'
            })
          } else {
            wx.showToast({
              title: '登陆出错,请重新登陆',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    } else {
      // 如果没有,调用wx.login(),获取sessionId,跳转到index页面
      wx.showLoading({
        title: '加载中',
      })
      wx.login({
        success: res => {
          wx.request({
            url: 'https://mokey.club/Token/getSessionId',
            method: 'POST',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res)
              app.globalData.sessionId = res.data.sessionId
              app.globalData.uid = res.data.uid
              console.log('获取新的sessionId')
              wx.hideLoading()
              that.setData({
                btnDisable:false
              })
            }
          })
        }
      })

    }

  },
  getPhoneNumber: function (e) {
    var sessionId = app.globalData.sessionId;
    var that = this
    console.log(e)
    wx.request({
      url: 'https://mokey.club/User/getPhone',
      method: 'POST',
      data: {
        sessionId: sessionId,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      },
      success: function (res) {
        console.log(res)
        if (res.data.code === 200) {
          wx.setStorageSync('sessionId', app.globalData.sessionId)
          wx.setStorageSync('uid', app.globalData.uid)
          wx.navigateTo({
            url: '../index/second',
          })
        } else {
          console.log('手机号验证失败')
          // 拒绝授权的情况下
          wx.switchTab({
            url: '../news/news'
          })
        }
      }
    })
  }
})
