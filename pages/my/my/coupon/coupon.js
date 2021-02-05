//index.js 
//获取应用实例 
var api = require('../../../../config/api')
var app = getApp() 
Page( { 
 data: { 
    /** 
      * 页面配置 
      */ 
    winWidth: 0, 
    winHeight: 0, 
    // tab切换 
    currentTab: 0, 
    hsalist:false,
    arrList: [],   //未使用的数组
    arrList1: [],  //已使用的数组
    arrList2: [],  //已过期/作废的数组
    status: 2,  //未使用
    status1: 3, //已使用
    status2:4,//已过期，已作废
    from: '', // 从哪个页面跳转过来的，默认空
    product: {},
 }, 
 onLoad: function(options) { 
  if(Object.keys(options).length!=0){
    const {
      from
    } = options
    let pro = JSON.parse(options.pro)
    this.setData({
      from:from,
      product:pro
    })
  }
    var that = this; 
 
    /** 
     * 获取系统信息 
     */ 
    wx.getSystemInfo( { 

      success: function( res ) { 
        that.setData( { 
          winWidth: res.windowWidth, 
          winHeight: res.windowHeight 
        }); 
      } 
    }); 

  

 }, 
 //获取所有的优惠券信息
getAllCoupon(){
  var that=this 
  app.request(api.ShowCoupon).then(data=>{
   if(data.no_use){
     data.no_use.forEach(item=>{
       item.cash=(item.money)/100
     })
   }
   if(data.use){
    data.use.forEach(item=>{
      item.cash=(item.money)/100
    })
  }
  that.setData({
    arrList:data.no_use,
    arrList1:data.use
  })
  })
},
 onShow(){
this.getAllCoupon()
 },
 /** 
   * 滑动切换tab 
   */ 
 bindChange: function(e) { 
  var that = this; 
  that.setData( { currentTab: e.detail.current }); 
 }, 

 /** 
  * 点击tab切换 
  */ 
 swichNav: function (e) {
  // console.log(e)
  var that = this;
  if (that.data.currentTab === e.target.dataset.current) {
    return false;
  } else {
    var current = e.target.dataset.current;
    that.setData({
      currentTab: parseInt(current) - 2,
      isStatus: e.target.dataset.otype,
    });

  };
},
//兑现
redemption(e){
  const id =e.currentTarget.dataset.id
  wx.showModal({
    title: '',
    confirmColor: '#FF752A',
    cancelColor:'#3a3a3a',
    content: '跳转活动详情预约',
    success: function(res) {
  if(res.confirm==true){
    wx.navigateTo({
      url: '/pages/home/activeInfo/activeInfo?id='+id,
    })
  }
    }
  })
}


}) 
