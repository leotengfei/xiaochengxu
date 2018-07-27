// pages/luntan/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    isSearching: false
  },
  inputTyping: function (e) {
    if (e.detail.value) {//如果内容不为空
      // this.inputValue = e.detail.value
      this.setData({
        inputValue: e.detail.value
      })
      //发送ajax请求

      //改变isSearching值

      this.setData({
        isSearching: true
      })
    } else {
      //当内容为空的时候显示历史
      this.setData({
        isSearching: false
      })
    }
  },
  cancel_search: function () {
    //清空input值
    this.setData({
      inputValue: '',
      isSearching:false
    })
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