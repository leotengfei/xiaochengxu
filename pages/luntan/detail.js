// pages/luntan/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textarea_value:'',
    isHuida:false,
    question:{
      title:'这是问题的标题',
      desc:'这是问题的描述',
      img:[
        'http://ovqkwdw8s.bkt.clouddn.com/xiaochengxu.jpg',
        'http://ovqkwdw8s.bkt.clouddn.com/xiaochengxu.jpg',
        'http://ovqkwdw8s.bkt.clouddn.com/xiaochengxu.jpg',
        'http://ovqkwdw8s.bkt.clouddn.com/xiaochengxu.jpg'
      ]
    }
  },
  imgYu: function (event) {
    //图片点击事件
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  huida:function(){
    //切换显示回答输入框
    if(this.data.isHuida){
      this.setData({
        isHuida:false
      })
    }else{
      this.setData({
        isHuida:true
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