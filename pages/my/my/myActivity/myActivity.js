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
    arrList: [],   //未使用的数组
    arrList1: [],  //已使用的数组
    product: {},
    status:1,// 默认为1，已经预约，2已经结束
    isShow:false
 }, 
 onLoad: function(options) { 
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
 handShow(){
   this.setData({
     isShow:!this.data.isShow
   })
 },
 //获取活动的信息
getActive(){
var that=this
this.setData({
  arrList: [], 
  arrList1: [],
})
const data={
  status:this.data.status
}
app.request(api.ShowActivity,'POST',data).then(data=>{
  if(data){
    data.forEach(item=>{
      item.image='https://www.intmom.club/Uploads/'+item.pic_cover
    })
  }
 if(that.data.status==1){
  that.setData({
    arrList:data
  })
 }else{
  that.setData({
    arrList1:data
  })
 }
}).catch(err=>{
  console.log(err)
})
},
//删除信息
deleteAct(e){
  var id=e.currentTarget.dataset.id
   const data={
     id
   }
   wx.showModal({
    title: '',
    confirmColor: '#FF752A',
    content: '确认删除该活动',
    success: function(res) {
      console.log(res)
      if (res.confirm==true) {
        app.request(api.deleteActive,'POST',data).then(data=>{
          that.getActive()
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  })
},
 onShow(){
 this.getActive()
 },
 /** 
   * 滑动切换tab 
   */ 
 bindChange: function(e) { 
  var that = this; 
  console.log( e.detail.current)
  that.setData( { currentTab: e.detail.current,status: parseInt(e.detail.current)+1 }); 
 that.getActive()
 }, 

 /** 
  * 点击tab切换 
  */ 
 swichNav: function (e) {
   console.log(e.target.dataset.current)
  var that = this;
  if (that.data.currentTab === e.target.dataset.current) {
    return false;
  } else {
    var current = e.target.dataset.current;
    that.setData({
      currentTab: current,
      status:parseInt(current)+1
    });
  // that.getActive()
  };
},



}) 
