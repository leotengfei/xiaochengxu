//获取应用实例
var sliderWidth = 48; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();
var uid = wx.getStorageSync('uid') || '';

Page({
  onReady: function (res) {
    // this.videoContext = wx.createVideoContext('myVideo')
  },
  data: {
      tabs: ["推荐", "高中", "初中", "放学别跑"],
      list:1,
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0,
      prevVideoId:'',
      curVideoId:'',
      prevIdx:-1,
      curIdx:-1,
      videoCurrentTime:0,
      videoList: []
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
    wx.showLoading({
      title: '加载中...',
    })

    // 发送请求
    wx.request({
      url: 'https://mokey.club/video/index',
      method: 'POST',
      data: {
        grade: that.data.tabs[that.data.activeIndex],
        list: that.data.list,
        listRow: 10,
        uid: uid
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.data)
        var arr=res.data.data;
        for(var i=0;i<arr.length;i++){
          arr[i].isClicked=false;
        }
        that.setData({
          videoList:arr
        })
      }
    })

  },
  tabClick: function (e) {
    var that = this;
    var category = '推荐';
    category = that.data.tabs[e.currentTarget.id]
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      cur_start: 0,
      category: category,
      list:1
    });
    wx.showLoading({
      title: '加载中...',
    })

    // 发送请求
    wx.request({
      url: 'https://mokey.club/video/index',
      method: 'POST',
      data: {
        grade: that.data.tabs[that.data.activeIndex],
        list: that.data.list,
        listRow: 10,
        uid: uid
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.data)
        var arr = res.data.data;
        for (var i = 0; i < arr.length; i++) {
          arr[i].isClicked = false;
        }
        that.setData({
          videoList: arr
        })
      }
    })


  },
  startPlay: function (e) {//图片上按钮点击播放事件
  console.log(e)
    var curVideoId = e.currentTarget.dataset.vid;
    var curIdx = e.currentTarget.dataset.idx;
    //console.dir(e.currentTarget.dataset.vid)
    if (this.data.prevVideoId) {//如果有之前点击过的视频，暂停之前的视频,切换dom
      var prevV = wx.createVideoContext(this.data.prevVideoId);
      var param_prev = {};
      var string_prev = "videoList[" + this.data.prevIdx + "].isClicked";
      param_prev[string_prev] = false;
      this.setData(param_prev);
      console.log(prevV)
      prevV.stop();
    }

    var videoContext = wx.createVideoContext(curVideoId);
    this.setData({
      prevVideoId: curVideoId,
      prevIdx:curIdx
    });
    var param_cur = {};
    var string_cur = "videoList[" + curIdx + "].isClicked";
    param_cur[string_cur] = true;
    this.setData(param_cur);
    console.log('before_play')
    videoContext.play();
    console.log(videoContext)
    console.log('after_play')
  },
  bindZan: function(e){
    console.log(e.currentTarget.dataset.index)//输出视频在数组中的index小标
    var idx = e.currentTarget.dataset.index;
    var cid=e.currentTarget.dataset.cid;
    //修改数组内变量的方法
    var param = {};
    var string = "videoList[" + idx + "].like_count";
    var string_iszan = "videoList[" + idx + "].isLike";
    var uid = wx.getStorageSync('uid') || '';
    var that = this;
    if(uid){
      // 如果已经登陆
      wx.request({
        url: 'https://mokey.club/video/like',
        method:'POST',
        data:{
          uid:uid,
          cid:cid
        },
        success:function(res){
          console.log(res)
          if (res.data.status===2) {
            //如果没有赞过，赞数字增加1，iszan变为true
            param[string] = ++that.data.videoList[idx].like_count;
            param[string_iszan] = true;
            wx.showToast({
              title: '点赞成功',
              icon: 'success',
              duration: 500
            })
          } else {
            //如果赞过，赞数字减1，iszan变为false
            param[string] = --that.data.videoList[idx].like_count;
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
    }else{
      // 如果没有登陆，跳转到登录页面
      wx.navigateTo({
        url: '/pages/index/index'
      })
    }
  },
  shoucang:function(e){
    var that = this;
    var idx = e.currentTarget.dataset.index;
    var videoid = e.currentTarget.dataset.videoid;
    var uid = wx.getStorageSync('uid') || '';
    var param = {};
    var string = "videoList[" + idx + "].isCollect";
    if(uid){
      // 如果已经登陆
      wx.request({
        url: 'https://mokey.club/video/collect',
        method:'POST',
        data:{
          cid:videoid,
          uid:uid
        },
        success:function(res){
          console.log(res.data.status)
          if (res.data.status===2) {
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

    }else{
      console.log('没有登陆')
      wx.navigateTo({
        url: '/pages/index/index'
      })
    }
  },
  toVideoDetail:function(e){
    //console.log(e.currentTarget.dataset.videoid)
    var that=this;
    var videoid=e.currentTarget.dataset.videoid;
    var idx = e.currentTarget.dataset.index;
    var videoContext = wx.createVideoContext('v'+videoid);
    videoContext.pause();
    wx.navigateTo({
      url: '/pages/videoDetail/videoDetail?videoCurrentTime='+that.data.videoCurrentTime+'&videoid='+videoid
    })
  },
  mycurrenttime:function(e){
    //获取当前视频播放进度
    //console.log(Math.floor(e.detail.currentTime));
    this.setData({
      videoCurrentTime: Math.floor(e.detail.currentTime)
    })
    //console.log(this.data.videoCurrentTime)
  },
  onShareAppMessage: function (res) {
    var uid = wx.getStorageSync('uid') || '';
    var videoid = res.target.dataset.videoid;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res)
      this.videoContext = wx.createVideoContext('v'+videoid);
      this.videoContext.pause();
      return {
        title: '视频详情页',
        path: '/pages/videoDetail/videoDetail?videoid='+videoid,
        success: function (res) {
          // 转发成功
          wx.request({
            url: 'https://mokey.club/video/collect',
            method:'POST',
            data:{
              uid:uid,
              cid:videoid
            },
            success:function(res){
              console.log(res)
              wx.showToast({
                title: '分享成功',
                icon: 'success',
                duration: 500
              })
            }
          })
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }else{
      return {
        title: '视频列表页',
        path: '/pages/myvideo/myvideo',
        success: function (res) {
          // 转发成功
          wx.showToast({
            title: '分享成功',
            icon: 'success',
            duration: 500
          })
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
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
    var that=this;
    that.setData({
      list: that.data.list + 1,
    })
    wx.showLoading({
      title: '加载中...',
    })
    // 发送请求
    wx.request({
      url: 'https://mokey.club/video/index',
      method: 'POST',
      data: {
        grade: that.data.tabs[that.data.activeIndex],
        list: that.data.list,
        listRow: 10,
        uid: uid
      },
      success: function (res) {
        console.log(res.data.data)
        wx.hideLoading();
        var arr = res.data.data;
        if(arr.length===0){
          wx.showToast({
            title: '没有了...',
            icon: 'none',
            duration: 2000
          })
        }
        for (var i = 0; i < arr.length; i++) {
          arr[i].isClicked = false;
        }
        that.setData({
          videoList: that.data.videoList.concat(arr)
        })
      }
    })

  }
})