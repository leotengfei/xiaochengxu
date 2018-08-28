// pages/teacher/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    markers: [],
    mapHidden:true,
    course: [],
    videos: [],
    noCourse:true,
    noVideo:true
  },
  showMap:function(e){
    // 显示地图组件
    this.setData({
      mapHidden:false
    })
    console.log(e.currentTarget.dataset.fullname)
    var fullName = e.currentTarget.dataset.fullname;
    var that = this;
    wx.request({
      url: 'https://mokey.club/wxxkTeacher/courseCampus',
      method: 'POST',
      data: {
        fullName: fullName
      },
      success: function (res) {
        console.log(res.data.loca)
        // 百度坐标系转为火星坐标系     百度地图使用百度坐标系， 腾讯和高德使用gcj02火星坐标系
        function bd2gcjString(value) {
          var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
          var ll = value.split(",");
          var x = ll[0] - 0.0065, y = ll[1] - 0.006;
          var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
          var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
          return (z * Math.cos(theta)) + ',' + (z * Math.sin(theta));
        }
        console.log(bd2gcjString(res.data.loca));
        var gcj02 = bd2gcjString(res.data.loca);
        var locaX = gcj02.split(',')[1];
        var locaY = gcj02.split(',')[0];
        that.setData({
          latitude: locaX,
          longitude: locaY,
          markers: [{
            id: 1,
            latitude: locaX,
            longitude: locaY,
            name: res.data.tab,
            width: 35,
            height: 30,
            callout: {
              content: " 校区：" + res.data.tab + "\n 电话：" + res.data.tel + "\n 地址：" + res.data.address,
              color: "#0f0f0f",
              fontSize: 14,
              borderRadius: 10,
              bgColor: "#ffffff",
              padding: 10,
              display: "ALWAYS"
            }
          }]
        })
      }
    })

  },
  close_btn:function(){
    // 隐藏地图组件
    this.setData({
      mapHidden: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '正在加载...',
    })
    wx.request({
      url: 'https://mokey.club/wxxkTeacher/teacherCourse',
      method: 'POST',
      data: {
        tid: options.id,
        subject: options.subject
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          course: res.data.course,
          videos:res.data.video
        })
        if(res.data.course.length===0){
          that.setData({
            noCourse:false
          })
        }
        if(res.data.video.length===0){
          that.setData({
            noVideo:false
          })
        }
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