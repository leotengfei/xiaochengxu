//second.js
//获取应用实例
const app = getApp()

Page({
  data: {
    gradeArr:[
      { value: '小学', checked: false },
      { value: '初中', checked: false },
      { value: '高中', checked: false },
    ],
    grade:'',
    allGoodsFilte: [],
    intrest:[],
    btn_choose:false,
    total:0,
    currentPage:1
  },
  onLoad: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://mokey.club/User/userTag',
      method: 'POST',
      data:{
        uid: app.globalData.uid,
        list:1,
        listRows:12
      },
      success:function(res){
        if(res.data.code===203){
          wx.switchTab({
            url: '../news/news'
          })
        }else{
          console.log(res.data.tag)
          var tagsArr = res.data.tag
          for (var i = 0; i < tagsArr.length; i++) {
            tagsArr[i] = { value: tagsArr[i], checked: false }
          }
          console.log(tagsArr)
          that.setData({
            allGoodsFilte: tagsArr,
            total:res.data.num
          })
          wx.hideLoading()
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
      grade:checkArr
    })
  },
  serviceValChange: function (e) {
    console.log(e)
    var allGoodsFilte = this.data.allGoodsFilte;
    var checkArr = e.detail.value;
    console.log(checkArr)
    for (var i = 0; i < allGoodsFilte.length; i++) {
      if (checkArr.indexOf(allGoodsFilte[i].value) != -1) {
        allGoodsFilte[i].checked = true;
      } else {
        allGoodsFilte[i].checked = false;
      }
    }
    this.setData({
      allGoodsFilte: allGoodsFilte,
      intrest:checkArr
    })
  },
  handleChoosed: function() {
    console.log(this.data.grade)
    console.log(this.data.intrest)
    var that = this;
    if(!this.data.grade){
      // 当未选择年龄段时
      wx.showToast({
        title: '请选择年龄段',
        icon: 'none',
        duration: 2000
      })
    }else{
      // 选择年龄后
      that.setData({
        btn_choose: true
      })
      var label=this.data.intrest.concat(that.data.grade)
      console.log(label)
      wx.request({
        url: 'https://mokey.club/User/addUserTag',
        method: 'POST',
        data:{
          uid:app.globalData.uid,
          label:label
        },
        success: function(res){
          console.log(res.data.code)
          if(res.data.code===200){
            wx.switchTab({
              url: '../news/news'
            })
          }else{
            wx.showToast({
              title: '很抱歉，程序出错了，请刷新后再试',
              icon: 'none',
              duration: 2000
            })
          }
        },
        complete: function(){
          that.setData({
            btn_choose: false
          })
        }
      })
    }
  },
  handleJump:function(){
    // 不选标签点击跳过的情况
    wx.showModal({
      title: '提示',
      content: '如果跳过该步骤，会影响给您推送消息的精确度！',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.switchTab({
            url: '../news/news'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  handleChange:function(){

    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://mokey.club/User/userTag',
      method: 'POST',
      data: {
        uid: app.globalData.uid,
        list: 1,
        listRows: 12
      },
      success: function (res) {
          console.log(res.data.tag)
          var tagsArr = res.data.tag
          for (var i = 0; i < tagsArr.length; i++) {
            tagsArr[i] = { value: tagsArr[i], checked: false }
          }
          console.log(tagsArr)
          that.setData({
            allGoodsFilte: tagsArr
          })
          wx.hideLoading()
      }
    })
  },
  handleChange:function(){
    // 换一拨标签
    var that = this;
    var current = this.data.currentPage
    wx.showLoading({
      title: '加载中',
    })
    var pageNum = Math.ceil(that.data.total / 12)
    current = current >= pageNum ? 1 : current + 1
    this.setData({
      currentPage:current
    })
    // console.log('current' + current)
    wx.request({
      url: 'https://mokey.club/User/userTag',
      method: 'POST',
      data: {
        uid: app.globalData.uid,
        list: that.data.currentPage,
        listRows: 12
      },
      success:function(res){
        console.log(res.data.tag)
        var tagsArr = res.data.tag
        for (var i = 0; i < tagsArr.length; i++) {
          tagsArr[i] = { value: tagsArr[i], checked: false }
        }
        console.log(tagsArr)
        that.setData({
          allGoodsFilte: tagsArr,
        })
        wx.hideLoading()
      }
    })
  }

})
