// pages/home/home.js
var api = require('../../config/api')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图配置
    bannars: [], //轮播图
    centerContainer: [
      {
        image: "../static/image/thematic_topics.png",
        text: "专题"
      },
      {
        image: "../static/image/sports.png",
        text: "体育"
      },
      {
        image: "../static/image/art.png",
        text: "资深讲师"
      },
      {
        image: "../static/image/exchange_coupons.png",
        text: "领劵中心"
      }
    ], //专题，体育，艺术块
    activeData: [
  
    ], //活动预约
    twitterData: [],  //优质推文
    isShow: false, //控制新人优惠券的显示隐藏
    coupon_code:'',
    coupon:'',
    coupon_price:''
  },
getTweets(){
  var that=this
  app.request(api.activeTweets).then(data=>{
    console.log(data)
     if(data){
       data.forEach(item=>{
         item.image='https://www.intmom.club/Uploads/'+ item.img.replace(/\\/g, "/")
       })
     }
     that.setData({
      twitterData:data
     })
     console.log(this.data.twitterData)
    }).catch(err=>{
      console.log(err)
    })
},
  //跳转到各种福利
  gowelfare(e){
    var name=e.currentTarget.dataset.name
    console.log(e)
    if(name=='领劵中心'){
      wx.navigateTo({
        url: "/pages/home/getcoupon/getcoupon",
      })
    }else if(name=='专题'){
      wx.navigateTo({
        url: "/pages/home/special/special",
      })
    }else if(name=='体育'){
      wx.navigateTo({
        url: "/pages/home/sports/sports",
      })
    } else{
      wx.navigateTo({
        url: "/pages/home/senior/senior",
      })
    }
  },
  //优质推文
  goTweet(e){
    var url=e.currentTarget.dataset.url
    wx.navigateTo({
      url: '/pages/home/tweet/tweet?link='+url,
    })
  },
  //跳转到活动详情
  goActive(e){
   console.log(e)
   const id =e.currentTarget.dataset.id
  wx.navigateTo({
    url: '/pages/home/activeInfo/activeInfo?id='+id,
  })
  },
  goActiveInfo(e){
    console.log(e)
    const id =e.currentTarget.dataset.id
   wx.navigateTo({
     url: '/pages/home/activeInfo/activeInfo?id='+id,
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getActiveBannar()
    this.getHomeIndex()
    var token=wx.getStorageSync('access_token')
   this.showNewCoupon(token)
  },

  close() {
    this.setData({
      isShow: false
    })
  },

  //显示优惠券

showNewCoupon(token) {
  if (!token) {
    this.setData({
      isShow: false
    })
    app.$event.listen('token', this.showNewCoupon)
    return false
  }
  app.request(api.showNewCoupon, 'get', {
      token: token
    })
    .then(data => {
      console.log(data)
      var Time = new Date().getTime()
      if (new Date(data.valid_time_end.replace(/-/g, '/') ).getTime() - Time >0){
      this.setData({
        isShow:true,
        coupon_code:data.coupon_code,
        coupon:data,
        coupon_price:(data.money)/100
      })
      }
      app.$event.remove('token', this.showNewCoupon)

    })
    .catch(err => {
      console.log(err);
      this.setData({
        isShow: false
      })
    })
},
//立即领取新人优惠券
receive(){
var that=this
const data={
  coupon_code:this.data.coupon_code
}
app.request(api.GetCoupon,"GET",data).then(data=>{
  wx.showToast({
    title: '领取成功',
  })
 this.setData({
    isShow:false
 })
}).catch(err=>{
  wx.showToast({
    title: err.mes,
    icon:'none'
  })
 this.setData({
    isShow:false
 })
})

},
  toSubscribe(e) {
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/home/subscribe/subscribe?id='+id
    })
  },

//获取轮播图
getActiveBannar(){
  var that=this
  app.request(api.GetBannar, 'GET').then(data => {
    if(data){
      data.forEach(item => {
        item.image= 'https://www.intmom.club/Uploads/banner/' + item.img.replace(/\\/g, "/")
      })
    }
  that.setData({
    bannars:data
  })

  }).catch(err=>{
    console.log(err)
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getHomeIndex()
    this.getTweets()
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