// pages/home/getcoupon/getcoupon.js
var api = require('../../../config/api')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupons: [],
    imgalist: [
      '../../static/image/code.jpg'
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接 
      urls: this.data.imgalist // 需要预览的图片http链接列表 
    })
  },
  getCoupon() {
    var that = this
    this.setData({
      coupons:[]
    })
    app.request(api.getShowCoupon).then(data => {
      data.forEach(item => {
        item.cash = (item.money) / 100
      })
      that.setData({
        coupons: data
      })
    }).catch(err => {
      console.log(err)
    })
  },
  //立即领取新人优惠券
  recive(e) {
    var that = this
    var coupon_code = e.currentTarget.dataset.id
    const data = {
      coupon_code: coupon_code
    }
    app.request(api.GetCoupon, "GET", data).then(data => {
      wx.showToast({
        title: '领取成功',
        success: function () {
          that.getCoupon()
        }
      })

    }).catch(err => {
      console.log(err)

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
    this.getCoupon()
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