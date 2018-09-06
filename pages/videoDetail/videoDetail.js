// 视频播放详情页
const app=getApp();

Page({
  /**
  * 生命周期函数--监听页面加载
  */
  inputValue: '',
  data: {
    videoInfo:{},
    current_src:'',
    current_index:0,
    scroll_h: '0',
    videoCurrentTime: 0
  },
  onLoad: function (options) {
    var that=this;
    var uid = wx.getStorageSync('uid') || '';
    console.log(options.videoid)
    wx.showLoading({
      title: '加载中...',
    })
    // 发送ajax请求
    wx.request({
      url: 'https://mokey.club/video/videoInfo',
      method:'POST',
      data:{
        cid: options.videoid,
        uid:uid
      },
      success:function(res){
        console.log(res)
        wx.hideLoading();
        that.setData({
          videoInfo:res.data,
          current_src: res.data.detail[0].videoUrl,
        })
        console.log(that.data.videoInfo)

      }
    })
  },
  onReady: function (res) {
    var that=this;
    this.videoContext = wx.createVideoContext("myVideo");
    this.videoContext.seek(that.data.videoCurrentTime)
  },
  onShow: function(){
    var that=this;
    //给定scrollView的高度
    var myVideoH = 0;
    var myFabiaoH = 0;

    // 获取#myVideo的高度
    wx.createSelectorQuery().select('#myVideo').fields({
      size: true
    }, function (res) {
      myVideoH=res.height
      console.log(res.height)
      //获取#myFabiao的高度
      wx.createSelectorQuery().select('#myFabiao').fields({
        size: true
      }, function (res) {
        myFabiaoH = res.height
        console.log(res.height)
        try {
          var res = wx.getSystemInfoSync()
          console.log(res.windowHeight)
          var my_h = res.windowHeight - myVideoH - myFabiaoH;
          console.log("my_h" + my_h)
          that.setData({
            scroll_h:my_h+'px'
          })
          console.log(that.data.scroll_h)

        } catch (e) {
          // Do something when catch error
        }
      }).exec()
    }).exec()
  },
  changeVideo:function(e){
    // 选集方法
    console.log(e.currentTarget.dataset.idx);
    var that=this;
    var idx = e.currentTarget.dataset.idx;
    this.videoContext = wx.createVideoContext("myVideo");
    this.videoContext.pause();
    this.setData({
      current_index: idx,
      current_src: that.data.videoInfo.detail[idx].videoUrl,
    });
    this.videoContext.pause();
  },
  bindZan: function (e) {
    var that = this;
    var uid = wx.getStorageSync('uid') || '';
    var param = {};
    var string = "videoInfo.like_count";
    var string_iszan="videoInfo.isLike"
    var cid = that.data.videoInfo.cid;
    if (uid) {
      // 如果已经登陆
      wx.request({
        url: 'https://mokey.club/video/like',
        method: 'POST',
        data: {
          uid: uid,
          cid: cid
        },
        success: function (res) {
          console.log(res)
          if (res.data.status === 2) {
            //点赞成功，修改数量
            param[string] = ++that.data.videoInfo.like_count;;
            param[string_iszan] = true;
            wx.showToast({
              title: '点赞成功',
              icon: 'success',
              duration: 500
            })
          } else {
            //如果赞过，赞数字减1，iszan变为false
            param[string] = --that.data.videoInfo.like_count;
            param[string_iszan] = false;
            wx.showToast({
              title: '取消点赞',
              icon: 'success',
              duration: 500
            })
          }
          that.setData(param);
        }
      })
    } else {
      // 如果没有登陆，跳转到登录页面
      wx.navigateTo({
        url: '/pages/index/index'
      })
    }
  },
  shoucang: function (e) {
    var that = this;
    var uid = wx.getStorageSync('uid') || '';
    var param = {};
    var string = "videoInfo.isCollect";
    var cid = that.data.videoInfo.cid;
    if (uid) {
      // 如果已经登陆
      wx.request({
        url: 'https://mokey.club/video/collect',
        method: 'POST',
        data: {
          cid: cid,
          uid: uid
        },
        success: function (res) {
          console.log(res.data.status)
          if (res.data.status === 2) {
            //如果没有收藏，isCollect变为true
            param[string] = true;
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 500
            })
          } else {
            //如果收藏过，isCollect变为false
            param[string] = false;
            wx.showToast({
              title: '取消收藏',
              icon: 'success',
              duration: 500
            })
          }
          that.setData(param);
          // console.log(that.data.videoList)
        }
      })

    } else {
      console.log('没有登陆')
      wx.navigateTo({
        url: '/pages/index/index'
      })
    }
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  //三点分享
  onShareAppMessage: function () {
    return {
      title: '小星',
      desc: '小星-视频',
      path: 'pages/videoDetail/videoDetail?videoid='+this.data.videoid
    }
  }
})