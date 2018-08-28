//获取应用实例
var sliderWidth = 48; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();

Page({
  onReady: function (res) {
    // this.videoContext = wx.createVideoContext('myVideo')
  },
  data: {
      tabs: ["推荐", "高中", "初中", "放学别跑"],
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0,
      prevVideoId:'',
      curVideoId:'',
      prevIdx:-1,
      curIdx:-1,
      videoCurrentTime:0,
      videoList: [
        {
          videoId:'v001',
          poster:'http://ovqkwdw8s.bkt.clouddn.com/juesheng.jpg',
          intro:'决胜高考宣传片',
          videoUrl:'https://vjs.zencdn.net/v/oceans.mp4',
          zanNum:999,
          iszan:false,
          isClicked:false,
          isShouCang:false
        },
        {
          videoId: 'v002',
          poster: 'http://ovqkwdw8s.bkt.clouddn.com/fangxuebiepao.jpg',
          intro: '《放学别跑第1期》——父母是怎么套路你红包的。',
          videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
          zanNum: 50,
          iszan: false,
          isClicked: false,
          isShouCang: false
        },
        {
          videoId: 'v003',
          poster: 'http://ovqkwdw8s.bkt.clouddn.com/haiou.jpg',
          intro: '自然景色——海鸥',
          videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
          zanNum: 0,
          iszan: false,
          isClicked: false,
          isShouCang: false
        }
      ]
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

    // 发送请求
    this.freshData();

  },
  freshData:function(){
    // 更新页面数据
    var that=this;
    wx.request({
      url: 'https://mokey.club/video/index',
      method: 'POST',
      data: {
        grade: that.data.tabs[that.data.activeIndex],
        list: 1,
        listRow: 10,
        uid: 8
      },
      success: function (res) {
        console.log(res)
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
      category: category
    });
    that.freshData();
  },
  startPlay: function (e) {//图片上按钮点击播放事件
    var curVideoId = e.currentTarget.dataset.vid;
    var curIdx = e.currentTarget.dataset.idx;
    //console.dir(e.currentTarget.dataset.vid)
    if (this.data.prevVideoId) {//如果有之前点击过的视频，暂停之前的视频,切换dom
      var prevV = wx.createVideoContext(this.data.prevVideoId);
      var param_prev = {};
      var string_prev = "videoList[" + this.data.prevIdx + "].isClicked";
      param_prev[string_prev] = false;
      this.setData(param_prev);
      prevV.pause();
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
    videoContext.play();
  },
  bindZan: function(e){
    console.log(e.currentTarget.dataset.index)//输出视频在数组中的index小标
    var idx = e.currentTarget.dataset.index;
    var that=this;
    //修改数组内变量的方法
    var param = {};
    var string = "videoList[" + idx + "].zanNum";
    var string_iszan = "videoList[" + idx + "].iszan";
    if(!this.data.videoList[idx].iszan){
      //如果没有赞过，赞数字增加1，iszan变为true
      param[string] = ++that.data.videoList[idx].zanNum;
      param[string_iszan]=true;
      wx.showToast({
        title: '点赞成功',
        icon: 'success',
        duration: 500
      })
    }else{
       //如果赞过，赞数字减1，iszan变为false
      param[string] = --that.data.videoList[idx].zanNum;
      param[string_iszan] = false;
      wx.showToast({
        title: '取消点赞',
        icon: 'success',
        duration: 500
      })
    }
    that.setData(param);
    console.log(that.data.videoList[idx].zanNum);
    console.log(that.data.videoList[idx].iszan);
  },
  shoucang:function(e){
    var that=this;
    var idx=e.currentTarget.dataset.index;
    var videoid=e.currentTarget.dataset.videoid;
    var param={};
    var string = "videoList[" + idx + "].isShouCang";
    if (!this.data.videoList[idx].isShouCang) {
      //如果没有收藏，isShouCang变为true
      param[string] = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 500
      })
    } else {
      //如果收藏过，isShouCangfalse
      param[string] = false;
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        duration: 500
      })
    }
    that.setData(param);
    console.log(this.data.videoList[idx].isShouCang)
    
  },
  toVideoDetail:function(e){
    //console.log(e.currentTarget.dataset.videoid)
    var that=this;
    var videoid=e.currentTarget.dataset.videoid;
    var idx = e.currentTarget.dataset.index;
    that.videoContext = wx.createVideoContext(videoid);
    app.globalData.videoDetail=that.data.videoList[idx];//全局变量赋值
    //console.dir(app.globalData.videoDetail)
    //console.dir(that.videoContext)
    that.videoContext.pause();
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res)
      var videoid = res.target.dataset.videoid;
      this.videoContext = wx.createVideoContext(videoid);
      this.videoContext.pause();
      return {
        title: '视频详情页',
        path: '/pages/videoDetail/videoDetail?videoid='+videoid,
        success: function (res) {
          // 转发成功
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

  }
})