// pages/home/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [{
        avatar: '../../static/special/hengxue1.png',
        id: 0,
        title:'关于衡学'
      },
      {
        avatar: '../../static/special/hengxue2.png',
        id: 1,
        title:'衡学跃升系列'
      },
      {
        avatar: '../../static/special/hengxue3.png',
        id: 2,
        title:'职业生涯规划'
      },
   
    ],
    infos: [{
        info: [{
          image: '../../static/special/test.png',
          title: '我们是谁？衡学教育简介',
          desc: '名称由来：衡学一取“荆衡”《晋书》解释为优秀的人才“博学而好学”《论语》解释为广泛学习而意志坚定',
          url:'https://mp.weixin.qq.com/s/C5yTtfiaMBCq8KDdpWZyJA'
        }]
      },
      {
        info: [{
          image: '../../static/special/hengxue1.png',
          title: '我们是谁？衡学教育简介',
          desc: '名称由来：衡学一取“荆衡”《晋书》解释为优秀的人才“博学而好学”《论语》解释为广泛学习而意志坚定',
          url:'https://mp.weixin.qq.com/s/C5yTtfiaMBCq8KDdpWZyJA'
        }, {
          image: '../../static/special/test.png',
          title: '我们是谁？衡学教育简介',
          desc: '名称由来：衡学一取“荆衡”《晋书》解释为优秀的人才“博学而好学”《论语》解释为广泛学习而意志坚定',
          url:'https://mp.weixin.qq.com/s/C5yTtfiaMBCq8KDdpWZyJA'
        },
        {
          image: '../../static/special/test.png',
          title: '我们是谁？衡学教育简介',
          desc: '名称由来：衡学一取“荆衡”《晋书》解释为优秀的人才“博学而好学”《论语》解释为广泛学习而意志坚定',
          url:'https://mp.weixin.qq.com/s/C5yTtfiaMBCq8KDdpWZyJA'
        }]
      },
      {
        info: [{
          image: '../../static/special/hengxue2.png',
          title: '我们是谁？衡学教育简介',
          desc: '名称由来：衡学一取“荆衡”《晋书》解释为优秀的人才“博学而好学”《论语》解释为广泛学习而意志坚定',
          url:'https://mp.weixin.qq.com/s/C5yTtfiaMBCq8KDdpWZyJA'
        }, {
          image: '../../static/special/test.png',
          title: '我们是谁？衡学教育简介',
          desc: '名称由来：衡学一取“荆衡”《晋书》解释为优秀的人才“博学而好学”《论语》解释为广泛学习而意志坚定',
          url:'https://mp.weixin.qq.com/s/C5yTtfiaMBCq8KDdpWZyJA'
        }]
      },
   
      
    ],
    everyInfo: '',
    showId: 0
  },


  getInfo(e) {
    const index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    this.setData({

      showId: id,
      everyInfo: this.data.infos[index]
    })
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
    this.setData({
      everyInfo: this.data.infos[0]
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