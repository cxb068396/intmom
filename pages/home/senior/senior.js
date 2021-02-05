// pages/home/senior/senior.js
var api = require('../../../config/api')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeData:''
  },
    //跳转到活动详情
    goActive(e){
      console.log(e)
      const id =e.currentTarget.dataset.id
     wx.navigateTo({
       url: '/pages/home/activeInfo/activeInfo?id='+id,
     })
     },
    //获取所有的商品信息
    getHomeIndex() {
      var that = this
      const data={
        token:wx.getStorageSync('access_token')
      }
      app.request(api.HomeIndex, 'GET',data).then(data => {
        if(data){
          data.forEach(item => {
            item.img = 'https://www.intmom.club/Uploads/' + item.pic_cover.replace(/\\/g, "/")
          })
        }
      that.setData({
        activeData:data
      })
      }).catch(err=>{
        console.log(err)
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getHomeIndex()
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