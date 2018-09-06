// pages/teacher/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    hisArr: [],
    hotArr:[],
    resultArr:[],
    isSearched:false,
    list:1,
    total:0
  },
  searchBlur:function(e){
    console.log(e.detail.value)
    this.setData({
      keyword:e.detail.value
    })
  },
  searchFn:function(){
    console.log(this.data.keyword)
    var that=this;
    // 将搜索的关键字存入本地数组
    var keyword=this.data.keyword;
    var arr = wx.getStorageSync("searchArr") || [];
    var isRepeat=false;
    for(var i=0;i<arr.length;i++){
      // 判断是否已经重复
      if(keyword===arr[i]){
        isRepeat=true
      }
    }
    if(that.data.keyword){
      if(!isRepeat){
        if (arr.length >= 10) {
          // 当数组长度大于等于10的时候
          arr.pop();
        }
        arr.unshift(that.data.keyword)
        wx.setStorageSync("searchArr", arr)
      }
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: 'https://mokey.club/Teacher/searchTeacher',
        method: 'POST',
        data: {
          list: 1,
          listRows: 10,
          content: that.data.keyword
        },
        success: function (res) {
          console.log(res.data.data)
          console.log(wx.getStorageSync("searchArr"))
          that.setData({
            resultArr:res.data.data,
            isSearched: true,
            hisArr: arr
          })
          wx.hideLoading();
        }
      })
    }
  },
  clearHis:function(){
    wx.removeStorageSync("searchArr")
    console.log(wx.getStorageSync("searchArr"))
    this.setData({
      hisArr:[]
    })
  },
  changeHot:function(){
    wx.showLoading({
      title: '加载中...',
    })
    var that=this;
    // 页码总数
    var pageNum=Math.ceil(this.data.total/10)
    var currentList=this.data.list
    if(currentList<pageNum){
      currentList++
    }else{
      currentList = 1;
    }
    wx.request({
      url: 'https://mokey.club/Teacher/hotKeyword',
      method:'POST',
      data:{
        listRows:10,
        list:currentList
      },
      success:function(res){
        console.log(res.data.data)
        that.setData({
          list:currentList,
          hotArr:res.data.data
        })
        wx.hideLoading();
      }
    })
  },
  handleTag:function(e){
    // 点击标签事件
    console.log(e.target.dataset.keyword)
    var that = this;
    // 将搜索的关键字存入本地数组
    var keyword = e.target.dataset.keyword;
    var arr = wx.getStorageSync("searchArr") || [];
    var isRepeat = false;
    for (var i = 0; i < arr.length; i++) {
      // 判断是否已经重复
      if (keyword === arr[i]) {
        isRepeat = true
      }
    }
    if (keyword) {
      if (!isRepeat) {
        if (arr.length >= 10) {
          // 当数组长度大于等于10的时候
          arr.pop();
        }
        arr.unshift(keyword)
        wx.setStorageSync("searchArr", arr)
      }
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: 'https://mokey.club/Teacher/searchTeacher',
        method: 'POST',
        data: {
          list: 1,
          listRows: 10,
          content: keyword
        },
        success: function (res) {
          console.log(res.data.data)
          console.log(wx.getStorageSync("searchArr"))
          console.log(that.data.hisArr)
          that.setData({
            resultArr: res.data.data,
            isSearched: true,
            hisArr: arr
          })
          console.log(that.data.hisArr)
          wx.hideLoading();
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.setData({
      hisArr: wx.getStorageSync("searchArr")
    })
    console.log(wx.getStorageSync("searchArr"))
    // wx.setStorageSync("searchArr", ["物理"])
    wx.showLoading({
      title: '加载中...',
    })
    // 获取热门搜索数组
    wx.request({
      url: 'https://mokey.club/Teacher/hotKeyword',
      method:'POST',
      data:{
        listRows:10,
        list:that.data.list
      },
      success:function(res){
        console.log(res.data.data)
        that.setData({
          hotArr:res.data.data,
          total:res.data.num
        })
        wx.hideLoading();
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
  
  }
})