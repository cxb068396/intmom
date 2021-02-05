
//const ApiRootUrl = 'http://192.168.0.227/sjtc/WWW/home'   //公共的api

const ApiRootUrl = 'https://www.intmom.club/home'  

//首页相关的api
const index={
HomeIndex:ApiRootUrl+'/active/index.html',//首页信息
Maindetail:ApiRootUrl+'/active/detail.html',//活动详情
GetBannar:ApiRootUrl+'/active/banner.html',//轮播图图片,
subscribe:ApiRootUrl+'/active/yuyue.html',//预约展示信息
activeTweets:ApiRootUrl+'/Active/tweets',//展示推文
sumbitBook:ApiRootUrl+'/active/booking.html',//提交信息
showNewCoupon:ApiRootUrl+'/Coupon/showNewCoupon',//显示新人优惠券
getShowCoupon:ApiRootUrl+'/Coupon/showCoupon',//领券中心领取 get_menu
getMenu:ApiRootUrl+'/active/get_menu',//获取二级分类
getSecondTweet:ApiRootUrl+'/active/get_second_tweet',//获取二级分类推文
}

//我的相关的api
const mine={
  wxChatLogin:ApiRootUrl+'/login/weixinlogin.html' ,// 微信登录  
  getMobile:ApiRootUrl+'/login/getmobile.html',//获取手机号
  getUserInfo:ApiRootUrl+'/login/getuser.html',//获取个人信息
  GetCouponCount:ApiRootUrl+'/Coupon/getCount', // 获取未使用优惠券的总数 
  getIdea: ApiRootUrl + '/keyword/get_idea.html', //意见反馈
}
//优惠券相关的api
const coupon={
  ShowCoupon:ApiRootUrl+'/Coupon/personalCoupon', //显示所有的优惠券
  GetCoupon:ApiRootUrl+'/Coupon/getCoupon',//点击领取优惠券
}
//活动相关的相关的api
const active={
  ShowActivity:ApiRootUrl+'/active/attend.html', //显示所有的预约信息  
  deleteActive:ApiRootUrl+'/active/del_act.html ',//删除预约信息
}

module.exports={
  ...index,
  ...mine,
  ...coupon,
  ...active
}