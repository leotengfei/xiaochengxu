// pages/newsDetail/newsDetail.js
//获取应用实例
const app = getApp();
const uid = wx.getStorageSync('uid') || '';

const WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.index)
    console.log('uid'+uid)
    console.log('nid'+options.index)
    var that = this;
    wx.request({
      url: 'https://mokey.club/News/newsData',
      method: 'POST',
      data:{
        uid:uid,
        nid:options.index
      },
      success:function(res){
        console.log('文章内容'+res)
        console.log(res)
        console.log(res.data.content)
        var article = res.data.content;
        console.log(1);
        WxParse.wxParse('article', 'html', article, that, 5);
        console.log(2)
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '小星-新闻',
      desc: '小星新闻详情',
      path: 'pages/newsDetail/newsDetail'
    }
  }
})