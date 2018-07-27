//second.js
//获取应用实例
const app = getApp()

Page({
  data: {
    gradeArr:[
      { value: '小学', checked: true },
      { value: '初中', checked: false },
      { value: '高中', checked: false },
    ],
    allGoodsFilte: []
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://mokey.club/User/userTag',
      method: 'POST',
      data:{
        uid:8,
        list:1,
        listRows:12
      },
      success:function(res){
        console.log(res.data.tag)
        var tagsArr = res.data.tag
        for(var i=0;i<tagsArr.length;i++){
          tagsArr[i]={ value: tagsArr[i], checked: false}
        }
        console.log(tagsArr)
        that.setData({
          allGoodsFilte:tagsArr
        })
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
      gradeArr: gradeArr
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
      allGoodsFilte: allGoodsFilte
    })
  }

})
