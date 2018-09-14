//app.js
App({
  onLaunch: function () {
   //获取本地的openId
   this.globalData.openId =  wx.getStorageSync('openId')|| null;
    this.globalData.userInfo = wx.getStorageSync("userInfo") ||{};
   
    // 登录
    wx.login({
      success: res => {
      //如果已经存在openId,则不需要再次获取和保存
        if (this.globalData.openId)
        {
          return;
        }
        //网络请求，通过code获取openId
        // wx.request({
        //   url: this.globalData.host + '/user?method=setOpenId',
        //   data:{
        //     code:res.code
        //   },
        //   header: {
        //     'content-type': 'application/json' // 默认值
        //   },
        //   method:'POST',
        //   success:res=>{
        //     console.log(res)
        //     if (res.data.status == 1)
        //     {
        //       //本地和内存同时保存
        //         wx.setStorageSync('openId', res.data.content);
        //         this.globalData.openId = res.data.content;
        //     }
        
        //   }
        // })
      }
    })
   
   
  },
  globalData: {
    openId:"",
    userInfo: {},
    host: 'http://112.74.176.146/easygift',
    localhost: 'http://localhost:9900',
    // picUrl: 'https://smallsi.com/images/clientPic',
    orderArrSend:[],
    giftNumSend:0,
    orderArrGet:[],
    giftNumGet:0,
    isSendGift:true,
    userInfo: null,
    times:0
  }
})

// host: 'http://127.0.0.1:8080',
  // picUrl: 'http://127.0.0.1:8080/images/clientPic',

// host: 'https://smallsi.com',
  // picUrl: 'https://smallsi.com/images/clientPic',