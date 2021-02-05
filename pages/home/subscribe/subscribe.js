// pages/my/wineBook/wineBook.js
var api = require('../../../config/api')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //日期
    // timeList: [],
    // //可预约天数
    // yyDay: 30,
    // //是否显示
    // timeShow: false,
    // //预约时间段
    // hourList: [{
    //     hour: "10:00",
    //     n: 10,
    //     isShow: true
    //   },
    //   {
    //     hour: "11:00",
    //     n: 11,
    //     isShow: true
    //   },
    //   {
    //     hour: "12:00",
    //     n: 12,
    //     isShow: true
    //   },
    //   {
    //     hour: "13:00",
    //     n: 13,
    //     isShow: true
    //   },
    //   {
    //     hour: "14:00",
    //     n: 14,
    //     isShow: true
    //   },
    //   {
    //     hour: "15:00",
    //     n: 15,
    //     isShow: true
    //   },
    //   {
    //     hour: "16:00",
    //     n: 16,
    //     isShow: true
    //   },
    //   {
    //     hour: "17:00",
    //     n: 17,
    //     isShow: true
    //   },

    // ],
    //预约时间
    // serviceNeedTime: '',
    // //选择时间
    // chooseHour: "",
    // //选择日期
    // chooseTime: "",
    // hourIndex: -1,
    // reserve_date: '', //到店时间
    arrival_time: '', //预约时间
    activity: '', //活动信息
    coupon: '', //优惠券
    activity_start: '', //开始时间
    isShow: true
  },

  //弹出按钮
  // showTimeModel: function () {
  //   this.setData({
  //     timeShow: !this.data.timeShow,

  //   });
  // },
  //点击外部取消
  // modelCancel: function () {
  //   this.setData({
  //     timeShow: !this.data.timeShow,

  //   });
  // },
  //日期选择
  // timeClick: function (e) {
  //   //非今天-不判断超过当前时间点(所有时间点都可选择)
  //   if (e.currentTarget.dataset.index != 0) {
  //     var list = this.data.hourList;
  //     for (var i = 0; i < list.length; i++) {
  //       list[i].isShow = true;
  //     }
  //     this.setData({
  //       hourList: list
  //     })
  //   } else {
  //     //今天-过时不可预约
  //     var hour = new Date().getHours();
  //     for (var i = 0; i < this.data.hourList.length; i++) {
  //       var list = this.data.hourList;
  //       if (this.data.hourList[i].n <= hour) {
  //         list[i].isShow = false;
  //         this.setData({
  //           hourList: list
  //         })
  //       }
  //     }
  //   }
  //   this.setData({
  //     currentTab: e.currentTarget.dataset.index,
  //    // chooseTime: this.data.timeList[e.currentTarget.dataset.index].date,
  //     serviceNeedTime: '',
  //     chooseHour: "",
  //     hourIndex: -1
  //   });
  //   console.log(this.data.chooseTime)
  // },
  // 时间选择
  // hourClick: function (e) {
  //   var that = this;
  //   // 时间不可选择
  //   if (!e.currentTarget.dataset.isshow) {
  //     return false;
  //   }
  //   this.setData({
  //     hourIndex: e.currentTarget.dataset.index,
  //     chooseHour: this.data.hourList[e.currentTarget.dataset.index].hour,

  //   });
  //   var chooseTime =that.data.activity_start+ " " + this.data.chooseHour + ':00'
  //   this.setData({
  //     serviceNeedTime: chooseTime,
  //     reserve_date: new Date().getFullYear() + "/" + (this.data.chooseTime ? this.data.chooseTime : new Date().getMonth() + 1 + "/" + new Date().getDate()),
  //     arrival_time: this.data.chooseHour + ':00'
  //   })

  // },


  //获取预约的信息
  getBookInfo() {
    var that = this
    const data = {
      id: this.data.id,
      token: wx.getStorageSync('access_token')
    }
    app.request(api.subscribe, 'GET', data).then(data => {
      console.log(data)
      var activity = data.activity
      var coupon = data.coupon
      that.setData({
        activity,
        coupon,
        activity_start: data.activity.activity_start.slice(0, 10),
        arrival_time: activity.activity_start.slice(10),
      })
    }).catch(err => {
      that.setData({
        isShow: false
      })
    wx.showToast({
      title: err.mes,
      icon:'none',
      duration:1500
    })

    })
  },
  //提交预约
  sumbitBook() {
    var that = this
    // if(this.data.arrival_time==''){
    //   wx.showToast({
    //     title: '选择到场时间',
    //     icon: 'none',
    //     duration: 3000
    //   })
    //   return false
    // }
    const data = {
      id: this.data.id,
      token: wx.getStorageSync('access_token'),
      code: this.data.coupon.coupon_code,
      arrive_time: this.data.activity.activity_start
    }
    wx.showModal({
      title: '',
      confirmColor: '#FF752A',
      content: `预约消耗${that.data.coupon.coupon_name}一张`,
      success: function (res) {
        if (res.confirm == true) {
          app.request(api.sumbitBook, 'POST', data).then(data => {
            wx.showToast({
              title: '预约成功',
              success: function () {
                wx.navigateBack({
                  delta: 0,
                })
              }
            })
          }).catch(err => {
            wx.showToast({
              title: err.mes,
              icon: 'none',
              duration: 3000
            })
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })
    // Date.prototype.Format = function (format) {
    //   var o = {
    //     "M+": this.getMonth() + 1, //month
    //     "d+": this.getDate(), //day
    //     "h+": this.getHours(), //hour
    //     "m+": this.getMinutes(), //minute
    //     "s+": this.getSeconds(), //second
    //     "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    //     "S": this.getMilliseconds() //millisecond
    //   }
    //   if (/(y+)/.test(format)) {
    //     format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    //   }
    //   for (var k in o) {
    //     if (new RegExp("(" + k + ")").test(format)) {
    //       format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    //     }
    //   }
    //   return format;
    // }
    // //当前时间
    // var hour = new Date().getHours();

    // for (var i = 0; i < this.data.hourList.length; i++) {
    //   var list = this.data.hourList;
    //   //过时不可选
    //   if (this.data.hourList[i].n <= hour) {
    //     list[i].isShow = false;
    //     this.setData({
    //       hourList: list
    //     })
    //   }
    // }
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
    this.getBookInfo()
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
  onShareAppMessage: function () {},
  //立即预订按钮
  //判定人数，预约时间，预约手机号
  //选择支付方式，如果是微信直接调用requsetment，
  //如果是余额方式，判断是否够支付，不够先充值，够了，然后走余额支付方式
  bookConfirm() {


  },





})