// pages/news/news.js
//获取应用实例
const app=getApp();

Page({
  data: {
    newsList: {},
    loading: false,
    cur_start: 0
  },
  onLoad: function () {
    var that = this
    //这里请求的是列表
    wx.request({
      url: 'https://api.jisuapi.com/news/get',
      data: {
        channel:"教育",
        num: 10,
        start:that.data.cur_start,
        appkey:'a1b25be9702f0d20'
      },
      success: function (e) {
        //console.log(e.data.result.list)
        //console.log(e.data.result.list[0].time.slice(0,10))

        var data_list=e.data.result.list;
        for(var i=0;i<data_list.length;i++){
          data_list[i].time=data_list[i].time.slice(0,10)
          app.globalData.newsDetail[i]=data_list[i].content
          //为全局变量newsDetail[]添加新闻内容
        }
        //console.log(app.globalData.newsDetail)

        that.setData({
          newsList: data_list,
          cur_start:that.data.cur_start+10
        })
        wx.stopPullDownRefresh()//停止下拉刷新动画
      }
    })
  },
  //触底上拉加载新内容
  onReachBottom: function () {
    var that = this
    //每次进入 当前页++
    console.log(that.data.cur_start)
    that.setData({
      cur_start: that.data.cur_start+10,
      loading: true
    })
    wx.request({
      url: 'https://api.jisuapi.com/news/get',
      data: {
        channel: "教育",
        num: 10,
        start: that.data.cur_start,
        appkey: 'a1b25be9702f0d20'
      },
      success: function (e) {
        var data_list = e.data.result.list;
        var newscontent=[];//新闻内容列表
        for (var i = 0; i < data_list.length; i++) {
          data_list[i].time = data_list[i].time.slice(0, 10)
          newscontent[i] = data_list[i].content
        }
        app.globalData.newsDetail = app.globalData.newsDetail.concat(newscontent);//拼接到新闻列表中
        that.setData({
          newsList: that.data.newsList.concat(data_list),
          loading: false
        })
      }
    })
  }
  ,
  //下拉刷新
  onPullDownRefresh: function () {
    this.onLoad()
  },
  //三点分享
  onShareAppMessage: function () {
    return {
      title: '小星',
      desc: '小星-新闻',
      path: 'pages/news/news'
    }
  }
})