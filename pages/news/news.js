// pages/news/news.js
var sliderWidth = 48; // 需要设置slider的宽度，用于计算中间位置
var uid = wx.getStorageSync('uid') || '';
//获取应用实例
const app=getApp();

Page({
  data: {
    newsList: {},
    loading: false,
    cur_start: 0,
    tabs: ["推荐", "家庭教育", "升学考试","政策法规","搞笑娱乐"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    category:'推荐'
  },
  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    //这里请求的是列表
    wx.request({
      url: 'https://mokey.club/News/NewsByName',
      method: 'POST',
      data: {
        category:that.data.category,
        listRows: 10,
        list:that.data.cur_start,
        uid:uid
      },
      success: function (res) {
        console.log(res)
        var data_list=res.data.data;
        that.setData({
          newsList: data_list,
          cur_start:that.data.cur_start+1
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
      cur_start: that.data.cur_start+1,
      loading: true
    })
    wx.request({
      url: 'https://mokey.club/News/NewsByName',
      method:'POST',
      data: {
        category: that.data.category,
        listRows: 10,
        list: that.data.cur_start,
        uid: uid
      },
      success: function (e) {
        var data_list = e.data.data;
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
      title: '星空师说',
      desc: '师说新闻',
      path: 'pages/news/news'
    }
  },
  tabClick: function (e) {
    var that = this;
    var category = '推荐';
    category = that.data.tabs[e.currentTarget.id]
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      cur_start: 0,
      category: category
    });
    this.onLoad()
  }
})