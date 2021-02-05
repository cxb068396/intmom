// pages/home/test/test.js
var api = require('../../../config/api')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infos:[],
    showId: 0
  },



  //优质推文
  goTweet(e){
    var url=e.currentTarget.dataset.url
    wx.navigateTo({
      url: '/pages/home/tweet/tweet?link='+url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getMenu()
  },
 getMenu(){
  var that=this
  const data={
    type:'体育'
  }
  app.request(api.getMenu,'POST',data).then(res=>{
    console.log(res)
  var menu=res.tweets
   if(menu){
    menu.forEach(item=>{
      item.image='https://www.intmom.club/Uploads/'+ item.img.replace(/\\/g, "/")
    })
   }
   that.setData({
    infos:menu
   })
 
   that.getshowInfo(that.data.showId)
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