// pages/payafter/payafter.js
const app = getApp();
let self;

Page({

  orderNum:"",

  /**
   * 页面的初始数据 userPicUrl: app.globalData.userInfo.avatarUrl,
   */
  data: {
    userPicUrl: app.globalData.userInfo,
    wish:"",
    goodsList:[],
    goodsNum:1,
    goodsList:[],
    playMethod:0,
    openNum:0,
    host:app.globalData.host,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options);
    self = this;
    let obj = JSON.parse(options.obj);
    console.log(app.globalData.userInfo);
   
    //订单
    self.orderNum = obj.orderNum;
    //玩法
    self.playMethod = obj.playMethod;
    //开奖人数
    self.openNum = obj.openNum;
    
    

    let oneGoods = obj.goodsList[0];
    
    self.setData({
      wish: obj.wish,
      goodsList:obj.goodsList,
      goodsNum: obj.goodsNum
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
  onShareAppMessage: function (res) {

    console.log(JSON.stringify({
      orderNum: self.orderNum,
      userSendPic: app.globalData.userInfo.avatarUrl,
      playMethod: self.playMethod,
      openNum: self.openNum
    }));
   
  
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我送你一份礼物，快来领取吧',
      path: '/pages/envelope/envelope?orderNum=' + self.orderNum + '&userSendPic=' + app.globalData.userInfo.avatarUrl + '&playMethod=' + self.playMethod + '&openNum=' + self.openNum + '&goodsNum='+self.data.goodsNum,
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})