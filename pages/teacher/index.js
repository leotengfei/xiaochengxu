// pages/teacher/index.js
var sliderWidth = 45; // 需要设置slider的宽度，用于计算中间位置
const gradeArr = [
  { value: '小学', checked: false },
  { value: '初中', checked: false },
  { value: '高中', checked: false }
]
const subjectArr = [
  { value: '英语', checked: false },
  { value: '数学', checked: false },
  { value: '物理', checked: false },
  { value: '化学', checked: false },
  { value: '语文', checked: false },
  { value: '文综', checked: false },
  { value: '生物', checked: false },
  { value: '政治', checked: false },
  { value: '历史', checked: false },
  { value: '地理', checked: false }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipMsg:'',
    gradeArr: gradeArr,
    grade: '',
    subjectArr: subjectArr,
    subject: '',
    activepop:false,
    tabs: ["热度","星级","教龄","学生量"],
    en_tabs: ["hot", "star", "year","student_num"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    list:1,
    loading:false,
    teacherList:[]
  },
  resetChoose:function(){
    this.setData({
      grade: '',
      subject: '',
      gradeArr: gradeArr,
      subjectArr: subjectArr
    })
  },
  confirmChoose:function(){
    // 确认按钮点击事件
    // 发送请求
    var that=this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://mokey.club/Teacher/index',
      method: 'POST',
      data: {
        list: 1,
        listRows: 10,
        sort: that.data.en_tabs[that.data.activeIndex],
        grade: that.data.grade,
        subject: that.data.subject
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.data)
        if(res.data.data.length===0){
          that.setData({
            tipMsg:'请更换条件，没有'+that.data.grade+that.data.subject+'的老师！',
            teacherList: res.data.data,
            activepop: false
          })
        }else{
          that.setData({
            tipMsg:'',
            teacherList: res.data.data,
            activepop: false
          })
        }
      }
    })
  },
  gradeValChange: function (e) {
    console.log(e)
    var gradeArr = this.data.gradeArr;
    var checkArr = e.detail.value;
    console.log(checkArr)
    for (var i = 0; i < gradeArr.length; i++) {
      if (checkArr.indexOf(gradeArr[i].value) != -1) {
        gradeArr[i].checked = true;
      } else {
        gradeArr[i].checked = false;
      }
    }
    this.setData({
      gradeArr: gradeArr,
      grade: checkArr
    })
  },
  subValChange: function (e) {
    console.log(e)
    var subjectArr = this.data.subjectArr;
    var checkArr = e.detail.value;
    console.log(checkArr)
    for (var i = 0; i < subjectArr.length; i++) {
      if (checkArr.indexOf(subjectArr[i].value) != -1) {
        subjectArr[i].checked = true;
      } else {
        subjectArr[i].checked = false;
      }
    }
    this.setData({
      subjectArr: subjectArr,
      subject: checkArr
    })
  },
  handlePop: function(){
    // 弹窗
    if(this.data.activepop){
      // 关闭弹窗 如果未点击确定，清空选择
      console.log('关闭')
      this.setData({
        activepop:false,
        grade:'',
        subject:'',
        gradeArr:gradeArr,
        subjectArr:subjectArr
      })
    }else{
      this.setData({
        activepop:true
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth * (36 / 75) / that.data.tabs.length * 1)
        that.setData({
          sliderLeft: (res.windowWidth * (36 / 75) / that.data.tabs.length - sliderWidth) / 2 + res.windowWidth * (29 / 75),
          sliderOffset: (res.windowWidth * (36 / 75) / that.data.tabs.length - sliderWidth) / 2 + res.windowWidth * (29 / 75)
        });
      }
    });
  // 发送请求
  wx.showLoading({
    title: '加载中...',
  })
    wx.request({
      url: 'https://mokey.club/Teacher/index',
      method: 'POST',
      data: {
        list: that.data.list,
        listRows: 10,
        sort: that.data.en_tabs[that.data.activeIndex]
      },
      success: function (res) {
        console.log(res.data.data)
        wx.hideLoading();
        that.setData({
          teacherList:res.data.data
        })
      }
    })
  },
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  tabClick: function (e) {
    var that = this;
    var sort = that.data.en_tabs[e.currentTarget.id]
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      list:1
    });
    // 发送请求
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://mokey.club/Teacher/index',
      method: 'POST',
      data: {
        list: 1,
        listRows: 10,
        sort: that.data.en_tabs[that.data.activeIndex],
        grade: that.data.grade,
        subject: that.data.subject
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.data)
        that.setData({
          teacherList: res.data.data
        })
      }
    })
    that.goTop();
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
    var that = this
    //每次进入 当前页++
    console.log(that.data.list)
    that.setData({
      list: that.data.list + 1,
      loading: true
    })
  // 发送请求
    wx.request({
      url: 'https://mokey.club/Teacher/index',
      method: 'POST',
      data: {
        list: that.data.list,
        listRows: 10,
        sort: that.data.en_tabs[that.data.activeIndex],
        grade:that.data.grade,
        subject:that.data.subject
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          teacherList: that.data.teacherList.concat(res.data.data),
          loading: false
        })
      }
    })
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})