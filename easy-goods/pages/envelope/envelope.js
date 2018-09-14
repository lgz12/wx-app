// pages/envelope/envelope.js
let self;
const app = getApp();

Page({
  orderNum:"",
  /**
   * 页面的初始数据
   */
  data: {
    orderArr:[],
    titleText:"",
    userSendPic:"",
    title_two:"",
    getGitText:"",
    playMethod:0,
    shareOptions:{},
    goodsNum:0,
    formId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    self = this;
    
    //模拟测试
    // let orderNum = '1525452742324923';
    // options = { "orderNum": "1525452742324923", "userSendPic": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKzr5b0P8Dyqbp0moUAnCU5cx1wQ1mO853zfdL8ZKDyV056Xw0N0wibfHUFzDtA3icNNT5Eh7GmzricQ/0", "playMethod": 1, "openNum": 2,"goodsNum":2};
    // let shareOptions = 'orderNum=' + options.orderNum + '&userSendPic=' + options.userSendPic + '&playMethod=' + options.playMethod + '&openNum=' + options.openNum;
    
    //组装分享参数
    let shareOptions = {
      orderNum: options.orderNum,
      userSendPic: options.userSendPic,
      playMethod: options.playMethod,
      openNum: options.openNum,
      goodsNum: options.goodsNum
    };

    console.log(options.goodsNum)
    console.log(shareOptions);

    this.orderNum = options.orderNum;

    console.log(options);
    console.log(self.orderNum)
    //人数开奖
    let openNum = options.openNum;
    //玩法
    let playMethod = options.playMethod;
    //红包头部的文字
    let title;
    //第二个标题文字
    let title_two;
    //发送者头像
    let userSendPic = options.userSendPic;
    //打开红包的文字
    let getGitText;
    if(playMethod == 1)
    {
      title_two = "";
      getGitText = "领";
    }else{
      title_two = "满" + openNum+"人自动参与开奖";
      getGitText = "抽";
    }
    self.setData({
      title_two:title_two,
      userSendPic: userSendPic,
      getGitText: getGitText,
      playMethod: playMethod,
      shareOptions: shareOptions,
      goodsNum: options.goodsNum
    })

    let arr;
    //获取本地已经点开过的红包，每一个红包对应一个订单号
    let envelope = wx.getStorageSync("envelopeArr")
    if (envelope){
      arr = JSON.parse(envelope);
    }else{
      arr = [];
    }
    
    self.data.orderArr = arr;
    console.log(self.data.orderArr)
    //判断现在打开的红包是否以前就已经打开过
    if(arr)
    {
      for (let item of arr) {
        if (this.orderNum == item)
        {
         if(playMethod == 1)
         {
           wx.redirectTo({
             url: '../OpernEnvelope/OpernEnvelope?orderNum=' + this.orderNum,
           });
         }else{
           wx.redirectTo({
             url: '../joinLottery/joinLottery?orderNum=' + self.orderNum + '&shareOptions=' + JSON.stringify(self.data.shareOptions) +'&formId=100'
           });
         
         }
        }
      }
    }
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
  
  },
  /**
   * 点击领礼物
   * 
   */
  getGit:(e)=>{
    //
    self.data.formId = e.detail.formId;
  },
  /**
   * 测试
   */
  getUserInfo(res){
    //判断是否已经设置过用户信息
    console.log(!app.globalData.userInfo.nickName)
    if (!app.globalData.userInfo.nickName) {
      //如果拒绝授权，则返回
      if (!res.detail.userInfo) {
        return;
      }
      //加载框
      wx.showLoading({
        title: '打开礼包中...',
      })
      //组装发送数据
      let data = res.detail.userInfo;
      let userInfo = {};
      userInfo.openId = app.globalData.openId;
      userInfo.nickName = data.nickName;
      userInfo.gender = data.gender;
      userInfo.city = data.city;
      userInfo.province = data.province;
      userInfo.country = data.country;
      userInfo.language = data.language;
      userInfo.avatarUrl = data.avatarUrl;

      wx.request({
        url: app.globalData.host + '/user?method=setUserInfo',
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        data: userInfo,
        success: res => {
          //取消加载框
          wx.hideLoading()
          if (res.data.status == 1) {
            console.log(self.data.formId)
            wx.setStorageSync("userInfo", data)
            app.globalData.userInfo = data;
            self.submit()
          }
        },
        fail:res=>{
          //创建订单失败提示
          wx.showModal({
            title: '提示',
            content: '打开礼包失败，请重试',
            showCancel: false,
            success: function (res) {
              //不做处理
            }
          })
        }
      })
    }else{
      self.submit()
    }
    console.log(res)
  },
  /**
   * 跳转到打开红包的页面
   */
  submit(){
    let formId = self.data.formId;
    // console.log(formId);
    // return;
    self.data.orderArr.push(self.orderNum);
    //将订单加入缓存中，下次打开就会跳过红包的界面
    wx.setStorageSync("envelopeArr", JSON.stringify(self.data.orderArr))
    // console.log(self.orderNum)


    if (self.data.playMethod == 1) {
      wx.redirectTo({
        url: '../OpernEnvelope/OpernEnvelope?orderNum=' + self.orderNum + '&formId=' + formId,
      });
    } else {
      wx.redirectTo({
        url: '../joinLottery/joinLottery?orderNum=' + self.orderNum + '&formId=' + formId + '&shareOptions=' + JSON.stringify(self.data.shareOptions)
      });
    }

  }
})