// pages/teacher/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    hisArr: wx.getStorageSync("searchArr"),
    hotArr:['高中', '英语', '放学别跑', '视频课', '化学', '邓亚磊', '李强', '王明', '数学', '语文'],
    resultArr:[
      {
        id:1,
        tname:"邓亚磊",
        title:"校长",
        dept:"高中",
        subject:"英语"
      },
      {
        id: 2,
        tname: "徐静宜",
        title:"项目主管",
        dept: "高中",
        subject: "英语"
      },
      {
        id: 3,
        tname: "田媛",
        title:"师训主管",
        dept: "高中",
        subject: "英语"
      },
      {
        id: 4,
        tname: "刘欣",
        title:"",
        dept: "高中",
        subject: "英语"
      }
  ],
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
    wx.request({
      url: 'https://mokey.club/Teacher/searchTeacher',
      method:'POST',
      data:{
        list:1,
        listRows:10,
        content:that.data.keyword
      },
      success:function(res){
        console.log(res)
      }
    })
  },
  clearHis:function(){
    wx.setStorageSync("searchArr", [])
    this.setData({
      hisArr:[]
    })
  },
  changeHot:function(){
    wx.showLoading({
      title: '加载中...',
    })
    var that=this;
    var pageNum=parseInt(this.data.total/10)+1
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setStorageSync("searchArr", this.data.hisArr)
    var that=this;
    console.log(wx.getStorageSync("searchArr"))
    // wx.setStorageSync("searchArr", ["物理"])

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