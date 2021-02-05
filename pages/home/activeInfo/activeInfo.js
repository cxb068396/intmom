// pages/home/activeInfo/activeInfo.js
var api = require('../../../config/api')
var WxParse = require('../../../lib/wxParse/wxParse.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   id:'' , //获取活动详情的id
   active:{},//活动内容
   list:[],//下期活动
   pic_cover:''
  },

  goSubscribe(){
    var id=this.data.id
    wx.navigateTo({
      url: '/pages/home/subscribe/subscribe?id='+id,
    })
  },

    //跳转到活动详情
    goActive(e){
      console.log(e)
      const id =e.currentTarget.dataset.id
     wx.redirectTo({
       url: '/pages/home/activeInfo/activeInfo?id='+id,
     })
     },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const {id}=options
   this.setData({
     id:id
   })
   this.getActiveInfo()
  },
//获取活动详情
getActiveInfo(){
  var that=this
  const data={
    id:this.data.id,
    token:wx.getStorageSync('access_token')
  }
  app.request(api.Maindetail, 'GET',data).then(data => {
    var list=data.list
  var pic='https://www.intmom.club/Uploads/'+data.rel.pic_cover
  if(list){
       list.forEach(e => {
      e.image='https://www.intmom.club/Uploads/' + e.pic_cover.replace(/\\/g, "/")
    });
  }
 that.setData({
   list,
   active:data.rel,
   pic_cover:pic
 })
 WxParse.wxParse('desc', 'html', data.rel.activity_content, that, 0, {
  type: 'detailImg'
}); //对商品详情这块进行富文本解析
  }).catch(err=>{
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
    this.getActiveInfo()
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