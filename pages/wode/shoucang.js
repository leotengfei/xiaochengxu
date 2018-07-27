// pages/wode/shoucang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currenttab: '0',
    wenti_list: [
      {
        wid: '0001',
        wtitle: '这是问题一',
        wdesc: '这是问题一的描述',
        wtime: '2018-3-28',
        wimg: 'http://ovqkwdw8s.bkt.clouddn.com/xiaochengxu.jpg'
      },
      {
        wid: '0002',
        wtitle: '这是问题二',
        wdesc: '这是问题二的描述',
        wtime: '2018-3-19',
        wimg: ''
      },
      {
        wid: '0003',
        wtitle: '这是问题三',
        wdesc: '这是问题三的描述',
        wtime: '2018-3-11',
        wimg: 'http://ovqkwdw8s.bkt.clouddn.com/xiaochengxu.jpg'
      }
    ],
    videoList: [
      {
        videoId: 'v001',
        poster: 'http://ovqkwdw8s.bkt.clouddn.com/xiaochengxu.jpg',
        intro: '这是我的们小程序中的第一个视频标题kasdfskalf按时交付的开始放假啊萨的疯狂来打扫房间拉升放！！！',
        view_time:'2018-3-29'
      },
      {
        videoId: 'v002',
        poster: 'http://ovqkwdw8s.bkt.clouddn.com/xiaochengxu.jpg',
        intro: '这是我的们小程序中的第二个视频标题！！！',
        view_time: '2018-1-10'
      },
      {
        videoId: 'v003',
        poster: 'http://ovqkwdw8s.bkt.clouddn.com/xiaochengxu.jpg',
        intro: '这是我的们小程序中的第三个视频标题！！！',
        view_time: '2017-3-1'
        }
    ]
  },
  selectTab: function (e) {
    //切换标签页
    console.log(e.currentTarget.dataset.tabid)
    var newtab = e.currentTarget.dataset.tabid;
    if (this.data.currenttab === newtab) {
      return
    } else {
      this.setData({
        currenttab: newtab
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})