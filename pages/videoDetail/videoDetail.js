// 视频播放详情页
const app=getApp();

Page({
  /**
  * 生命周期函数--监听页面加载
  */
  inputValue: '',
  data: {
    scroll_h: '0',
    videoCurrentTime: 0,
    videonow: {},
    videoid: '',
    videoCommit:[
      {
        avatarUrl:'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erTpFLEgOdria6PZRNzZHCfibib7bVNicu0SGLzfVsFbrRfmnVmvyhcUVbjqwY9u3xUjtYHAw75vrMNtQ/0',
        nickName:'昵称1',
        content:'深刻的疗法撒旦，撒旦就分开了说的，ds.jsdfjk是看得开kljsdfk k,LKjkdjs flkj 看见的是风口浪尖款到即发看看，水电费健康，款到即发流口水地方。家里的附近双卡双待角度思考飞机上看了对方数据库，就看电视积分卡史蒂夫，立即受到法律快速的减肥，但是看了飞机上看的风景。是对付恐惧老师款到即发框架，但是房价开始地方。'
      },
      {
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erTpFLEgOdria6PZRNzZHCfibib7bVNicu0SGLzfVsFbrRfmnVmvyhcUVbjqwY9u3xUjtYHAw75vrMNtQ/0',
        nickName: '昵称2',
        content: '深刻的疗法撒旦，撒旦就分开了说的，ds.jsdfjk是看得开kljsdfk k,LKjkdjs flkj 看见的是风口浪尖款到即发看看，水电费健康，款到即发流口水地方。家里的附近双卡双待角度思考飞机上看了对方数据库，就看电视积分卡史蒂夫，立即受到法律快速的减肥，但是看了飞机上看的风景。是对付恐惧老师款到即发框架，但是房价开始地方。'
      },
      {
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erTpFLEgOdria6PZRNzZHCfibib7bVNicu0SGLzfVsFbrRfmnVmvyhcUVbjqwY9u3xUjtYHAw75vrMNtQ/0',
        nickName: '昵称3',
        content: '深刻的疗法撒旦，撒旦就分开了说的，ds.jsdfjk是看得开kljsdfk k,LKjkdjs flkj 看见的是风口浪尖款到即发看看，水电费健康，款到即发流口水地方。家里的附近双卡双待角度思考飞机上看了对方数据库，就看电视积分卡史蒂夫，立即受到法律快速的减肥，但是看了飞机上看的风景。是对付恐惧老师款到即发框架，但是房价开始地方。'
      },
      {
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erTpFLEgOdria6PZRNzZHCfibib7bVNicu0SGLzfVsFbrRfmnVmvyhcUVbjqwY9u3xUjtYHAw75vrMNtQ/0',
        nickName: '昵称4',
        content: '深刻的疗法撒旦，撒旦就分开了说的，ds.jsdfjk是看得开kljsdfk k,LKjkdjs flkj 看见的是风口浪尖款到即发看看，水电费健康，款到即发流口水地方。家里的附近双卡双待角度思考飞机上看了对方数据库，就看电视积分卡史蒂夫，立即受到法律快速的减肥，但是看了飞机上看的风景。是对付恐惧老师款到即发框架，但是房价开始地方。'
      },
      {
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erTpFLEgOdria6PZRNzZHCfibib7bVNicu0SGLzfVsFbrRfmnVmvyhcUVbjqwY9u3xUjtYHAw75vrMNtQ/0',
        nickName: '昵称5',
        content: '深刻的疗法撒旦，撒旦就分开了说的，ds.jsdfjk是看得开kljsdfk k,LKjkdjs flkj 看见的是风口浪尖款到即发看看，水电费健康，款到即发流口水地方。家里的附近双卡双待角度思考飞机上看了对方数据库，就看电视积分卡史蒂夫，立即受到法律快速的减肥，但是看了飞机上看的风景。是对付恐惧老师款到即发框架，但是房价开始地方。'
      },
      {
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erTpFLEgOdria6PZRNzZHCfibib7bVNicu0SGLzfVsFbrRfmnVmvyhcUVbjqwY9u3xUjtYHAw75vrMNtQ/0',
        nickName: '昵称6',
        content: '深刻的疗法撒旦，撒旦就分开了说的，ds.jsdfjk是看得开kljsdfk k,LKjkdjs flkj 看见的是风口浪尖款到即发看看，水电费健康，款到即发流口水地方。家里的附近双卡双待角度思考飞机上看了对方数据库，就看电视积分卡史蒂夫，立即受到法律快速的减肥，但是看了飞机上看的风景。是对付恐惧老师款到即发框架，但是房价开始地方。'
      }
    ]
  },
  onLoad: function (options) {
    var that=this;
    console.log(options.videoid)
    if(options.videoCurrentTime&&app.globalData.videoDetail){
      //通过小程序调转过来的方式，获取全局的对象中的数据
      this.setData({
        videoCurrentTime: options.videoCurrentTime,
        videonow: app.globalData.videoDetail,
        videoid:options.videoid
      })
      console.log("通过页面跳转方式进入");
    }else{
      //通过分享链接点击进入，获取videoid,发送ajax请求获取数据
      console.log("通过分享链接方式进入");
      console.log(options.videoCurrentTime, app.globalData.videoDetail)
      console.log(options.videoid);
      //ajax
      var fakedata = {
        videoId: 'v001',
        poster: 'http://ovqkwdw8s.bkt.clouddn.com/xiaochengxu.jpg',
        intro: '这是通过分享链接进来看到的视频！！！',
        videoUrl: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
        zanNum: 1000,
        isClicked: false
      }
      this.setData({
        videonow:fakedata,
        videoid: options.videoid
      })
    }
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
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
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