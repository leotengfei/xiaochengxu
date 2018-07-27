// pages/luntan/tiwen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    tags:['标签一','标签二','标签三','标签四','标签五','标签六','标签七','标签八','标签九'],
    mytags:[],
    tag_num:0
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  chooseTag:function(e){
    var that=this;
    var idx = e.currentTarget.dataset.idx;
    var tag=e.currentTarget.dataset.tag;
    var current="mytags["+idx+"]";
    console.log(current)
    if(this.data.mytags[idx]===undefined||this.data.mytags[idx]===null){
    //如果没有选中，添加到数组中
    if(this.data.tag_num>=2){
      return
    }
      this.setData({
        [current]: tag,
        tag_num:that.data.tag_num+1
      })
    }else{
      //如果选中则将值设为null
      this.setData({
        [current]:null,
        tag_num:that.data.tag_num-1
      })
    }


    
    console.log(this.data.mytags)
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