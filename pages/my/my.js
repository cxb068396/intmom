// pages/my/my.js
var api = require('../../config/api')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    isShow:false,
    couponNum:''
  },
  //跳转到登陆页面
  goLogin(){
    wx.navigateTo({
      url: '/pages/logs/logs'
    }) 
  },
  //跳转个人信息页面
  goPerson(){
    var token = wx.getStorageSync('access_token')
    if (!token) {
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
      return false
    }
    wx.navigateTo({
      url: '/pages/my/my/person/person'
    })
  },
    //跳转我的活动页面
    goActivity(){
      var token = wx.getStorageSync('access_token')
      if (!token) {
        wx.showToast({
          title: '请先登录',
          icon:'none'
        })
        return false
      }
      wx.navigateTo({
        url: '/pages/my/my/myActivity/myActivity'
      })
    },

  //跳转到领券中心
  goOpinion(){
    var token = wx.getStorageSync('access_token')
    if (!token) {
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
      return false
    }
    wx.navigateTo({
      url: '/pages/my/my/opinion/opinion'
    })
  },


  // 跳转到优惠券页面
  toCoupon() {
    var token = wx.getStorageSync('access_token')
    if (!token) {
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
      return false
    }
    wx.navigateTo({
      url: '/pages/my/my/coupon/coupon'
    })
  },

//跳转到关于页面
goAbout(){
  var token = wx.getStorageSync('access_token')
  if (!token) {
    wx.showToast({
      title: '请先登录',
      icon:'none'
    })
    return false
  }
 wx.navigateTo({
   url: '/pages/my/my/about/about',
 })
},
//获取所有的优惠券信息
getAllCoupon(){
  var that=this 
  app.request(api.ShowCoupon).then(data=>{
   that.setData({
     couponNum:data.count
   })
  }).catch(err=>{
    console.log(err)
  })
},
//获取个人信息
getUser(){
  var that = this
  let token = wx.getStorageSync('access_token')
  wx.request({
    url: api.getUserInfo,
    data: {
      token: token,
    },
    method: 'GET',
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      if (res.data.code == true) {
        that.setData({
          userInfo:res.data,
          isShow:true
        })
      }
    },
    fail:function(){
      that.setData({
        isShow:false
      })
    }
  })
  
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUser()
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
    this.setData({
      isShow:false,
      userInfo:{},
      couponNum:0
    })
    this.getUser()
    this.getAllCoupon()
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